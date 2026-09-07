import type * as runtime from "@prisma/client/runtime/library";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model ReplyRule
 *
 */
export type ReplyRuleModel = runtime.Types.Result.DefaultSelection<Prisma.$ReplyRulePayload>;
export type AggregateReplyRule = {
    _count: ReplyRuleCountAggregateOutputType | null;
    _avg: ReplyRuleAvgAggregateOutputType | null;
    _sum: ReplyRuleSumAggregateOutputType | null;
    _min: ReplyRuleMinAggregateOutputType | null;
    _max: ReplyRuleMaxAggregateOutputType | null;
};
export type ReplyRuleAvgAggregateOutputType = {
    priority: number | null;
};
export type ReplyRuleSumAggregateOutputType = {
    priority: number | null;
};
export type ReplyRuleMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    name: string | null;
    enabled: boolean | null;
    priority: number | null;
    conditionType: $Enums.RuleConditionType | null;
    conditionValue: string | null;
    action: $Enums.RuleAction | null;
    customReply: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ReplyRuleMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    name: string | null;
    enabled: boolean | null;
    priority: number | null;
    conditionType: $Enums.RuleConditionType | null;
    conditionValue: string | null;
    action: $Enums.RuleAction | null;
    customReply: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ReplyRuleCountAggregateOutputType = {
    id: number;
    userId: number;
    name: number;
    enabled: number;
    priority: number;
    conditionType: number;
    conditionValue: number;
    action: number;
    customReply: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type ReplyRuleAvgAggregateInputType = {
    priority?: true;
};
export type ReplyRuleSumAggregateInputType = {
    priority?: true;
};
export type ReplyRuleMinAggregateInputType = {
    id?: true;
    userId?: true;
    name?: true;
    enabled?: true;
    priority?: true;
    conditionType?: true;
    conditionValue?: true;
    action?: true;
    customReply?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ReplyRuleMaxAggregateInputType = {
    id?: true;
    userId?: true;
    name?: true;
    enabled?: true;
    priority?: true;
    conditionType?: true;
    conditionValue?: true;
    action?: true;
    customReply?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ReplyRuleCountAggregateInputType = {
    id?: true;
    userId?: true;
    name?: true;
    enabled?: true;
    priority?: true;
    conditionType?: true;
    conditionValue?: true;
    action?: true;
    customReply?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type ReplyRuleAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which ReplyRule to aggregate.
     */
    where?: Prisma.ReplyRuleWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ReplyRules to fetch.
     */
    orderBy?: Prisma.ReplyRuleOrderByWithRelationInput | Prisma.ReplyRuleOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.ReplyRuleWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ReplyRules from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ReplyRules.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned ReplyRules
    **/
    _count?: true | ReplyRuleCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: ReplyRuleAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: ReplyRuleSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: ReplyRuleMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: ReplyRuleMaxAggregateInputType;
};
export type GetReplyRuleAggregateType<T extends ReplyRuleAggregateArgs> = {
    [P in keyof T & keyof AggregateReplyRule]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateReplyRule[P]> : Prisma.GetScalarType<T[P], AggregateReplyRule[P]>;
};
export type ReplyRuleGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReplyRuleWhereInput;
    orderBy?: Prisma.ReplyRuleOrderByWithAggregationInput | Prisma.ReplyRuleOrderByWithAggregationInput[];
    by: Prisma.ReplyRuleScalarFieldEnum[] | Prisma.ReplyRuleScalarFieldEnum;
    having?: Prisma.ReplyRuleScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ReplyRuleCountAggregateInputType | true;
    _avg?: ReplyRuleAvgAggregateInputType;
    _sum?: ReplyRuleSumAggregateInputType;
    _min?: ReplyRuleMinAggregateInputType;
    _max?: ReplyRuleMaxAggregateInputType;
};
export type ReplyRuleGroupByOutputType = {
    id: string;
    userId: string;
    name: string;
    enabled: boolean;
    priority: number;
    conditionType: $Enums.RuleConditionType;
    conditionValue: string;
    action: $Enums.RuleAction;
    customReply: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: ReplyRuleCountAggregateOutputType | null;
    _avg: ReplyRuleAvgAggregateOutputType | null;
    _sum: ReplyRuleSumAggregateOutputType | null;
    _min: ReplyRuleMinAggregateOutputType | null;
    _max: ReplyRuleMaxAggregateOutputType | null;
};
type GetReplyRuleGroupByPayload<T extends ReplyRuleGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ReplyRuleGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ReplyRuleGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ReplyRuleGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ReplyRuleGroupByOutputType[P]>;
}>>;
export type ReplyRuleWhereInput = {
    AND?: Prisma.ReplyRuleWhereInput | Prisma.ReplyRuleWhereInput[];
    OR?: Prisma.ReplyRuleWhereInput[];
    NOT?: Prisma.ReplyRuleWhereInput | Prisma.ReplyRuleWhereInput[];
    id?: Prisma.StringFilter<"ReplyRule"> | string;
    userId?: Prisma.StringFilter<"ReplyRule"> | string;
    name?: Prisma.StringFilter<"ReplyRule"> | string;
    enabled?: Prisma.BoolFilter<"ReplyRule"> | boolean;
    priority?: Prisma.IntFilter<"ReplyRule"> | number;
    conditionType?: Prisma.EnumRuleConditionTypeFilter<"ReplyRule"> | $Enums.RuleConditionType;
    conditionValue?: Prisma.StringFilter<"ReplyRule"> | string;
    action?: Prisma.EnumRuleActionFilter<"ReplyRule"> | $Enums.RuleAction;
    customReply?: Prisma.StringNullableFilter<"ReplyRule"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"ReplyRule"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ReplyRule"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type ReplyRuleOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    enabled?: Prisma.SortOrder;
    priority?: Prisma.SortOrder;
    conditionType?: Prisma.SortOrder;
    conditionValue?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    customReply?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type ReplyRuleWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ReplyRuleWhereInput | Prisma.ReplyRuleWhereInput[];
    OR?: Prisma.ReplyRuleWhereInput[];
    NOT?: Prisma.ReplyRuleWhereInput | Prisma.ReplyRuleWhereInput[];
    userId?: Prisma.StringFilter<"ReplyRule"> | string;
    name?: Prisma.StringFilter<"ReplyRule"> | string;
    enabled?: Prisma.BoolFilter<"ReplyRule"> | boolean;
    priority?: Prisma.IntFilter<"ReplyRule"> | number;
    conditionType?: Prisma.EnumRuleConditionTypeFilter<"ReplyRule"> | $Enums.RuleConditionType;
    conditionValue?: Prisma.StringFilter<"ReplyRule"> | string;
    action?: Prisma.EnumRuleActionFilter<"ReplyRule"> | $Enums.RuleAction;
    customReply?: Prisma.StringNullableFilter<"ReplyRule"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"ReplyRule"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ReplyRule"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id">;
export type ReplyRuleOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    enabled?: Prisma.SortOrder;
    priority?: Prisma.SortOrder;
    conditionType?: Prisma.SortOrder;
    conditionValue?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    customReply?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.ReplyRuleCountOrderByAggregateInput;
    _avg?: Prisma.ReplyRuleAvgOrderByAggregateInput;
    _max?: Prisma.ReplyRuleMaxOrderByAggregateInput;
    _min?: Prisma.ReplyRuleMinOrderByAggregateInput;
    _sum?: Prisma.ReplyRuleSumOrderByAggregateInput;
};
export type ReplyRuleScalarWhereWithAggregatesInput = {
    AND?: Prisma.ReplyRuleScalarWhereWithAggregatesInput | Prisma.ReplyRuleScalarWhereWithAggregatesInput[];
    OR?: Prisma.ReplyRuleScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ReplyRuleScalarWhereWithAggregatesInput | Prisma.ReplyRuleScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"ReplyRule"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"ReplyRule"> | string;
    name?: Prisma.StringWithAggregatesFilter<"ReplyRule"> | string;
    enabled?: Prisma.BoolWithAggregatesFilter<"ReplyRule"> | boolean;
    priority?: Prisma.IntWithAggregatesFilter<"ReplyRule"> | number;
    conditionType?: Prisma.EnumRuleConditionTypeWithAggregatesFilter<"ReplyRule"> | $Enums.RuleConditionType;
    conditionValue?: Prisma.StringWithAggregatesFilter<"ReplyRule"> | string;
    action?: Prisma.EnumRuleActionWithAggregatesFilter<"ReplyRule"> | $Enums.RuleAction;
    customReply?: Prisma.StringNullableWithAggregatesFilter<"ReplyRule"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"ReplyRule"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"ReplyRule"> | Date | string;
};
export type ReplyRuleCreateInput = {
    id?: string;
    name: string;
    enabled?: boolean;
    priority?: number;
    conditionType: $Enums.RuleConditionType;
    conditionValue: string;
    action: $Enums.RuleAction;
    customReply?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutReplyRulesInput;
};
export type ReplyRuleUncheckedCreateInput = {
    id?: string;
    userId: string;
    name: string;
    enabled?: boolean;
    priority?: number;
    conditionType: $Enums.RuleConditionType;
    conditionValue: string;
    action: $Enums.RuleAction;
    customReply?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ReplyRuleUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    enabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    priority?: Prisma.IntFieldUpdateOperationsInput | number;
    conditionType?: Prisma.EnumRuleConditionTypeFieldUpdateOperationsInput | $Enums.RuleConditionType;
    conditionValue?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.EnumRuleActionFieldUpdateOperationsInput | $Enums.RuleAction;
    customReply?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutReplyRulesNestedInput;
};
export type ReplyRuleUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    enabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    priority?: Prisma.IntFieldUpdateOperationsInput | number;
    conditionType?: Prisma.EnumRuleConditionTypeFieldUpdateOperationsInput | $Enums.RuleConditionType;
    conditionValue?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.EnumRuleActionFieldUpdateOperationsInput | $Enums.RuleAction;
    customReply?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReplyRuleCreateManyInput = {
    id?: string;
    userId: string;
    name: string;
    enabled?: boolean;
    priority?: number;
    conditionType: $Enums.RuleConditionType;
    conditionValue: string;
    action: $Enums.RuleAction;
    customReply?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ReplyRuleUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    enabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    priority?: Prisma.IntFieldUpdateOperationsInput | number;
    conditionType?: Prisma.EnumRuleConditionTypeFieldUpdateOperationsInput | $Enums.RuleConditionType;
    conditionValue?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.EnumRuleActionFieldUpdateOperationsInput | $Enums.RuleAction;
    customReply?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReplyRuleUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    enabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    priority?: Prisma.IntFieldUpdateOperationsInput | number;
    conditionType?: Prisma.EnumRuleConditionTypeFieldUpdateOperationsInput | $Enums.RuleConditionType;
    conditionValue?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.EnumRuleActionFieldUpdateOperationsInput | $Enums.RuleAction;
    customReply?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReplyRuleListRelationFilter = {
    every?: Prisma.ReplyRuleWhereInput;
    some?: Prisma.ReplyRuleWhereInput;
    none?: Prisma.ReplyRuleWhereInput;
};
export type ReplyRuleOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ReplyRuleCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    enabled?: Prisma.SortOrder;
    priority?: Prisma.SortOrder;
    conditionType?: Prisma.SortOrder;
    conditionValue?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    customReply?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ReplyRuleAvgOrderByAggregateInput = {
    priority?: Prisma.SortOrder;
};
export type ReplyRuleMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    enabled?: Prisma.SortOrder;
    priority?: Prisma.SortOrder;
    conditionType?: Prisma.SortOrder;
    conditionValue?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    customReply?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ReplyRuleMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    enabled?: Prisma.SortOrder;
    priority?: Prisma.SortOrder;
    conditionType?: Prisma.SortOrder;
    conditionValue?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    customReply?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ReplyRuleSumOrderByAggregateInput = {
    priority?: Prisma.SortOrder;
};
export type ReplyRuleCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.ReplyRuleCreateWithoutUserInput, Prisma.ReplyRuleUncheckedCreateWithoutUserInput> | Prisma.ReplyRuleCreateWithoutUserInput[] | Prisma.ReplyRuleUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ReplyRuleCreateOrConnectWithoutUserInput | Prisma.ReplyRuleCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.ReplyRuleCreateManyUserInputEnvelope;
    connect?: Prisma.ReplyRuleWhereUniqueInput | Prisma.ReplyRuleWhereUniqueInput[];
};
export type ReplyRuleUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.ReplyRuleCreateWithoutUserInput, Prisma.ReplyRuleUncheckedCreateWithoutUserInput> | Prisma.ReplyRuleCreateWithoutUserInput[] | Prisma.ReplyRuleUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ReplyRuleCreateOrConnectWithoutUserInput | Prisma.ReplyRuleCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.ReplyRuleCreateManyUserInputEnvelope;
    connect?: Prisma.ReplyRuleWhereUniqueInput | Prisma.ReplyRuleWhereUniqueInput[];
};
export type ReplyRuleUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.ReplyRuleCreateWithoutUserInput, Prisma.ReplyRuleUncheckedCreateWithoutUserInput> | Prisma.ReplyRuleCreateWithoutUserInput[] | Prisma.ReplyRuleUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ReplyRuleCreateOrConnectWithoutUserInput | Prisma.ReplyRuleCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.ReplyRuleUpsertWithWhereUniqueWithoutUserInput | Prisma.ReplyRuleUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.ReplyRuleCreateManyUserInputEnvelope;
    set?: Prisma.ReplyRuleWhereUniqueInput | Prisma.ReplyRuleWhereUniqueInput[];
    disconnect?: Prisma.ReplyRuleWhereUniqueInput | Prisma.ReplyRuleWhereUniqueInput[];
    delete?: Prisma.ReplyRuleWhereUniqueInput | Prisma.ReplyRuleWhereUniqueInput[];
    connect?: Prisma.ReplyRuleWhereUniqueInput | Prisma.ReplyRuleWhereUniqueInput[];
    update?: Prisma.ReplyRuleUpdateWithWhereUniqueWithoutUserInput | Prisma.ReplyRuleUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.ReplyRuleUpdateManyWithWhereWithoutUserInput | Prisma.ReplyRuleUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.ReplyRuleScalarWhereInput | Prisma.ReplyRuleScalarWhereInput[];
};
export type ReplyRuleUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.ReplyRuleCreateWithoutUserInput, Prisma.ReplyRuleUncheckedCreateWithoutUserInput> | Prisma.ReplyRuleCreateWithoutUserInput[] | Prisma.ReplyRuleUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ReplyRuleCreateOrConnectWithoutUserInput | Prisma.ReplyRuleCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.ReplyRuleUpsertWithWhereUniqueWithoutUserInput | Prisma.ReplyRuleUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.ReplyRuleCreateManyUserInputEnvelope;
    set?: Prisma.ReplyRuleWhereUniqueInput | Prisma.ReplyRuleWhereUniqueInput[];
    disconnect?: Prisma.ReplyRuleWhereUniqueInput | Prisma.ReplyRuleWhereUniqueInput[];
    delete?: Prisma.ReplyRuleWhereUniqueInput | Prisma.ReplyRuleWhereUniqueInput[];
    connect?: Prisma.ReplyRuleWhereUniqueInput | Prisma.ReplyRuleWhereUniqueInput[];
    update?: Prisma.ReplyRuleUpdateWithWhereUniqueWithoutUserInput | Prisma.ReplyRuleUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.ReplyRuleUpdateManyWithWhereWithoutUserInput | Prisma.ReplyRuleUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.ReplyRuleScalarWhereInput | Prisma.ReplyRuleScalarWhereInput[];
};
export type EnumRuleConditionTypeFieldUpdateOperationsInput = {
    set?: $Enums.RuleConditionType;
};
export type EnumRuleActionFieldUpdateOperationsInput = {
    set?: $Enums.RuleAction;
};
export type ReplyRuleCreateWithoutUserInput = {
    id?: string;
    name: string;
    enabled?: boolean;
    priority?: number;
    conditionType: $Enums.RuleConditionType;
    conditionValue: string;
    action: $Enums.RuleAction;
    customReply?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ReplyRuleUncheckedCreateWithoutUserInput = {
    id?: string;
    name: string;
    enabled?: boolean;
    priority?: number;
    conditionType: $Enums.RuleConditionType;
    conditionValue: string;
    action: $Enums.RuleAction;
    customReply?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ReplyRuleCreateOrConnectWithoutUserInput = {
    where: Prisma.ReplyRuleWhereUniqueInput;
    create: Prisma.XOR<Prisma.ReplyRuleCreateWithoutUserInput, Prisma.ReplyRuleUncheckedCreateWithoutUserInput>;
};
export type ReplyRuleCreateManyUserInputEnvelope = {
    data: Prisma.ReplyRuleCreateManyUserInput | Prisma.ReplyRuleCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type ReplyRuleUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.ReplyRuleWhereUniqueInput;
    update: Prisma.XOR<Prisma.ReplyRuleUpdateWithoutUserInput, Prisma.ReplyRuleUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.ReplyRuleCreateWithoutUserInput, Prisma.ReplyRuleUncheckedCreateWithoutUserInput>;
};
export type ReplyRuleUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.ReplyRuleWhereUniqueInput;
    data: Prisma.XOR<Prisma.ReplyRuleUpdateWithoutUserInput, Prisma.ReplyRuleUncheckedUpdateWithoutUserInput>;
};
export type ReplyRuleUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.ReplyRuleScalarWhereInput;
    data: Prisma.XOR<Prisma.ReplyRuleUpdateManyMutationInput, Prisma.ReplyRuleUncheckedUpdateManyWithoutUserInput>;
};
export type ReplyRuleScalarWhereInput = {
    AND?: Prisma.ReplyRuleScalarWhereInput | Prisma.ReplyRuleScalarWhereInput[];
    OR?: Prisma.ReplyRuleScalarWhereInput[];
    NOT?: Prisma.ReplyRuleScalarWhereInput | Prisma.ReplyRuleScalarWhereInput[];
    id?: Prisma.StringFilter<"ReplyRule"> | string;
    userId?: Prisma.StringFilter<"ReplyRule"> | string;
    name?: Prisma.StringFilter<"ReplyRule"> | string;
    enabled?: Prisma.BoolFilter<"ReplyRule"> | boolean;
    priority?: Prisma.IntFilter<"ReplyRule"> | number;
    conditionType?: Prisma.EnumRuleConditionTypeFilter<"ReplyRule"> | $Enums.RuleConditionType;
    conditionValue?: Prisma.StringFilter<"ReplyRule"> | string;
    action?: Prisma.EnumRuleActionFilter<"ReplyRule"> | $Enums.RuleAction;
    customReply?: Prisma.StringNullableFilter<"ReplyRule"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"ReplyRule"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ReplyRule"> | Date | string;
};
export type ReplyRuleCreateManyUserInput = {
    id?: string;
    name: string;
    enabled?: boolean;
    priority?: number;
    conditionType: $Enums.RuleConditionType;
    conditionValue: string;
    action: $Enums.RuleAction;
    customReply?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ReplyRuleUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    enabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    priority?: Prisma.IntFieldUpdateOperationsInput | number;
    conditionType?: Prisma.EnumRuleConditionTypeFieldUpdateOperationsInput | $Enums.RuleConditionType;
    conditionValue?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.EnumRuleActionFieldUpdateOperationsInput | $Enums.RuleAction;
    customReply?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReplyRuleUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    enabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    priority?: Prisma.IntFieldUpdateOperationsInput | number;
    conditionType?: Prisma.EnumRuleConditionTypeFieldUpdateOperationsInput | $Enums.RuleConditionType;
    conditionValue?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.EnumRuleActionFieldUpdateOperationsInput | $Enums.RuleAction;
    customReply?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReplyRuleUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    enabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    priority?: Prisma.IntFieldUpdateOperationsInput | number;
    conditionType?: Prisma.EnumRuleConditionTypeFieldUpdateOperationsInput | $Enums.RuleConditionType;
    conditionValue?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.EnumRuleActionFieldUpdateOperationsInput | $Enums.RuleAction;
    customReply?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReplyRuleSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    name?: boolean;
    enabled?: boolean;
    priority?: boolean;
    conditionType?: boolean;
    conditionValue?: boolean;
    action?: boolean;
    customReply?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["replyRule"]>;
export type ReplyRuleSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    name?: boolean;
    enabled?: boolean;
    priority?: boolean;
    conditionType?: boolean;
    conditionValue?: boolean;
    action?: boolean;
    customReply?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["replyRule"]>;
export type ReplyRuleSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    name?: boolean;
    enabled?: boolean;
    priority?: boolean;
    conditionType?: boolean;
    conditionValue?: boolean;
    action?: boolean;
    customReply?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["replyRule"]>;
export type ReplyRuleSelectScalar = {
    id?: boolean;
    userId?: boolean;
    name?: boolean;
    enabled?: boolean;
    priority?: boolean;
    conditionType?: boolean;
    conditionValue?: boolean;
    action?: boolean;
    customReply?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type ReplyRuleOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "name" | "enabled" | "priority" | "conditionType" | "conditionValue" | "action" | "customReply" | "createdAt" | "updatedAt", ExtArgs["result"]["replyRule"]>;
export type ReplyRuleInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type ReplyRuleIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type ReplyRuleIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $ReplyRulePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ReplyRule";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        name: string;
        enabled: boolean;
        priority: number;
        conditionType: $Enums.RuleConditionType;
        conditionValue: string;
        action: $Enums.RuleAction;
        customReply: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["replyRule"]>;
    composites: {};
};
export type ReplyRuleGetPayload<S extends boolean | null | undefined | ReplyRuleDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ReplyRulePayload, S>;
export type ReplyRuleCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ReplyRuleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ReplyRuleCountAggregateInputType | true;
};
export interface ReplyRuleDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ReplyRule'];
        meta: {
            name: 'ReplyRule';
        };
    };
    /**
     * Find zero or one ReplyRule that matches the filter.
     * @param {ReplyRuleFindUniqueArgs} args - Arguments to find a ReplyRule
     * @example
     * // Get one ReplyRule
     * const replyRule = await prisma.replyRule.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReplyRuleFindUniqueArgs>(args: Prisma.SelectSubset<T, ReplyRuleFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ReplyRuleClient<runtime.Types.Result.GetResult<Prisma.$ReplyRulePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one ReplyRule that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ReplyRuleFindUniqueOrThrowArgs} args - Arguments to find a ReplyRule
     * @example
     * // Get one ReplyRule
     * const replyRule = await prisma.replyRule.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReplyRuleFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ReplyRuleFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ReplyRuleClient<runtime.Types.Result.GetResult<Prisma.$ReplyRulePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first ReplyRule that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReplyRuleFindFirstArgs} args - Arguments to find a ReplyRule
     * @example
     * // Get one ReplyRule
     * const replyRule = await prisma.replyRule.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReplyRuleFindFirstArgs>(args?: Prisma.SelectSubset<T, ReplyRuleFindFirstArgs<ExtArgs>>): Prisma.Prisma__ReplyRuleClient<runtime.Types.Result.GetResult<Prisma.$ReplyRulePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first ReplyRule that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReplyRuleFindFirstOrThrowArgs} args - Arguments to find a ReplyRule
     * @example
     * // Get one ReplyRule
     * const replyRule = await prisma.replyRule.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReplyRuleFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ReplyRuleFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ReplyRuleClient<runtime.Types.Result.GetResult<Prisma.$ReplyRulePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more ReplyRules that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReplyRuleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ReplyRules
     * const replyRules = await prisma.replyRule.findMany()
     *
     * // Get first 10 ReplyRules
     * const replyRules = await prisma.replyRule.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const replyRuleWithIdOnly = await prisma.replyRule.findMany({ select: { id: true } })
     *
     */
    findMany<T extends ReplyRuleFindManyArgs>(args?: Prisma.SelectSubset<T, ReplyRuleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReplyRulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a ReplyRule.
     * @param {ReplyRuleCreateArgs} args - Arguments to create a ReplyRule.
     * @example
     * // Create one ReplyRule
     * const ReplyRule = await prisma.replyRule.create({
     *   data: {
     *     // ... data to create a ReplyRule
     *   }
     * })
     *
     */
    create<T extends ReplyRuleCreateArgs>(args: Prisma.SelectSubset<T, ReplyRuleCreateArgs<ExtArgs>>): Prisma.Prisma__ReplyRuleClient<runtime.Types.Result.GetResult<Prisma.$ReplyRulePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many ReplyRules.
     * @param {ReplyRuleCreateManyArgs} args - Arguments to create many ReplyRules.
     * @example
     * // Create many ReplyRules
     * const replyRule = await prisma.replyRule.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends ReplyRuleCreateManyArgs>(args?: Prisma.SelectSubset<T, ReplyRuleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many ReplyRules and returns the data saved in the database.
     * @param {ReplyRuleCreateManyAndReturnArgs} args - Arguments to create many ReplyRules.
     * @example
     * // Create many ReplyRules
     * const replyRule = await prisma.replyRule.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many ReplyRules and only return the `id`
     * const replyRuleWithIdOnly = await prisma.replyRule.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends ReplyRuleCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ReplyRuleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReplyRulePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a ReplyRule.
     * @param {ReplyRuleDeleteArgs} args - Arguments to delete one ReplyRule.
     * @example
     * // Delete one ReplyRule
     * const ReplyRule = await prisma.replyRule.delete({
     *   where: {
     *     // ... filter to delete one ReplyRule
     *   }
     * })
     *
     */
    delete<T extends ReplyRuleDeleteArgs>(args: Prisma.SelectSubset<T, ReplyRuleDeleteArgs<ExtArgs>>): Prisma.Prisma__ReplyRuleClient<runtime.Types.Result.GetResult<Prisma.$ReplyRulePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one ReplyRule.
     * @param {ReplyRuleUpdateArgs} args - Arguments to update one ReplyRule.
     * @example
     * // Update one ReplyRule
     * const replyRule = await prisma.replyRule.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends ReplyRuleUpdateArgs>(args: Prisma.SelectSubset<T, ReplyRuleUpdateArgs<ExtArgs>>): Prisma.Prisma__ReplyRuleClient<runtime.Types.Result.GetResult<Prisma.$ReplyRulePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more ReplyRules.
     * @param {ReplyRuleDeleteManyArgs} args - Arguments to filter ReplyRules to delete.
     * @example
     * // Delete a few ReplyRules
     * const { count } = await prisma.replyRule.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends ReplyRuleDeleteManyArgs>(args?: Prisma.SelectSubset<T, ReplyRuleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more ReplyRules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReplyRuleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ReplyRules
     * const replyRule = await prisma.replyRule.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends ReplyRuleUpdateManyArgs>(args: Prisma.SelectSubset<T, ReplyRuleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more ReplyRules and returns the data updated in the database.
     * @param {ReplyRuleUpdateManyAndReturnArgs} args - Arguments to update many ReplyRules.
     * @example
     * // Update many ReplyRules
     * const replyRule = await prisma.replyRule.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more ReplyRules and only return the `id`
     * const replyRuleWithIdOnly = await prisma.replyRule.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends ReplyRuleUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ReplyRuleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReplyRulePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one ReplyRule.
     * @param {ReplyRuleUpsertArgs} args - Arguments to update or create a ReplyRule.
     * @example
     * // Update or create a ReplyRule
     * const replyRule = await prisma.replyRule.upsert({
     *   create: {
     *     // ... data to create a ReplyRule
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ReplyRule we want to update
     *   }
     * })
     */
    upsert<T extends ReplyRuleUpsertArgs>(args: Prisma.SelectSubset<T, ReplyRuleUpsertArgs<ExtArgs>>): Prisma.Prisma__ReplyRuleClient<runtime.Types.Result.GetResult<Prisma.$ReplyRulePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of ReplyRules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReplyRuleCountArgs} args - Arguments to filter ReplyRules to count.
     * @example
     * // Count the number of ReplyRules
     * const count = await prisma.replyRule.count({
     *   where: {
     *     // ... the filter for the ReplyRules we want to count
     *   }
     * })
    **/
    count<T extends ReplyRuleCountArgs>(args?: Prisma.Subset<T, ReplyRuleCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ReplyRuleCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a ReplyRule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReplyRuleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReplyRuleAggregateArgs>(args: Prisma.Subset<T, ReplyRuleAggregateArgs>): Prisma.PrismaPromise<GetReplyRuleAggregateType<T>>;
    /**
     * Group by ReplyRule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReplyRuleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends ReplyRuleGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ReplyRuleGroupByArgs['orderBy'];
    } : {
        orderBy?: ReplyRuleGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ReplyRuleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReplyRuleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the ReplyRule model
     */
    readonly fields: ReplyRuleFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for ReplyRule.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__ReplyRuleClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the ReplyRule model
 */
export interface ReplyRuleFieldRefs {
    readonly id: Prisma.FieldRef<"ReplyRule", 'String'>;
    readonly userId: Prisma.FieldRef<"ReplyRule", 'String'>;
    readonly name: Prisma.FieldRef<"ReplyRule", 'String'>;
    readonly enabled: Prisma.FieldRef<"ReplyRule", 'Boolean'>;
    readonly priority: Prisma.FieldRef<"ReplyRule", 'Int'>;
    readonly conditionType: Prisma.FieldRef<"ReplyRule", 'RuleConditionType'>;
    readonly conditionValue: Prisma.FieldRef<"ReplyRule", 'String'>;
    readonly action: Prisma.FieldRef<"ReplyRule", 'RuleAction'>;
    readonly customReply: Prisma.FieldRef<"ReplyRule", 'String'>;
    readonly createdAt: Prisma.FieldRef<"ReplyRule", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"ReplyRule", 'DateTime'>;
}
/**
 * ReplyRule findUnique
 */
export type ReplyRuleFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReplyRule
     */
    select?: Prisma.ReplyRuleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ReplyRule
     */
    omit?: Prisma.ReplyRuleOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ReplyRuleInclude<ExtArgs> | null;
    /**
     * Filter, which ReplyRule to fetch.
     */
    where: Prisma.ReplyRuleWhereUniqueInput;
};
/**
 * ReplyRule findUniqueOrThrow
 */
export type ReplyRuleFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReplyRule
     */
    select?: Prisma.ReplyRuleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ReplyRule
     */
    omit?: Prisma.ReplyRuleOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ReplyRuleInclude<ExtArgs> | null;
    /**
     * Filter, which ReplyRule to fetch.
     */
    where: Prisma.ReplyRuleWhereUniqueInput;
};
/**
 * ReplyRule findFirst
 */
export type ReplyRuleFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReplyRule
     */
    select?: Prisma.ReplyRuleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ReplyRule
     */
    omit?: Prisma.ReplyRuleOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ReplyRuleInclude<ExtArgs> | null;
    /**
     * Filter, which ReplyRule to fetch.
     */
    where?: Prisma.ReplyRuleWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ReplyRules to fetch.
     */
    orderBy?: Prisma.ReplyRuleOrderByWithRelationInput | Prisma.ReplyRuleOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ReplyRules.
     */
    cursor?: Prisma.ReplyRuleWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ReplyRules from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ReplyRules.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ReplyRules.
     */
    distinct?: Prisma.ReplyRuleScalarFieldEnum | Prisma.ReplyRuleScalarFieldEnum[];
};
/**
 * ReplyRule findFirstOrThrow
 */
export type ReplyRuleFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReplyRule
     */
    select?: Prisma.ReplyRuleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ReplyRule
     */
    omit?: Prisma.ReplyRuleOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ReplyRuleInclude<ExtArgs> | null;
    /**
     * Filter, which ReplyRule to fetch.
     */
    where?: Prisma.ReplyRuleWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ReplyRules to fetch.
     */
    orderBy?: Prisma.ReplyRuleOrderByWithRelationInput | Prisma.ReplyRuleOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ReplyRules.
     */
    cursor?: Prisma.ReplyRuleWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ReplyRules from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ReplyRules.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ReplyRules.
     */
    distinct?: Prisma.ReplyRuleScalarFieldEnum | Prisma.ReplyRuleScalarFieldEnum[];
};
/**
 * ReplyRule findMany
 */
