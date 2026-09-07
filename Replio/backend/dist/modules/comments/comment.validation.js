"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCommentStatusSchema = exports.getCommentsSchema = void 0;
const zod_1 = require("zod");
exports.getCommentsSchema = zod_1.z.object({
    pageId: zod_1.z.string().optional(),
    status: zod_1.z
        .enum(["PENDING", "PROCESSED", "REPLIED", "IGNORED", "ERROR"])
        .optional(),
    limit: zod_1.z
        .string()
        .optional()
        .transform((val) => (val ? parseInt(val, 10) : 20)),
    offset: zod_1.z
        .string()
        .optional()
        .transform((val) => (val ? parseInt(val, 10) : 0)),
});
exports.updateCommentStatusSchema = zod_1.z.object({
    status: zod_1.z.enum(["PENDING", "PROCESSED", "REPLIED", "IGNORED", "ERROR"]),
});
//# sourceMappingURL=comment.validation.js.map