import type * as runtime from "@prisma/client/runtime/library";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model AISettings
 *
 */
export type AISettingsModel = runtime.Types.Result.DefaultSelection<Prisma.$AISettingsPayload>;
export type AggregateAISettings = {
    _count: AISettingsCountAggregateOutputType | null;
    _avg: AISettingsAvgAggregateOutputType | null;
    _sum: AISettingsSumAggregateOutputType | null;
    _min: AISettingsMinAggregateOutputType | null;
    _max: AISettingsMaxAggregateOutputType | null;
};
export type AISettingsAvgAggregateOutputType = {
    confidenceThreshold: number | null;
    maxLength: number | null;
};
export type AISettingsSumAggregateOutputType = {
    confidenceThreshold: number | null;
    maxLength: number | null;
};
export type AISettingsMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    status: $Enums.AISettingStatus | null;
    aiProvider: string | null;
    model: string | null;
    confidenceThreshold: number | null;
    tone: string | null;
    language: string | null;
    emojiUsage: boolean | null;
    maxLength: number | null;
    spamHandling: string | null;
    humanApprovalMode: boolean | null;
    fallbackBehavior: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type AISettingsMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    status: $Enums.AISettingStatus | null;
    aiProvider: string | null;
    model: string | null;
    confidenceThreshold: number | null;
    tone: string | null;
    language: string | null;
    emojiUsage: boolean | null;
    maxLength: number | null;
    spamHandling: string | null;
    humanApprovalMode: boolean | null;
    fallbackBehavior: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type AISettingsCountAggregateOutputType = {
    id: number;
    userId: number;
    status: number;
    aiProvider: number;
    model: number;
    confidenceThreshold: number;
    tone: number;
    language: number;
    emojiUsage: number;
    maxLength: number;
    spamHandling: number;
    humanApprovalMode: number;
    fallbackBehavior: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type AISettingsAvgAggregateInputType = {
    confidenceThreshold?: true;
    maxLength?: true;
};
export type AISettingsSumAggregateInputType = {
    confidenceThreshold?: true;
    maxLength?: true;
};
export type AISettingsMinAggregateInputType = {
    id?: true;
    userId?: true;
    status?: true;
    aiProvider?: true;
    model?: true;
    confidenceThreshold?: true;
    tone?: true;
    language?: true;
    emojiUsage?: true;
    maxLength?: true;
    spamHandling?: true;
    humanApprovalMode?: true;
    fallbackBehavior?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type AISettingsMaxAggregateInputType = {
    id?: true;
    userId?: true;
    status?: true;
    aiProvider?: true;
    model?: true;
    confidenceThreshold?: true;
    tone?: true;
    language?: true;
    emojiUsage?: true;
    maxLength?: true;
    spamHandling?: true;
    humanApprovalMode?: true;
    fallbackBehavior?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type AISettingsCountAggregateInputType = {
    id?: true;
    userId?: true;
    status?: true;
    aiProvider?: true;
    model?: true;
    confidenceThreshold?: true;
    tone?: true;
    language?: true;
    emojiUsage?: true;
    maxLength?: true;
    spamHandling?: true;
    humanApprovalMode?: true;
    fallbackBehavior?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type AISettingsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which AISettings to aggregate.
     */
    where?: Prisma.AISettingsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of AISettings to fetch.
     */
    orderBy?: Prisma.AISettingsOrderByWithRelationInput | Prisma.AISettingsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.AISettingsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` AISettings from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` AISettings.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned AISettings
    **/
    _count?: true | AISettingsCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: AISettingsAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: AISettingsSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: AISettingsMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: AISettingsMaxAggregateInputType;
};
export type GetAISettingsAggregateType<T extends AISettingsAggregateArgs> = {
    [P in keyof T & keyof AggregateAISettings]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateAISettings[P]> : Prisma.GetScalarType<T[P], AggregateAISettings[P]>;
};
export type AISettingsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AISettingsWhereInput;
    orderBy?: Prisma.AISettingsOrderByWithAggregationInput | Prisma.AISettingsOrderByWithAggregationInput[];
    by: Prisma.AISettingsScalarFieldEnum[] | Prisma.AISettingsScalarFieldEnum;
    having?: Prisma.AISettingsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AISettingsCountAggregateInputType | true;
    _avg?: AISettingsAvgAggregateInputType;
    _sum?: AISettingsSumAggregateInputType;
    _min?: AISettingsMinAggregateInputType;
    _max?: AISettingsMaxAggregateInputType;
};
export type AISettingsGroupByOutputType = {
    id: string;
    userId: string;
    status: $Enums.AISettingStatus;
    aiProvider: string;
    model: string;
    confidenceThreshold: number;
    tone: string;
    language: string;
    emojiUsage: boolean;
    maxLength: number;
    spamHandling: string;
    humanApprovalMode: boolean;
    fallbackBehavior: string;
    createdAt: Date;
    updatedAt: Date;
    _count: AISettingsCountAggregateOutputType | null;
    _avg: AISettingsAvgAggregateOutputType | null;
    _sum: AISettingsSumAggregateOutputType | null;
    _min: AISettingsMinAggregateOutputType | null;
    _max: AISettingsMaxAggregateOutputType | null;
};
type GetAISettingsGroupByPayload<T extends AISettingsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<AISettingsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof AISettingsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], AISettingsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], AISettingsGroupByOutputType[P]>;
}>>;
export type AISettingsWhereInput = {
    AND?: Prisma.AISettingsWhereInput | Prisma.AISettingsWhereInput[];
    OR?: Prisma.AISettingsWhereInput[];
    NOT?: Prisma.AISettingsWhereInput | Prisma.AISettingsWhereInput[];
    id?: Prisma.StringFilter<"AISettings"> | string;
    userId?: Prisma.StringFilter<"AISettings"> | string;
    status?: Prisma.EnumAISettingStatusFilter<"AISettings"> | $Enums.AISettingStatus;
    aiProvider?: Prisma.StringFilter<"AISettings"> | string;
    model?: Prisma.StringFilter<"AISettings"> | string;
    confidenceThreshold?: Prisma.FloatFilter<"AISettings"> | number;
    tone?: Prisma.StringFilter<"AISettings"> | string;
    language?: Prisma.StringFilter<"AISettings"> | string;
    emojiUsage?: Prisma.BoolFilter<"AISettings"> | boolean;
    maxLength?: Prisma.IntFilter<"AISettings"> | number;
    spamHandling?: Prisma.StringFilter<"AISettings"> | string;
    humanApprovalMode?: Prisma.BoolFilter<"AISettings"> | boolean;
    fallbackBehavior?: Prisma.StringFilter<"AISettings"> | string;
    createdAt?: Prisma.DateTimeFilter<"AISettings"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"AISettings"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type AISettingsOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    aiProvider?: Prisma.SortOrder;
    model?: Prisma.SortOrder;
    confidenceThreshold?: Prisma.SortOrder;
    tone?: Prisma.SortOrder;
    language?: Prisma.SortOrder;
    emojiUsage?: Prisma.SortOrder;
    maxLength?: Prisma.SortOrder;
    spamHandling?: Prisma.SortOrder;
    humanApprovalMode?: Prisma.SortOrder;
    fallbackBehavior?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type AISettingsWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    userId?: string;
    AND?: Prisma.AISettingsWhereInput | Prisma.AISettingsWhereInput[];
    OR?: Prisma.AISettingsWhereInput[];
    NOT?: Prisma.AISettingsWhereInput | Prisma.AISettingsWhereInput[];
    status?: Prisma.EnumAISettingStatusFilter<"AISettings"> | $Enums.AISettingStatus;
    aiProvider?: Prisma.StringFilter<"AISettings"> | string;
    model?: Prisma.StringFilter<"AISettings"> | string;
    confidenceThreshold?: Prisma.FloatFilter<"AISettings"> | number;
    tone?: Prisma.StringFilter<"AISettings"> | string;
    language?: Prisma.StringFilter<"AISettings"> | string;
    emojiUsage?: Prisma.BoolFilter<"AISettings"> | boolean;
    maxLength?: Prisma.IntFilter<"AISettings"> | number;
    spamHandling?: Prisma.StringFilter<"AISettings"> | string;
    humanApprovalMode?: Prisma.BoolFilter<"AISettings"> | boolean;
    fallbackBehavior?: Prisma.StringFilter<"AISettings"> | string;
    createdAt?: Prisma.DateTimeFilter<"AISettings"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"AISettings"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id" | "userId">;
export type AISettingsOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    aiProvider?: Prisma.SortOrder;
    model?: Prisma.SortOrder;
    confidenceThreshold?: Prisma.SortOrder;
    tone?: Prisma.SortOrder;
    language?: Prisma.SortOrder;
    emojiUsage?: Prisma.SortOrder;
    maxLength?: Prisma.SortOrder;
    spamHandling?: Prisma.SortOrder;
    humanApprovalMode?: Prisma.SortOrder;
    fallbackBehavior?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.AISettingsCountOrderByAggregateInput;
    _avg?: Prisma.AISettingsAvgOrderByAggregateInput;
    _max?: Prisma.AISettingsMaxOrderByAggregateInput;
    _min?: Prisma.AISettingsMinOrderByAggregateInput;
    _sum?: Prisma.AISettingsSumOrderByAggregateInput;
};
export type AISettingsScalarWhereWithAggregatesInput = {
    AND?: Prisma.AISettingsScalarWhereWithAggregatesInput | Prisma.AISettingsScalarWhereWithAggregatesInput[];
    OR?: Prisma.AISettingsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.AISettingsScalarWhereWithAggregatesInput | Prisma.AISettingsScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"AISettings"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"AISettings"> | string;
    status?: Prisma.EnumAISettingStatusWithAggregatesFilter<"AISettings"> | $Enums.AISettingStatus;
    aiProvider?: Prisma.StringWithAggregatesFilter<"AISettings"> | string;
    model?: Prisma.StringWithAggregatesFilter<"AISettings"> | string;
    confidenceThreshold?: Prisma.FloatWithAggregatesFilter<"AISettings"> | number;
    tone?: Prisma.StringWithAggregatesFilter<"AISettings"> | string;
    language?: Prisma.StringWithAggregatesFilter<"AISettings"> | string;
    emojiUsage?: Prisma.BoolWithAggregatesFilter<"AISettings"> | boolean;
    maxLength?: Prisma.IntWithAggregatesFilter<"AISettings"> | number;
    spamHandling?: Prisma.StringWithAggregatesFilter<"AISettings"> | string;
    humanApprovalMode?: Prisma.BoolWithAggregatesFilter<"AISettings"> | boolean;
    fallbackBehavior?: Prisma.StringWithAggregatesFilter<"AISettings"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"AISettings"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"AISettings"> | Date | string;
};
export type AISettingsCreateInput = {
    id?: string;
    status?: $Enums.AISettingStatus;
    aiProvider?: string;
    model?: string;
    confidenceThreshold?: number;
    tone?: string;
    language?: string;
    emojiUsage?: boolean;
    maxLength?: number;
    spamHandling?: string;
    humanApprovalMode?: boolean;
    fallbackBehavior?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutAiSettingsInput;
};
export type AISettingsUncheckedCreateInput = {
    id?: string;
    userId: string;
    status?: $Enums.AISettingStatus;
    aiProvider?: string;
    model?: string;
    confidenceThreshold?: number;
    tone?: string;
    language?: string;
    emojiUsage?: boolean;
    maxLength?: number;
    spamHandling?: string;
    humanApprovalMode?: boolean;
    fallbackBehavior?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type AISettingsUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumAISettingStatusFieldUpdateOperationsInput | $Enums.AISettingStatus;
    aiProvider?: Prisma.StringFieldUpdateOperationsInput | string;
    model?: Prisma.StringFieldUpdateOperationsInput | string;
    confidenceThreshold?: Prisma.FloatFieldUpdateOperationsInput | number;
    tone?: Prisma.StringFieldUpdateOperationsInput | string;
    language?: Prisma.StringFieldUpdateOperationsInput | string;
    emojiUsage?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    maxLength?: Prisma.IntFieldUpdateOperationsInput | number;
    spamHandling?: Prisma.StringFieldUpdateOperationsInput | string;
    humanApprovalMode?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    fallbackBehavior?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutAiSettingsNestedInput;
};
export type AISettingsUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumAISettingStatusFieldUpdateOperationsInput | $Enums.AISettingStatus;
    aiProvider?: Prisma.StringFieldUpdateOperationsInput | string;
    model?: Prisma.StringFieldUpdateOperationsInput | string;
    confidenceThreshold?: Prisma.FloatFieldUpdateOperationsInput | number;
    tone?: Prisma.StringFieldUpdateOperationsInput | string;
    language?: Prisma.StringFieldUpdateOperationsInput | string;
    emojiUsage?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    maxLength?: Prisma.IntFieldUpdateOperationsInput | number;
    spamHandling?: Prisma.StringFieldUpdateOperationsInput | string;
    humanApprovalMode?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    fallbackBehavior?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AISettingsCreateManyInput = {
    id?: string;
    userId: string;
    status?: $Enums.AISettingStatus;
    aiProvider?: string;
    model?: string;
    confidenceThreshold?: number;
    tone?: string;
    language?: string;
    emojiUsage?: boolean;
    maxLength?: number;
    spamHandling?: string;
    humanApprovalMode?: boolean;
    fallbackBehavior?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type AISettingsUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumAISettingStatusFieldUpdateOperationsInput | $Enums.AISettingStatus;
    aiProvider?: Prisma.StringFieldUpdateOperationsInput | string;
    model?: Prisma.StringFieldUpdateOperationsInput | string;
    confidenceThreshold?: Prisma.FloatFieldUpdateOperationsInput | number;
    tone?: Prisma.StringFieldUpdateOperationsInput | string;
    language?: Prisma.StringFieldUpdateOperationsInput | string;
    emojiUsage?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    maxLength?: Prisma.IntFieldUpdateOperationsInput | number;
    spamHandling?: Prisma.StringFieldUpdateOperationsInput | string;
    humanApprovalMode?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    fallbackBehavior?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AISettingsUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumAISettingStatusFieldUpdateOperationsInput | $Enums.AISettingStatus;
    aiProvider?: Prisma.StringFieldUpdateOperationsInput | string;
    model?: Prisma.StringFieldUpdateOperationsInput | string;
    confidenceThreshold?: Prisma.FloatFieldUpdateOperationsInput | number;
    tone?: Prisma.StringFieldUpdateOperationsInput | string;
    language?: Prisma.StringFieldUpdateOperationsInput | string;
    emojiUsage?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    maxLength?: Prisma.IntFieldUpdateOperationsInput | number;
    spamHandling?: Prisma.StringFieldUpdateOperationsInput | string;
    humanApprovalMode?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    fallbackBehavior?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AISettingsNullableScalarRelationFilter = {
    is?: Prisma.AISettingsWhereInput | null;
    isNot?: Prisma.AISettingsWhereInput | null;
};
export type AISettingsCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    aiProvider?: Prisma.SortOrder;
    model?: Prisma.SortOrder;
    confidenceThreshold?: Prisma.SortOrder;
    tone?: Prisma.SortOrder;
    language?: Prisma.SortOrder;
    emojiUsage?: Prisma.SortOrder;
    maxLength?: Prisma.SortOrder;
    spamHandling?: Prisma.SortOrder;
    humanApprovalMode?: Prisma.SortOrder;
    fallbackBehavior?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type AISettingsAvgOrderByAggregateInput = {
    confidenceThreshold?: Prisma.SortOrder;
    maxLength?: Prisma.SortOrder;
};
export type AISettingsMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    aiProvider?: Prisma.SortOrder;
    model?: Prisma.SortOrder;
    confidenceThreshold?: Prisma.SortOrder;
    tone?: Prisma.SortOrder;
    language?: Prisma.SortOrder;
    emojiUsage?: Prisma.SortOrder;
    maxLength?: Prisma.SortOrder;
    spamHandling?: Prisma.SortOrder;
    humanApprovalMode?: Prisma.SortOrder;
    fallbackBehavior?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type AISettingsMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    aiProvider?: Prisma.SortOrder;
    model?: Prisma.SortOrder;
    confidenceThreshold?: Prisma.SortOrder;
    tone?: Prisma.SortOrder;
    language?: Prisma.SortOrder;
    emojiUsage?: Prisma.SortOrder;
    maxLength?: Prisma.SortOrder;
    spamHandling?: Prisma.SortOrder;
    humanApprovalMode?: Prisma.SortOrder;
    fallbackBehavior?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type AISettingsSumOrderByAggregateInput = {
    confidenceThreshold?: Prisma.SortOrder;
    maxLength?: Prisma.SortOrder;
};
export type AISettingsCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.AISettingsCreateWithoutUserInput, Prisma.AISettingsUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.AISettingsCreateOrConnectWithoutUserInput;
    connect?: Prisma.AISettingsWhereUniqueInput;
};
export type AISettingsUncheckedCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.AISettingsCreateWithoutUserInput, Prisma.AISettingsUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.AISettingsCreateOrConnectWithoutUserInput;
    connect?: Prisma.AISettingsWhereUniqueInput;
};
export type AISettingsUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.AISettingsCreateWithoutUserInput, Prisma.AISettingsUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.AISettingsCreateOrConnectWithoutUserInput;
    upsert?: Prisma.AISettingsUpsertWithoutUserInput;
    disconnect?: Prisma.AISettingsWhereInput | boolean;
    delete?: Prisma.AISettingsWhereInput | boolean;
    connect?: Prisma.AISettingsWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.AISettingsUpdateToOneWithWhereWithoutUserInput, Prisma.AISettingsUpdateWithoutUserInput>, Prisma.AISettingsUncheckedUpdateWithoutUserInput>;
};
export type AISettingsUncheckedUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.AISettingsCreateWithoutUserInput, Prisma.AISettingsUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.AISettingsCreateOrConnectWithoutUserInput;
    upsert?: Prisma.AISettingsUpsertWithoutUserInput;
    disconnect?: Prisma.AISettingsWhereInput | boolean;
    delete?: Prisma.AISettingsWhereInput | boolean;
    connect?: Prisma.AISettingsWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.AISettingsUpdateToOneWithWhereWithoutUserInput, Prisma.AISettingsUpdateWithoutUserInput>, Prisma.AISettingsUncheckedUpdateWithoutUserInput>;
};
export type EnumAISettingStatusFieldUpdateOperationsInput = {
    set?: $Enums.AISettingStatus;
};
export type FloatFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type AISettingsCreateWithoutUserInput = {
    id?: string;
    status?: $Enums.AISettingStatus;
    aiProvider?: string;
    model?: string;
    confidenceThreshold?: number;
    tone?: string;
    language?: string;
    emojiUsage?: boolean;
    maxLength?: number;
    spamHandling?: string;
    humanApprovalMode?: boolean;
    fallbackBehavior?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type AISettingsUncheckedCreateWithoutUserInput = {
    id?: string;
    status?: $Enums.AISettingStatus;
    aiProvider?: string;
    model?: string;
    confidenceThreshold?: number;
    tone?: string;
    language?: string;
    emojiUsage?: boolean;
    maxLength?: number;
    spamHandling?: string;
    humanApprovalMode?: boolean;
    fallbackBehavior?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type AISettingsCreateOrConnectWithoutUserInput = {
    where: Prisma.AISettingsWhereUniqueInput;
    create: Prisma.XOR<Prisma.AISettingsCreateWithoutUserInput, Prisma.AISettingsUncheckedCreateWithoutUserInput>;
};
export type AISettingsUpsertWithoutUserInput = {
    update: Prisma.XOR<Prisma.AISettingsUpdateWithoutUserInput, Prisma.AISettingsUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.AISettingsCreateWithoutUserInput, Prisma.AISettingsUncheckedCreateWithoutUserInput>;
    where?: Prisma.AISettingsWhereInput;
};
export type AISettingsUpdateToOneWithWhereWithoutUserInput = {
    where?: Prisma.AISettingsWhereInput;
    data: Prisma.XOR<Prisma.AISettingsUpdateWithoutUserInput, Prisma.AISettingsUncheckedUpdateWithoutUserInput>;
};
export type AISettingsUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumAISettingStatusFieldUpdateOperationsInput | $Enums.AISettingStatus;
    aiProvider?: Prisma.StringFieldUpdateOperationsInput | string;
    model?: Prisma.StringFieldUpdateOperationsInput | string;
    confidenceThreshold?: Prisma.FloatFieldUpdateOperationsInput | number;
    tone?: Prisma.StringFieldUpdateOperationsInput | string;
    language?: Prisma.StringFieldUpdateOperationsInput | string;
    emojiUsage?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    maxLength?: Prisma.IntFieldUpdateOperationsInput | number;
    spamHandling?: Prisma.StringFieldUpdateOperationsInput | string;
    humanApprovalMode?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    fallbackBehavior?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AISettingsUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumAISettingStatusFieldUpdateOperationsInput | $Enums.AISettingStatus;
    aiProvider?: Prisma.StringFieldUpdateOperationsInput | string;
    model?: Prisma.StringFieldUpdateOperationsInput | string;
    confidenceThreshold?: Prisma.FloatFieldUpdateOperationsInput | number;
    tone?: Prisma.StringFieldUpdateOperationsInput | string;
    language?: Prisma.StringFieldUpdateOperationsInput | string;
    emojiUsage?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    maxLength?: Prisma.IntFieldUpdateOperationsInput | number;
    spamHandling?: Prisma.StringFieldUpdateOperationsInput | string;
    humanApprovalMode?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    fallbackBehavior?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AISettingsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    status?: boolean;
    aiProvider?: boolean;
    model?: boolean;
    confidenceThreshold?: boolean;
    tone?: boolean;
    language?: boolean;
    emojiUsage?: boolean;
    maxLength?: boolean;
    spamHandling?: boolean;
    humanApprovalMode?: boolean;
    fallbackBehavior?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["aISettings"]>;
export type AISettingsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    status?: boolean;
    aiProvider?: boolean;
    model?: boolean;
    confidenceThreshold?: boolean;
    tone?: boolean;
    language?: boolean;
    emojiUsage?: boolean;
    maxLength?: boolean;
    spamHandling?: boolean;
    humanApprovalMode?: boolean;
    fallbackBehavior?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["aISettings"]>;
export type AISettingsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    status?: boolean;
    aiProvider?: boolean;
    model?: boolean;
    confidenceThreshold?: boolean;
    tone?: boolean;
    language?: boolean;
    emojiUsage?: boolean;
    maxLength?: boolean;
    spamHandling?: boolean;
    humanApprovalMode?: boolean;
    fallbackBehavior?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["aISettings"]>;
export type AISettingsSelectScalar = {
    id?: boolean;
    userId?: boolean;
    status?: boolean;
    aiProvider?: boolean;
    model?: boolean;
    confidenceThreshold?: boolean;
    tone?: boolean;
    language?: boolean;
    emojiUsage?: boolean;
    maxLength?: boolean;
    spamHandling?: boolean;
    humanApprovalMode?: boolean;
    fallbackBehavior?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type AISettingsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "status" | "aiProvider" | "model" | "confidenceThreshold" | "tone" | "language" | "emojiUsage" | "maxLength" | "spamHandling" | "humanApprovalMode" | "fallbackBehavior" | "createdAt" | "updatedAt", ExtArgs["result"]["aISettings"]>;
export type AISettingsInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type AISettingsIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type AISettingsIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $AISettingsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "AISettings";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        status: $Enums.AISettingStatus;
        aiProvider: string;
        model: string;
        confidenceThreshold: number;
        tone: string;
        language: string;
        emojiUsage: boolean;
        maxLength: number;
        spamHandling: string;
        humanApprovalMode: boolean;
        fallbackBehavior: string;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["aISettings"]>;
    composites: {};
};
export type AISettingsGetPayload<S extends boolean | null | undefined | AISettingsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$AISettingsPayload, S>;
export type AISettingsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<AISettingsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: AISettingsCountAggregateInputType | true;
};
export interface AISettingsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['AISettings'];
        meta: {
            name: 'AISettings';
        };
    };
    /**
     * Find zero or one AISettings that matches the filter.
     * @param {AISettingsFindUniqueArgs} args - Arguments to find a AISettings
     * @example
     * // Get one AISettings
     * const aISettings = await prisma.aISettings.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AISettingsFindUniqueArgs>(args: Prisma.SelectSubset<T, AISettingsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__AISettingsClient<runtime.Types.Result.GetResult<Prisma.$AISettingsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one AISettings that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AISettingsFindUniqueOrThrowArgs} args - Arguments to find a AISettings
     * @example
     * // Get one AISettings
     * const aISettings = await prisma.aISettings.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AISettingsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, AISettingsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__AISettingsClient<runtime.Types.Result.GetResult<Prisma.$AISettingsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first AISettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AISettingsFindFirstArgs} args - Arguments to find a AISettings
     * @example
     * // Get one AISettings
     * const aISettings = await prisma.aISettings.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AISettingsFindFirstArgs>(args?: Prisma.SelectSubset<T, AISettingsFindFirstArgs<ExtArgs>>): Prisma.Prisma__AISettingsClient<runtime.Types.Result.GetResult<Prisma.$AISettingsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first AISettings that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AISettingsFindFirstOrThrowArgs} args - Arguments to find a AISettings
     * @example
     * // Get one AISettings
     * const aISettings = await prisma.aISettings.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AISettingsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, AISettingsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__AISettingsClient<runtime.Types.Result.GetResult<Prisma.$AISettingsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more AISettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AISettingsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AISettings
     * const aISettings = await prisma.aISettings.findMany()
     *
     * // Get first 10 AISettings
     * const aISettings = await prisma.aISettings.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const aISettingsWithIdOnly = await prisma.aISettings.findMany({ select: { id: true } })
     *
     */
    findMany<T extends AISettingsFindManyArgs>(args?: Prisma.SelectSubset<T, AISettingsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AISettingsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a AISettings.
     * @param {AISettingsCreateArgs} args - Arguments to create a AISettings.
     * @example
     * // Create one AISettings
     * const AISettings = await prisma.aISettings.create({
     *   data: {
     *     // ... data to create a AISettings
     *   }
     * })
     *
     */
    create<T extends AISettingsCreateArgs>(args: Prisma.SelectSubset<T, AISettingsCreateArgs<ExtArgs>>): Prisma.Prisma__AISettingsClient<runtime.Types.Result.GetResult<Prisma.$AISettingsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many AISettings.
     * @param {AISettingsCreateManyArgs} args - Arguments to create many AISettings.
     * @example
     * // Create many AISettings
     * const aISettings = await prisma.aISettings.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends AISettingsCreateManyArgs>(args?: Prisma.SelectSubset<T, AISettingsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many AISettings and returns the data saved in the database.
     * @param {AISettingsCreateManyAndReturnArgs} args - Arguments to create many AISettings.
     * @example
     * // Create many AISettings
     * const aISettings = await prisma.aISettings.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many AISettings and only return the `id`
     * const aISettingsWithIdOnly = await prisma.aISettings.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends AISettingsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, AISettingsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AISettingsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a AISettings.
     * @param {AISettingsDeleteArgs} args - Arguments to delete one AISettings.
     * @example
     * // Delete one AISettings
     * const AISettings = await prisma.aISettings.delete({
     *   where: {
     *     // ... filter to delete one AISettings
     *   }
     * })
     *
     */
    delete<T extends AISettingsDeleteArgs>(args: Prisma.SelectSubset<T, AISettingsDeleteArgs<ExtArgs>>): Prisma.Prisma__AISettingsClient<runtime.Types.Result.GetResult<Prisma.$AISettingsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one AISettings.
     * @param {AISettingsUpdateArgs} args - Arguments to update one AISettings.
     * @example
     * // Update one AISettings
     * const aISettings = await prisma.aISettings.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends AISettingsUpdateArgs>(args: Prisma.SelectSubset<T, AISettingsUpdateArgs<ExtArgs>>): Prisma.Prisma__AISettingsClient<runtime.Types.Result.GetResult<Prisma.$AISettingsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more AISettings.
     * @param {AISettingsDeleteManyArgs} args - Arguments to filter AISettings to delete.
     * @example
     * // Delete a few AISettings
     * const { count } = await prisma.aISettings.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends AISettingsDeleteManyArgs>(args?: Prisma.SelectSubset<T, AISettingsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more AISettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AISettingsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AISettings
     * const aISettings = await prisma.aISettings.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends AISettingsUpdateManyArgs>(args: Prisma.SelectSubset<T, AISettingsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more AISettings and returns the data updated in the database.
     * @param {AISettingsUpdateManyAndReturnArgs} args - Arguments to update many AISettings.
     * @example
     * // Update many AISettings
     * const aISettings = await prisma.aISettings.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more AISettings and only return the `id`
     * const aISettingsWithIdOnly = await prisma.aISettings.updateManyAndReturn({
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
    updateManyAndReturn<T extends AISettingsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, AISettingsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AISettingsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one AISettings.
     * @param {AISettingsUpsertArgs} args - Arguments to update or create a AISettings.
     * @example
     * // Update or create a AISettings
     * const aISettings = await prisma.aISettings.upsert({
     *   create: {
     *     // ... data to create a AISettings
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AISettings we want to update
     *   }
     * })
     */
    upsert<T extends AISettingsUpsertArgs>(args: Prisma.SelectSubset<T, AISettingsUpsertArgs<ExtArgs>>): Prisma.Prisma__AISettingsClient<runtime.Types.Result.GetResult<Prisma.$AISettingsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of AISettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AISettingsCountArgs} args - Arguments to filter AISettings to count.
     * @example
     * // Count the number of AISettings
     * const count = await prisma.aISettings.count({
     *   where: {
     *     // ... the filter for the AISettings we want to count
     *   }
     * })
    **/
    count<T extends AISettingsCountArgs>(args?: Prisma.Subset<T, AISettingsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], AISettingsCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a AISettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AISettingsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AISettingsAggregateArgs>(args: Prisma.Subset<T, AISettingsAggregateArgs>): Prisma.PrismaPromise<GetAISettingsAggregateType<T>>;
    /**
     * Group by AISettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AISettingsGroupByArgs} args - Group by arguments.
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
    groupBy<T extends AISettingsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: AISettingsGroupByArgs['orderBy'];
    } : {
        orderBy?: AISettingsGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, AISettingsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAISettingsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the AISettings model
     */
    readonly fields: AISettingsFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for AISettings.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__AISettingsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
 * Fields of the AISettings model
 */
export interface AISettingsFieldRefs {
    readonly id: Prisma.FieldRef<"AISettings", 'String'>;
    readonly userId: Prisma.FieldRef<"AISettings", 'String'>;
    readonly status: Prisma.FieldRef<"AISettings", 'AISettingStatus'>;
    readonly aiProvider: Prisma.FieldRef<"AISettings", 'String'>;
    readonly model: Prisma.FieldRef<"AISettings", 'String'>;
    readonly confidenceThreshold: Prisma.FieldRef<"AISettings", 'Float'>;
    readonly tone: Prisma.FieldRef<"AISettings", 'String'>;
    readonly language: Prisma.FieldRef<"AISettings", 'String'>;
    readonly emojiUsage: Prisma.FieldRef<"AISettings", 'Boolean'>;
    readonly maxLength: Prisma.FieldRef<"AISettings", 'Int'>;
    readonly spamHandling: Prisma.FieldRef<"AISettings", 'String'>;
    readonly humanApprovalMode: Prisma.FieldRef<"AISettings", 'Boolean'>;
    readonly fallbackBehavior: Prisma.FieldRef<"AISettings", 'String'>;
    readonly createdAt: Prisma.FieldRef<"AISettings", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"AISettings", 'DateTime'>;
}
/**
 * AISettings findUnique
 */
export type AISettingsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AISettings
     */
    select?: Prisma.AISettingsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AISettings
     */
    omit?: Prisma.AISettingsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AISettingsInclude<ExtArgs> | null;
    /**
     * Filter, which AISettings to fetch.
     */
    where: Prisma.AISettingsWhereUniqueInput;
};
/**
 * AISettings findUniqueOrThrow
 */
export type AISettingsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AISettings
     */
    select?: Prisma.AISettingsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AISettings
     */
    omit?: Prisma.AISettingsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AISettingsInclude<ExtArgs> | null;
    /**
     * Filter, which AISettings to fetch.
     */
    where: Prisma.AISettingsWhereUniqueInput;
};
/**
 * AISettings findFirst
 */
export type AISettingsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AISettings
     */
    select?: Prisma.AISettingsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AISettings
     */
    omit?: Prisma.AISettingsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AISettingsInclude<ExtArgs> | null;
    /**
     * Filter, which AISettings to fetch.
     */
    where?: Prisma.AISettingsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of AISettings to fetch.
     */
    orderBy?: Prisma.AISettingsOrderByWithRelationInput | Prisma.AISettingsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for AISettings.
     */
    cursor?: Prisma.AISettingsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` AISettings from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` AISettings.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of AISettings.
     */
    distinct?: Prisma.AISettingsScalarFieldEnum | Prisma.AISettingsScalarFieldEnum[];
};
/**
 * AISettings findFirstOrThrow
 */
export type AISettingsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AISettings
     */
    select?: Prisma.AISettingsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AISettings
     */
    omit?: Prisma.AISettingsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AISettingsInclude<ExtArgs> | null;
    /**
     * Filter, which AISettings to fetch.
     */
    where?: Prisma.AISettingsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of AISettings to fetch.
     */
    orderBy?: Prisma.AISettingsOrderByWithRelationInput | Prisma.AISettingsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for AISettings.
     */
    cursor?: Prisma.AISettingsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` AISettings from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` AISettings.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of AISettings.
     */
    distinct?: Prisma.AISettingsScalarFieldEnum | Prisma.AISettingsScalarFieldEnum[];
};
/**
 * AISettings findMany
 */
export type AISettingsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AISettings
     */
    select?: Prisma.AISettingsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AISettings
     */
    omit?: Prisma.AISettingsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AISettingsInclude<ExtArgs> | null;
    /**
     * Filter, which AISettings to fetch.
     */
    where?: Prisma.AISettingsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of AISettings to fetch.
     */
    orderBy?: Prisma.AISettingsOrderByWithRelationInput | Prisma.AISettingsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing AISettings.
     */
    cursor?: Prisma.AISettingsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` AISettings from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` AISettings.
     */
    skip?: number;
    distinct?: Prisma.AISettingsScalarFieldEnum | Prisma.AISettingsScalarFieldEnum[];
};
/**
 * AISettings create
 */