export type ReplyRuleFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReplyRule
     */
    select?: Prisma.ReplyRuleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ReplyRule
     */
    omit?: Prisma.ReplyRuleOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ReplyRuleInclude<ExtArgs> | null;
    /**
     * Filter, which ReplyRules to fetch.
     */
    where?: Prisma.ReplyRuleWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ReplyRules to fetch.
     */
    orderBy?: Prisma.ReplyRuleOrderByWithRelationInput | Prisma.ReplyRuleOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing ReplyRules.
     */
    cursor?: Prisma.ReplyRuleWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ReplyRules from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ReplyRules.
     */
    skip?: number;
    distinct?: Prisma.ReplyRuleScalarFieldEnum | Prisma.ReplyRuleScalarFieldEnum[];
};
/**
 * ReplyRule create
 */
export type ReplyRuleCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReplyRule
     */
    select?: Prisma.ReplyRuleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ReplyRule
     */
    omit?: Prisma.ReplyRuleOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ReplyRuleInclude<ExtArgs> | null;
    /**
     * The data needed to create a ReplyRule.
     */
    data: Prisma.XOR<Prisma.ReplyRuleCreateInput, Prisma.ReplyRuleUncheckedCreateInput>;
};
/**
 * ReplyRule createMany
 */
export type ReplyRuleCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many ReplyRules.
     */
    data: Prisma.ReplyRuleCreateManyInput | Prisma.ReplyRuleCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * ReplyRule createManyAndReturn
 */
