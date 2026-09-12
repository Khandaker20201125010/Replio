"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
const env_2 = require("./env");
const globalForPrisma = globalThis;
exports.prisma =
  (_a = globalForPrisma.prisma) !== null && _a !== void 0
    ? _a
    : new client_1.PrismaClient({
        log:
          env_2.env.NODE_ENV === "development"
            ? ["query", "error", "warn"]
            : ["error"],
      });
if (env_2.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = exports.prisma;
}
exports.default = exports.prisma;
//# sourceMappingURL=prisma.js.map