export type AISettingsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AISettings
     */
    select?: Prisma.AISettingsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AISettings
     */
    omit?: Prisma.AISettingsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AISettingsInclude<ExtArgs> | null;
    /**
     * The data needed to create a AISettings.
     */
    data: Prisma.XOR<Prisma.AISettingsCreateInput, Prisma.AISettingsUncheckedCreateInput>;
};
/**
 * AISettings createMany
 */
export type AISettingsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many AISettings.
     */
    data: Prisma.AISettingsCreateManyInput | Prisma.AISettingsCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * AISettings createManyAndReturn
 */
export type AISettingsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AISettings
     */
    select?: Prisma.AISettingsSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the AISettings
     */
    omit?: Prisma.AISettingsOmit<ExtArgs> | null;
    /**
     * The data used to create many AISettings.
     */
    data: Prisma.AISettingsCreateManyInput | Prisma.AISettingsCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AISettingsIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * AISettings update
 */
export type AISettingsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AISettings
     */
    select?: Prisma.AISettingsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AISettings
     */
    omit?: Prisma.AISettingsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AISettingsInclude<ExtArgs> | null;
    /**
     * The data needed to update a AISettings.
     */
    data: Prisma.XOR<Prisma.AISettingsUpdateInput, Prisma.AISettingsUncheckedUpdateInput>;
    /**
     * Choose, which AISettings to update.
     */
    where: Prisma.AISettingsWhereUniqueInput;
};
/**
 * AISettings updateMany
 */
