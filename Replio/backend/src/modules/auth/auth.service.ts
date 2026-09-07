import prisma from "../../config/prisma";
import { hashPassword, comparePassword } from "../../utils/password";
import { generateToken } from "../../utils/jwt";
import {
  ConflictError,
  AuthenticationError,
  NotFoundError,
} from "../../utils/errors";
import { logger } from "../../utils/logger";
import type {
  RegisterInput,
  LoginInput,
  UpdateProfileInput,
} from "./auth.validation";

export async function register(data: RegisterInput) {
  const { email, password, name } = data;

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new ConflictError("User with this email already exists");
  }

  // Hash password
  const passwordHash = await hashPassword(password);

  // Create user
  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      name: name || null,
      role: "USER",
    },
  });

  // Generate token
  const token = generateToken(user.id, user.email);

  logger.info({ userId: user.id, email }, "User registered successfully");

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
    token,
  };
}

export async function login(data: LoginInput) {
  const { email, password } = data;

  // Find user
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new AuthenticationError("Invalid credentials");
  }

  // Verify password
  const isValid = await comparePassword(password, user.passwordHash);

  if (!isValid) {
    throw new AuthenticationError("Invalid credentials");
  }

  // Generate token
  const token = generateToken(user.id, user.email);

  logger.info({ userId: user.id, email }, "User logged in successfully");

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
    token,
  };
}

export async function getCurrentUser(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    throw new NotFoundError("User not found");
  }

  return user;
}

export async function updateProfile(userId: string, data: UpdateProfileInput) {
  const { name, email } = data;

  // If email is being updated, check if it's already taken
  if (email) {
    const existingUser = await prisma.user.findFirst({
      where: {
        email,
        NOT: { id: userId },
      },
    });

    if (existingUser) {
      throw new ConflictError("Email already in use");
    }
  }

  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      ...(name !== undefined && { name }),
      ...(email !== undefined && { email }),
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  logger.info({ userId }, "User profile updated successfully");

  return user;
}
