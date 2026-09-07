import type { GetCommentsInput, UpdateCommentStatusInput } from "./comment.validation";
export declare function getComments(userId: string, filters: GetCommentsInput): Promise<{
    comments: ({
        facebookPage: {
            pageId: string;
            pageName: string;
        };
        replies: {
            id: string;
            commentId: string;
            facebookPageId: string;
            replyId: string | null;
            generatedReply: string;
            status: import(".prisma/client").$Enums.ReplyStatus;
            errorMessage: string | null;
            aiProvider: string | null;
            ruleId: string | null;
            confidence: number | null;
            requiresHumanReview: boolean;
            approvedBy: string | null;
            createdAt: Date;
            updatedAt: Date;
        }[];
    } & {
        id: string;
        facebookPageId: string;
        commentId: string;
        postId: string;
        userId: string | null;
        userName: string | null;
        userMessage: string;
        createdTime: Date;
        status: import(".prisma/client").$Enums.CommentStatus;
        aiIntent: string | null;
        aiSentiment: string | null;
        aiLanguage: string | null;
        aiIsSpam: boolean | null;
        aiConfidence: number | null;
        aiRequiresReview: boolean | null;
        createdAt: Date;
        updatedAt: Date;
    })[];
    total: number;
    limit: number;
    offset: number;
}>;
export declare function getCommentById(userId: string, commentId: string): Promise<{
    facebookPage: {
        pageId: string;
        pageName: string;
    };
    replies: {
        id: string;
        commentId: string;
        facebookPageId: string;
        replyId: string | null;
        generatedReply: string;
        status: import(".prisma/client").$Enums.ReplyStatus;
        errorMessage: string | null;
        aiProvider: string | null;
        ruleId: string | null;
        confidence: number | null;
        requiresHumanReview: boolean;
        approvedBy: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[];
} & {
    id: string;
    facebookPageId: string;
    commentId: string;
    postId: string;
    userId: string | null;
    userName: string | null;
    userMessage: string;
    createdTime: Date;
    status: import(".prisma/client").$Enums.CommentStatus;
    aiIntent: string | null;
    aiSentiment: string | null;
    aiLanguage: string | null;
    aiIsSpam: boolean | null;
    aiConfidence: number | null;
    aiRequiresReview: boolean | null;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function updateCommentStatus(userId: string, commentId: string, data: UpdateCommentStatusInput): Promise<{
    id: string;
    facebookPageId: string;
    commentId: string;
    postId: string;
    userId: string | null;
    userName: string | null;
    userMessage: string;
    createdTime: Date;
    status: import(".prisma/client").$Enums.CommentStatus;
    aiIntent: string | null;
    aiSentiment: string | null;
    aiLanguage: string | null;
    aiIsSpam: boolean | null;
    aiConfidence: number | null;
    aiRequiresReview: boolean | null;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function processComment(commentId: string): Promise<{
    facebookPage: {
        id: string;
        userId: string;
        pageId: string;
        pageName: string;
        pageAccessToken: string;
        accessTokenExpiry: Date | null;
        isConnected: boolean;
        createdAt: Date;
        updatedAt: Date;
    };
} & {
    id: string;
    facebookPageId: string;
    commentId: string;
    postId: string;
    userId: string | null;
    userName: string | null;
    userMessage: string;
    createdTime: Date;
    status: import(".prisma/client").$Enums.CommentStatus;
    aiIntent: string | null;
    aiSentiment: string | null;
    aiLanguage: string | null;
    aiIsSpam: boolean | null;
    aiConfidence: number | null;
    aiRequiresReview: boolean | null;
    createdAt: Date;
    updatedAt: Date;
}>;
//# sourceMappingURL=comment.service.d.ts.map