import type { UpdateProfileInput } from "./auth.validation";
export declare function loginWithFacebook(profile: {
    id: string;
    name: string;
    email: string;
}): Promise<{
    user: {
        id: string;
        email: string;
        name: string | null;
        role: import(".prisma/client").$Enums.UserRole;
    };
    token: string;
}>;
export declare function getCurrentUser(userId: string): Promise<{
    createdAt: Date;
    email: string;
    id: string;
    name: string | null;
    role: import(".prisma/client").$Enums.UserRole;
    updatedAt: Date;
}>;
export declare function updateProfile(userId: string, data: UpdateProfileInput): Promise<{
    createdAt: Date;
    email: string;
    id: string;
    name: string | null;
    role: import(".prisma/client").$Enums.UserRole;
    updatedAt: Date;
}>;
//# sourceMappingURL=auth.service.d.ts.map