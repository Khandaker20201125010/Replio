"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = generateToken;
exports.verifyToken = verifyToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const TOKEN_EXPIRY = "7d";
function generateToken(userId, email) {
    return jsonwebtoken_1.default.sign({ userId, email }, env_1.env.JWT_SECRET, {
        expiresIn: TOKEN_EXPIRY,
    });
}
function verifyToken(token) {
    try {
        return jsonwebtoken_1.default.verify(token, env_1.env.JWT_SECRET);
    }
    catch (error) {
        throw new Error("Invalid or expired token");
    }
}
//# sourceMappingURL=jwt.js.map