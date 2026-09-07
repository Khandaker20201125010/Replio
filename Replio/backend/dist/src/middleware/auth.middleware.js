"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = authenticate;
const jwt_1 = require("../utils/jwt");
const errors_1 = require("../utils/errors");
const logger_1 = require("../utils/logger");
function authenticate(req, res, next) {
    try {
        const token = req.cookies.auth_token;
        if (!token) {
            throw new errors_1.AuthenticationError("No authentication token provided");
        }
        const payload = (0, jwt_1.verifyToken)(token);
        req.user = payload;
        logger_1.logger.debug({
            userId: payload.userId,
            email: payload.email,
            path: req.path,
        }, "User authenticated");
        next();
    }
    catch (error) {
        logger_1.logger.error({ error, path: req.path }, "Authentication failed");
        throw new errors_1.AuthenticationError();
    }
}
//# sourceMappingURL=auth.middleware.js.map