export type ReplyRuleCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReplyRule
     */
    select?: Prisma.ReplyRuleSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the ReplyRule
     */
    omit?: Prisma.ReplyRuleOmit<ExtArgs> | null;
    /**
     * The data used to create many ReplyRules.
     */
    data: Prisma.ReplyRuleCreateManyInput | Prisma.ReplyRuleCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ReplyRuleIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * ReplyRule update
 */
export type ReplyRuleUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReplyRule
     */
    select?: Prisma.ReplyRuleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ReplyRule
     */
    omit?: Prisma.ReplyRuleOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ReplyRuleInclude<ExtArgs> | null;
    /**
     * The data needed to update a ReplyRule.
     */
    data: Prisma.XOR<Prisma.ReplyRuleUpdateInput, Prisma.ReplyRuleUncheckedUpdateInput>;
    /**
     * Choose, which ReplyRule to update.
     */
    where: Prisma.ReplyRuleWhereUniqueInput;
};
/**
 * ReplyRule updateMany
 */
export type ReplyRuleUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update ReplyRules.
     */
    data: Prisma.XOR<Prisma.ReplyRuleUpdateManyMutationInput, Prisma.ReplyRuleUncheckedUpdateManyInput>;
    /**
     * Filter which ReplyRules to update
     */
    where?: Prisma.ReplyRuleWhereInput;
    /**
     * Limit how many ReplyRules to update.
     */
    limit?: number;
};
/**
 * ReplyRule updateManyAndReturn
 */
