import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models';
export type * from './prismaNamespace';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
/**
 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
export declare const ModelName: {
    readonly User: 'User';
    readonly FacebookPage: 'FacebookPage';
    readonly Comment: 'Comment';
    readonly Reply: 'Reply';
    readonly AISettings: 'AISettings';
    readonly ReplyRule: 'ReplyRule';
    readonly AnalyticsEvent: 'AnalyticsEvent';
    readonly OAuthToken: 'OAuthToken';
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: 'ReadUncommitted';
    readonly ReadCommitted: 'ReadCommitted';
    readonly RepeatableRead: 'RepeatableRead';
    readonly Serializable: 'Serializable';
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: 'id';
    readonly email: 'email';
    readonly passwordHash: 'passwordHash';
    readonly name: 'name';
    readonly role: 'role';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const FacebookPageScalarFieldEnum: {
    readonly id: 'id';
    readonly userId: 'userId';
    readonly pageId: 'pageId';
    readonly pageName: 'pageName';
    readonly pageAccessToken: 'pageAccessToken';
    readonly accessTokenExpiry: 'accessTokenExpiry';
    readonly isConnected: 'isConnected';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type FacebookPageScalarFieldEnum = (typeof FacebookPageScalarFieldEnum)[keyof typeof FacebookPageScalarFieldEnum];
export declare const CommentScalarFieldEnum: {
    readonly id: 'id';
    readonly facebookPageId: 'facebookPageId';
    readonly commentId: 'commentId';
    readonly postId: 'postId';
    readonly userId: 'userId';
    readonly userName: 'userName';
    readonly userMessage: 'userMessage';
    readonly createdTime: 'createdTime';
    readonly status: 'status';
    readonly aiIntent: 'aiIntent';
    readonly aiSentiment: 'aiSentiment';
    readonly aiLanguage: 'aiLanguage';
    readonly aiIsSpam: 'aiIsSpam';
    readonly aiConfidence: 'aiConfidence';
    readonly aiRequiresReview: 'aiRequiresReview';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type CommentScalarFieldEnum = (typeof CommentScalarFieldEnum)[keyof typeof CommentScalarFieldEnum];
export declare const ReplyScalarFieldEnum: {
    readonly id: 'id';
    readonly commentId: 'commentId';
    readonly facebookPageId: 'facebookPageId';
    readonly replyId: 'replyId';
    readonly generatedReply: 'generatedReply';
    readonly status: 'status';
    readonly errorMessage: 'errorMessage';
    readonly aiProvider: 'aiProvider';
    readonly ruleId: 'ruleId';
    readonly confidence: 'confidence';
    readonly requiresHumanReview: 'requiresHumanReview';
    readonly approvedBy: 'approvedBy';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type ReplyScalarFieldEnum = (typeof ReplyScalarFieldEnum)[keyof typeof ReplyScalarFieldEnum];
export declare const AISettingsScalarFieldEnum: {
    readonly id: 'id';
    readonly userId: 'userId';
    readonly status: 'status';
    readonly aiProvider: 'aiProvider';
    readonly model: 'model';
    readonly confidenceThreshold: 'confidenceThreshold';
    readonly tone: 'tone';
    readonly language: 'language';
    readonly emojiUsage: 'emojiUsage';
    readonly maxLength: 'maxLength';
    readonly spamHandling: 'spamHandling';
    readonly humanApprovalMode: 'humanApprovalMode';
    readonly fallbackBehavior: 'fallbackBehavior';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type AISettingsScalarFieldEnum = (typeof AISettingsScalarFieldEnum)[keyof typeof AISettingsScalarFieldEnum];
export declare const ReplyRuleScalarFieldEnum: {
    readonly id: 'id';
    readonly userId: 'userId';
    readonly name: 'name';
    readonly enabled: 'enabled';
    readonly priority: 'priority';
    readonly conditionType: 'conditionType';
    readonly conditionValue: 'conditionValue';
    readonly action: 'action';
    readonly customReply: 'customReply';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type ReplyRuleScalarFieldEnum = (typeof ReplyRuleScalarFieldEnum)[keyof typeof ReplyRuleScalarFieldEnum];
export declare const AnalyticsEventScalarFieldEnum: {
    readonly id: 'id';
    readonly userId: 'userId';
    readonly eventType: 'eventType';
    readonly eventTypeDetail: 'eventTypeDetail';
    readonly facebookPageId: 'facebookPageId';
    readonly commentId: 'commentId';
    readonly replyId: 'replyId';
    readonly metadata: 'metadata';
    readonly createdAt: 'createdAt';
};
export type AnalyticsEventScalarFieldEnum = (typeof AnalyticsEventScalarFieldEnum)[keyof typeof AnalyticsEventScalarFieldEnum];
export declare const OAuthTokenScalarFieldEnum: {
    readonly id: 'id';
    readonly userId: 'userId';
    readonly tokenType: 'tokenType';
    readonly accessToken: 'accessToken';
    readonly refreshToken: 'refreshToken';
    readonly expiresAt: 'expiresAt';
    readonly metadata: 'metadata';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type OAuthTokenScalarFieldEnum = (typeof OAuthTokenScalarFieldEnum)[keyof typeof OAuthTokenScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: 'asc';
    readonly desc: 'desc';
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const NullableJsonNullValueInput: {
    readonly DbNull: import("@prisma/client-runtime-utils").DbNullClass;
    readonly JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
};
export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput];
export declare const QueryMode: {
    readonly default: 'default';
    readonly insensitive: 'insensitive';
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: 'first';
    readonly last: 'last';
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
export declare const JsonNullValueFilter: {
    readonly DbNull: import("@prisma/client-runtime-utils").DbNullClass;
    readonly JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
    readonly AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
};
export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];
//# sourceMappingURL=prismaNamespaceBrowser.d.ts.map