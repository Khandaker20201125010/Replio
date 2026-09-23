import type { FacebookPagesResponse, FacebookPageDetails } from "./facebook.types";
export declare function getOAuthUrl(state?: string): string;
export declare function exchangeCodeForToken(code: string): Promise<string>;
export declare function getUserPages(userAccessToken: string): Promise<FacebookPagesResponse>;
export declare function verifyPage(pageId: string, pageAccessToken: string): Promise<FacebookPageDetails>;
export declare function connectPage(userId: string, pageId: string, pageName: string, pageAccessToken: string): Promise<{
    id: string;
    userId: string;
    pageId: string;
    pageName: string;
    pageAccessToken: string;
    accessTokenExpiry: Date | null;
    isConnected: boolean;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function subscribePageToWebhooks(pageId: string, pageAccessToken: string): Promise<{
    success: boolean;
    data?: any;
    error?: string;
}>;
export declare function resubscribePage(userId: string, pageId: string): Promise<{
    success: boolean;
    data?: any;
    error?: string;
    pageId: string;
    pageName: string;
}>;
export declare function disconnectPage(userId: string, pageId: string): Promise<void>;
export declare function getUserConnectedPages(userId: string): Promise<{
    id: string;
    userId: string;
    pageId: string;
    pageName: string;
    pageAccessToken: string;
    accessTokenExpiry: Date | null;
    isConnected: boolean;
    createdAt: Date;
    updatedAt: Date;
}[]>;
export declare function getPageById(userId: string, pageId: string): Promise<{
    id: string;
    userId: string;
    pageId: string;
    pageName: string;
    pageAccessToken: string;
    accessTokenExpiry: Date | null;
    isConnected: boolean;
    createdAt: Date;
    updatedAt: Date;
}>;
//# sourceMappingURL=facebook.service.d.ts.map