import { z } from "zod";
export declare const getCommentsSchema: z.ZodObject<{
    pageId: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<{
        ERROR: "ERROR";
        IGNORED: "IGNORED";
        PENDING: "PENDING";
        PROCESSED: "PROCESSED";
        REPLIED: "REPLIED";
    }>>;
    limit: z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<number, string | undefined>>;
    offset: z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<number, string | undefined>>;
}, z.core.$strip>;
export declare const updateCommentStatusSchema: z.ZodObject<{
    status: z.ZodEnum<{
        ERROR: "ERROR";
        IGNORED: "IGNORED";
        PENDING: "PENDING";
        PROCESSED: "PROCESSED";
        REPLIED: "REPLIED";
    }>;
}, z.core.$strip>;
export type GetCommentsInput = z.infer<typeof getCommentsSchema>;
export type UpdateCommentStatusInput = z.infer<typeof updateCommentStatusSchema>;
//# sourceMappingURL=comment.validation.d.ts.map