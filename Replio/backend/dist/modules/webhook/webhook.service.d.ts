export declare function verifyWebhook(mode: string, token: string, challenge: string): Promise<string>;
export declare function processWebhookEvent(payload: any): Promise<void>;
export declare function getWebhookDiagnostics(userId: string): Promise<{
    config: {
        verifyTokenConfigured: boolean;
        appIdConfigured: boolean;
        appSecretConfigured: boolean;
        aiEnabled: boolean;
        humanApprovalMode: boolean;
    };
    appSubscriptions: {
        configured: boolean;
        pageFields: string[];
        callbackUrl?: string;
        error?: string;
    };
    pages: {
        pageId: string;
        pageName: string;
        commentCount: number;
        subscription: {
            subscribed: boolean;
            fields: string[];
            error?: string;
        };
    }[];
    lastComment: {
        createdAt: Date;
        status: import(".prisma/client").$Enums.CommentStatus;
        userMessage: string;
    } | null;
    recentEvents: {
        id: string;
        source: string;
        objectType: string | null;
        pageId: string | null;
        field: string | null;
        verb: string | null;
        commentId: string | null;
        payload: import("@prisma/client/runtime/library").JsonValue;
        status: string;
        reason: string | null;
        error: string | null;
        createdAt: Date;
    }[];
}>;
//# sourceMappingURL=webhook.service.d.ts.map