export type AISettingsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update AISettings.
     */
    data: Prisma.XOR<Prisma.AISettingsUpdateManyMutationInput, Prisma.AISettingsUncheckedUpdateManyInput>;
    /**
     * Filter which AISettings to update
     */
    where?: Prisma.AISettingsWhereInput;
    /**
     * Limit how many AISettings to update.
     */
    limit?: number;
};
/**
 * AISettings updateManyAndReturn
 */
export type AISettingsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AISettings
     */
    select?: Prisma.AISettingsSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the AISettings
     */
    omit?: Prisma.AISettingsOmit<ExtArgs> | null;
    /**
     * The data used to update AISettings.
     */
    data: Prisma.XOR<Prisma.AISettingsUpdateManyMutationInput, Prisma.AISettingsUncheckedUpdateManyInput>;
    /**
     * Filter which AISettings to update
     */
    where?: Prisma.AISettingsWhereInput;
    /**
     * Limit how many AISettings to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AISettingsIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * AISettings upsert
 */
export type AISettingsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AISettings
     */
    select?: Prisma.AISettingsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AISettings
     */
    omit?: Prisma.AISettingsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AISettingsInclude<ExtArgs> | null;
    /**
     * The filter to search for the AISettings to update in case it exists.
     */
    where: Prisma.AISettingsWhereUniqueInput;
    /**
     * In case the AISettings found by the `where` argument doesn't exist, create a new AISettings with this data.
     */
    create: Prisma.XOR<Prisma.AISettingsCreateInput, Prisma.AISettingsUncheckedCreateInput>;
    /**
     * In case the AISettings was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.AISettingsUpdateInput, Prisma.AISettingsUncheckedUpdateInput>;
};
/**
 * AISettings delete
 */
export type AISettingsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AISettings
     */
    select?: Prisma.AISettingsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AISettings
     */
    omit?: Prisma.AISettingsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AISettingsInclude<ExtArgs> | null;
    /**
     * Filter which AISettings to delete.
     */
    where: Prisma.AISettingsWhereUniqueInput;
};
/**
 * AISettings deleteMany
 */
export type AISettingsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which AISettings to delete
     */
    where?: Prisma.AISettingsWhereInput;
    /**
     * Limit how many AISettings to delete.
     */
    limit?: number;
};
/**
 * AISettings without action
 */
export type AISettingsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AISettings
     */
    select?: Prisma.AISettingsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AISettings
     */
    omit?: Prisma.AISettingsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AISettingsInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=AISettings.d.ts.map