import { z } from "zod";

export const getCommentsSchema = z.object({
  pageId: z.string().optional(),
  status: z
    .enum(["PENDING", "PROCESSED", "REPLIED", "IGNORED", "ERROR"])
    .optional(),
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 20)),
  offset: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 0)),
});

export const updateCommentStatusSchema = z.object({
  status: z.enum(["PENDING", "PROCESSED", "REPLIED", "IGNORED", "ERROR"]),
});

export type GetCommentsInput = z.infer<typeof getCommentsSchema>;
export type UpdateCommentStatusInput = z.infer<
  typeof updateCommentStatusSchema
>;
