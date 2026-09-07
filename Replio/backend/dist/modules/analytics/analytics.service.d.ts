export declare function getOverviewAnalytics(userId: string, filters: any): Promise<{
    totalComments: number;
    totalReplies: number;
    sentimentBreakdown: {
        positive: number;
        negative: number;
        neutral: number;
    };
    spamRate: number;
}>;
export declare function getCommentsAnalytics(userId: string, filters: any): Promise<{
    timeline: {
        date: string;
        count: number;
    }[];
    bySentiment: {
        positive: number;
        negative: number;
        neutral: number;
    };
    byLanguage: Record<string, number>;
    byIntent: Record<string, number>;
}>;
export declare function getRepliesAnalytics(userId: string, filters: any): Promise<{
    timeline: {
        date: string;
        count: number;
    }[];
    byStatus: {
        PENDING: number;
        APPROVED: number;
        SENT: number;
        FAILED: number;
        SKIPPED: number;
    };
    byProvider: Record<string, number>;
    avgLength: number;
}>;
export declare function getEvents(userId: string, filters: any): Promise<{
    events: {
        id: string;
        userId: string;
        eventType: string;
        eventTypeDetail: string | null;
        facebookPageId: string | null;
        commentId: string | null;
        replyId: string | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        createdAt: Date;
    }[];
    total: number;
    limit: any;
    offset: any;
}>;
//# sourceMappingURL=analytics.service.d.ts.map