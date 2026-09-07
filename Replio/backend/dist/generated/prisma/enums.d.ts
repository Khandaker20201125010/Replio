export declare const UserRole: {
    readonly USER: 'USER';
    readonly ADMIN: 'ADMIN';
};
export type UserRole = (typeof UserRole)[keyof typeof UserRole];
export declare const CommentStatus: {
    readonly PENDING: 'PENDING';
    readonly PROCESSED: 'PROCESSED';
    readonly REPLIED: 'REPLIED';
    readonly IGNORED: 'IGNORED';
    readonly ERROR: 'ERROR';
};
export type CommentStatus = (typeof CommentStatus)[keyof typeof CommentStatus];
export declare const ReplyStatus: {
    readonly PENDING: 'PENDING';
    readonly APPROVED: 'APPROVED';
    readonly SENT: 'SENT';
    readonly FAILED: 'FAILED';
    readonly SKIPPED: 'SKIPPED';
};
export type ReplyStatus = (typeof ReplyStatus)[keyof typeof ReplyStatus];
export declare const AISettingStatus: {
    readonly ACTIVE: 'ACTIVE';
    readonly PAUSED: 'PAUSED';
};
export type AISettingStatus = (typeof AISettingStatus)[keyof typeof AISettingStatus];
export declare const RuleAction: {
    readonly REPLY_AI: 'REPLY_AI';
    readonly REPLY_CUSTOM: 'REPLY_CUSTOM';
    readonly IGNORE: 'IGNORE';
    readonly HUMAN_REVIEW: 'HUMAN_REVIEW';
};
export type RuleAction = (typeof RuleAction)[keyof typeof RuleAction];
export declare const RuleConditionType: {
    readonly KEYWORD: 'KEYWORD';
    readonly PHRASE: 'PHRASE';
    readonly SENTIMENT: 'SENTIMENT';
    readonly LANGUAGE: 'LANGUAGE';
    readonly SPAM_THRESHOLD: 'SPAM_THRESHOLD';
};
export type RuleConditionType = (typeof RuleConditionType)[keyof typeof RuleConditionType];
//# sourceMappingURL=enums.d.ts.map