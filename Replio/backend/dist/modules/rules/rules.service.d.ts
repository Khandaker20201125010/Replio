export declare function getRules(userId: string): Promise<{
    id: string;
    userId: string;
    name: string;
    enabled: boolean;
    priority: number;
    conditionType: import(".prisma/client").$Enums.RuleConditionType;
    conditionValue: string;
    action: import(".prisma/client").$Enums.RuleAction;
    customReply: string | null;
    createdAt: Date;
    updatedAt: Date;
}[]>;
export declare function createRule(userId: string, data: any): Promise<{
    id: string;
    userId: string;
    name: string;
    enabled: boolean;
    priority: number;
    conditionType: import(".prisma/client").$Enums.RuleConditionType;
    conditionValue: string;
    action: import(".prisma/client").$Enums.RuleAction;
    customReply: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function updateRule(userId: string, ruleId: string, data: any): Promise<{
    id: string;
    userId: string;
    name: string;
    enabled: boolean;
    priority: number;
    conditionType: import(".prisma/client").$Enums.RuleConditionType;
    conditionValue: string;
    action: import(".prisma/client").$Enums.RuleAction;
    customReply: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function deleteRule(userId: string, ruleId: string): Promise<void>;
export declare function reorderRules(userId: string, ruleIds: string[]): Promise<{
    id: string;
    userId: string;
    name: string;
    enabled: boolean;
    priority: number;
    conditionType: import(".prisma/client").$Enums.RuleConditionType;
    conditionValue: string;
    action: import(".prisma/client").$Enums.RuleAction;
    customReply: string | null;
    createdAt: Date;
    updatedAt: Date;
}[]>;
export declare function evaluateRules(comment: string, userId: string): Promise<{
    id: string;
    userId: string;
    name: string;
    enabled: boolean;
    priority: number;
    conditionType: import(".prisma/client").$Enums.RuleConditionType;
    conditionValue: string;
    action: import(".prisma/client").$Enums.RuleAction;
    customReply: string | null;
    createdAt: Date;
    updatedAt: Date;
} | null>;
//# sourceMappingURL=rules.service.d.ts.map