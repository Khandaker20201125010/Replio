import prisma from "../../config/prisma";

import { generateToken } from "../../utils/jwt";
import {
  ConflictError,
  AuthenticationError,
  NotFoundError,
} from "../../utils/errors";
import { logger } from "../../utils/logger";
import type {
  UpdateProfileInput,
} from "./auth.validation";

export async function loginWithFacebook(profile: {
  id: string;
  name: string;
  email: string;
}) {
  const { id: facebookId, name, email } = profile;

  // Find user by facebookId or email
  let user = await prisma.user.findFirst({
    where: {
      OR: [
        { facebookId },
        { email }
      ]
    },
  });

  if (user) {
    // If user exists but doesn't have facebookId (e.g. from previous email signup), link it
    if (!user.facebookId || user.name !== name) {
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          facebookId,
          ...(name && !user.name ? { name } : {})
        }
      });
    }
  } else {
    // Create new user
    user = await prisma.user.create({
      data: {
        email,
        facebookId,
        name,
        role: "USER",
      },
    });
  }

  // Generate token
  const token = generateToken(user.id, user.email);

  logger.info({ userId: user.id, email }, "User logged in with Facebook successfully");

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
