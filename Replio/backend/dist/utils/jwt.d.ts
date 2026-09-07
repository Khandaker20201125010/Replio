export interface JwtPayload {
    userId: string;
    email: string;
    iat: number;
    exp: number;
}
export declare function generateToken(userId: string, email: string): string;
export declare function verifyToken(token: string): JwtPayload;
//# sourceMappingURL=jwt.d.ts.map