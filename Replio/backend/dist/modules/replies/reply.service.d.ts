export declare function getReplies(userId: string, filters: any): Promise<{
    replies: ({
        comment: {
            commentId: string;
            id: string;
            userMessage: string;
        };
        facebookPage: {
            pageId: string;
            pageName: string;
        };
    } & {
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
    })[];
    total: number;
    limit: any;
    offset: any;
}>;
export declare function getReplyById(userId: string, replyId: string): Promise<{
    comment: {
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
    };
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
}>;
export declare function approveReply(userId: string, replyId: string): Promise<{
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
}>;
export declare function rejectReply(userId: string, replyId: string): Promise<{
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
}>;
export declare function retryReply(userId: string, replyId: string): Promise<{
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
}>;
export declare function sendReplyToFacebook(replyId: string): Promise<{
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
}>;
//# sourceMappingURL=reply.service.d.ts.map