export type ReplyRuleUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReplyRule
     */
    select?: Prisma.ReplyRuleSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the ReplyRule
     */
    omit?: Prisma.ReplyRuleOmit<ExtArgs> | null;
    /**
     * The data used to update ReplyRules.
     */
    data: Prisma.XOR<Prisma.ReplyRuleUpdateManyMutationInput, Prisma.ReplyRuleUncheckedUpdateManyInput>;
    /**
     * Filter which ReplyRules to update
     */
    where?: Prisma.ReplyRuleWhereInput;
    /**
     * Limit how many ReplyRules to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ReplyRuleIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * ReplyRule upsert
 */
export type ReplyRuleUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReplyRule
     */
    select?: Prisma.ReplyRuleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ReplyRule
     */
    omit?: Prisma.ReplyRuleOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ReplyRuleInclude<ExtArgs> | null;
    /**
     * The filter to search for the ReplyRule to update in case it exists.
     */
    where: Prisma.ReplyRuleWhereUniqueInput;
    /**
     * In case the ReplyRule found by the `where` argument doesn't exist, create a new ReplyRule with this data.
     */
    create: Prisma.XOR<Prisma.ReplyRuleCreateInput, Prisma.ReplyRuleUncheckedCreateInput>;
    /**
     * In case the ReplyRule was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.ReplyRuleUpdateInput, Prisma.ReplyRuleUncheckedUpdateInput>;
};
/**
 * ReplyRule delete
 */
export type ReplyRuleDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReplyRule
     */
    select?: Prisma.ReplyRuleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ReplyRule
     */
    omit?: Prisma.ReplyRuleOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ReplyRuleInclude<ExtArgs> | null;
    /**
     * Filter which ReplyRule to delete.
     */
    where: Prisma.ReplyRuleWhereUniqueInput;
};
/**
 * ReplyRule deleteMany
 */
export type ReplyRuleDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which ReplyRules to delete
     */
    where?: Prisma.ReplyRuleWhereInput;
    /**
     * Limit how many ReplyRules to delete.
     */
    limit?: number;
};
/**
 * ReplyRule without action
 */
export type ReplyRuleDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReplyRule
     */
    select?: Prisma.ReplyRuleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ReplyRule
     */
    omit?: Prisma.ReplyRuleOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ReplyRuleInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=ReplyRule.d.ts.map