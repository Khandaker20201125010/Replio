import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model FacebookPage
 *
 */
export type FacebookPageModel = runtime.Types.Result.DefaultSelection<Prisma.$FacebookPagePayload>;
export type AggregateFacebookPage = {
    _count: FacebookPageCountAggregateOutputType | null;
    _min: FacebookPageMinAggregateOutputType | null;
    _max: FacebookPageMaxAggregateOutputType | null;
};
export type FacebookPageMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    pageId: string | null;
    pageName: string | null;
    pageAccessToken: string | null;
    accessTokenExpiry: Date | null;
    isConnected: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type FacebookPageMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    pageId: string | null;
    pageName: string | null;
    pageAccessToken: string | null;
    accessTokenExpiry: Date | null;
    isConnected: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type FacebookPageCountAggregateOutputType = {
    id: number;
    userId: number;
    pageId: number;
    pageName: number;
    pageAccessToken: number;
    accessTokenExpiry: number;
    isConnected: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type FacebookPageMinAggregateInputType = {
    id?: true;
    userId?: true;
    pageId?: true;
    pageName?: true;
    pageAccessToken?: true;
    accessTokenExpiry?: true;
    isConnected?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type FacebookPageMaxAggregateInputType = {
    id?: true;
    userId?: true;
    pageId?: true;
    pageName?: true;
    pageAccessToken?: true;
    accessTokenExpiry?: true;
    isConnected?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type FacebookPageCountAggregateInputType = {
    id?: true;
    userId?: true;
    pageId?: true;
    pageName?: true;
    pageAccessToken?: true;
    accessTokenExpiry?: true;
    isConnected?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type FacebookPageAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which FacebookPage to aggregate.
     */
    where?: Prisma.FacebookPageWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of FacebookPages to fetch.
     */
    orderBy?: Prisma.FacebookPageOrderByWithRelationInput | Prisma.FacebookPageOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.FacebookPageWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` FacebookPages from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` FacebookPages.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned FacebookPages
    **/
    _count?: true | FacebookPageCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: FacebookPageMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: FacebookPageMaxAggregateInputType;
};
export type GetFacebookPageAggregateType<T extends FacebookPageAggregateArgs> = {
    [P in keyof T & keyof AggregateFacebookPage]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateFacebookPage[P]> : Prisma.GetScalarType<T[P], AggregateFacebookPage[P]>;
};
export type FacebookPageGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FacebookPageWhereInput;
    orderBy?: Prisma.FacebookPageOrderByWithAggregationInput | Prisma.FacebookPageOrderByWithAggregationInput[];
    by: Prisma.FacebookPageScalarFieldEnum[] | Prisma.FacebookPageScalarFieldEnum;
    having?: Prisma.FacebookPageScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: FacebookPageCountAggregateInputType | true;
    _min?: FacebookPageMinAggregateInputType;
    _max?: FacebookPageMaxAggregateInputType;
};
export type FacebookPageGroupByOutputType = {
    id: string;
    userId: string;
    pageId: string;
    pageName: string;
    pageAccessToken: string;
    accessTokenExpiry: Date | null;
    isConnected: boolean;
    createdAt: Date;
    updatedAt: Date;
    _count: FacebookPageCountAggregateOutputType | null;
    _min: FacebookPageMinAggregateOutputType | null;
    _max: FacebookPageMaxAggregateOutputType | null;
};
type GetFacebookPageGroupByPayload<T extends FacebookPageGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<FacebookPageGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof FacebookPageGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], FacebookPageGroupByOutputType[P]> : Prisma.GetScalarType<T[P], FacebookPageGroupByOutputType[P]>;
}>>;
export type FacebookPageWhereInput = {
    AND?: Prisma.FacebookPageWhereInput | Prisma.FacebookPageWhereInput[];
    OR?: Prisma.FacebookPageWhereInput[];
    NOT?: Prisma.FacebookPageWhereInput | Prisma.FacebookPageWhereInput[];
    id?: Prisma.StringFilter<"FacebookPage"> | string;
    userId?: Prisma.StringFilter<"FacebookPage"> | string;
    pageId?: Prisma.StringFilter<"FacebookPage"> | string;
    pageName?: Prisma.StringFilter<"FacebookPage"> | string;
    pageAccessToken?: Prisma.StringFilter<"FacebookPage"> | string;
    accessTokenExpiry?: Prisma.DateTimeNullableFilter<"FacebookPage"> | Date | string | null;
    isConnected?: Prisma.BoolFilter<"FacebookPage"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"FacebookPage"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"FacebookPage"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    comments?: Prisma.CommentListRelationFilter;
    replies?: Prisma.ReplyListRelationFilter;
};
export type FacebookPageOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    pageId?: Prisma.SortOrder;
    pageName?: Prisma.SortOrder;
    pageAccessToken?: Prisma.SortOrder;
    accessTokenExpiry?: Prisma.SortOrderInput | Prisma.SortOrder;
    isConnected?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    comments?: Prisma.CommentOrderByRelationAggregateInput;
    replies?: Prisma.ReplyOrderByRelationAggregateInput;
};
export type FacebookPageWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    pageId?: string;
    AND?: Prisma.FacebookPageWhereInput | Prisma.FacebookPageWhereInput[];
    OR?: Prisma.FacebookPageWhereInput[];
    NOT?: Prisma.FacebookPageWhereInput | Prisma.FacebookPageWhereInput[];
    userId?: Prisma.StringFilter<"FacebookPage"> | string;
    pageName?: Prisma.StringFilter<"FacebookPage"> | string;
    pageAccessToken?: Prisma.StringFilter<"FacebookPage"> | string;
    accessTokenExpiry?: Prisma.DateTimeNullableFilter<"FacebookPage"> | Date | string | null;
    isConnected?: Prisma.BoolFilter<"FacebookPage"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"FacebookPage"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"FacebookPage"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    comments?: Prisma.CommentListRelationFilter;
    replies?: Prisma.ReplyListRelationFilter;
}, "id" | "pageId">;
export type FacebookPageOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    pageId?: Prisma.SortOrder;
    pageName?: Prisma.SortOrder;
    pageAccessToken?: Prisma.SortOrder;
    accessTokenExpiry?: Prisma.SortOrderInput | Prisma.SortOrder;
    isConnected?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.FacebookPageCountOrderByAggregateInput;
    _max?: Prisma.FacebookPageMaxOrderByAggregateInput;
    _min?: Prisma.FacebookPageMinOrderByAggregateInput;
};
export type FacebookPageScalarWhereWithAggregatesInput = {
    AND?: Prisma.FacebookPageScalarWhereWithAggregatesInput | Prisma.FacebookPageScalarWhereWithAggregatesInput[];
    OR?: Prisma.FacebookPageScalarWhereWithAggregatesInput[];
    NOT?: Prisma.FacebookPageScalarWhereWithAggregatesInput | Prisma.FacebookPageScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"FacebookPage"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"FacebookPage"> | string;
    pageId?: Prisma.StringWithAggregatesFilter<"FacebookPage"> | string;
    pageName?: Prisma.StringWithAggregatesFilter<"FacebookPage"> | string;
    pageAccessToken?: Prisma.StringWithAggregatesFilter<"FacebookPage"> | string;
    accessTokenExpiry?: Prisma.DateTimeNullableWithAggregatesFilter<"FacebookPage"> | Date | string | null;
    isConnected?: Prisma.BoolWithAggregatesFilter<"FacebookPage"> | boolean;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"FacebookPage"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"FacebookPage"> | Date | string;
};
export type FacebookPageCreateInput = {
    id?: string;
    pageId: string;
    pageName: string;
    pageAccessToken: string;
    accessTokenExpiry?: Date | string | null;
    isConnected?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutFacebookPagesInput;
    comments?: Prisma.CommentCreateNestedManyWithoutFacebookPageInput;
    replies?: Prisma.ReplyCreateNestedManyWithoutFacebookPageInput;
};
export type FacebookPageUncheckedCreateInput = {
    id?: string;
    userId: string;
    pageId: string;
    pageName: string;
    pageAccessToken: string;
    accessTokenExpiry?: Date | string | null;
    isConnected?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    comments?: Prisma.CommentUncheckedCreateNestedManyWithoutFacebookPageInput;
    replies?: Prisma.ReplyUncheckedCreateNestedManyWithoutFacebookPageInput;
};
export type FacebookPageUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    pageId?: Prisma.StringFieldUpdateOperationsInput | string;
    pageName?: Prisma.StringFieldUpdateOperationsInput | string;
    pageAccessToken?: Prisma.StringFieldUpdateOperationsInput | string;
    accessTokenExpiry?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isConnected?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutFacebookPagesNestedInput;
    comments?: Prisma.CommentUpdateManyWithoutFacebookPageNestedInput;
    replies?: Prisma.ReplyUpdateManyWithoutFacebookPageNestedInput;
};
export type FacebookPageUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    pageId?: Prisma.StringFieldUpdateOperationsInput | string;
    pageName?: Prisma.StringFieldUpdateOperationsInput | string;
    pageAccessToken?: Prisma.StringFieldUpdateOperationsInput | string;
    accessTokenExpiry?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isConnected?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    comments?: Prisma.CommentUncheckedUpdateManyWithoutFacebookPageNestedInput;
    replies?: Prisma.ReplyUncheckedUpdateManyWithoutFacebookPageNestedInput;
};
export type FacebookPageCreateManyInput = {
    id?: string;
    userId: string;
    pageId: string;
    pageName: string;
    pageAccessToken: string;
    accessTokenExpiry?: Date | string | null;
    isConnected?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type FacebookPageUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    pageId?: Prisma.StringFieldUpdateOperationsInput | string;
    pageName?: Prisma.StringFieldUpdateOperationsInput | string;
    pageAccessToken?: Prisma.StringFieldUpdateOperationsInput | string;
    accessTokenExpiry?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isConnected?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FacebookPageUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    pageId?: Prisma.StringFieldUpdateOperationsInput | string;
    pageName?: Prisma.StringFieldUpdateOperationsInput | string;
    pageAccessToken?: Prisma.StringFieldUpdateOperationsInput | string;
    accessTokenExpiry?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isConnected?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FacebookPageListRelationFilter = {
    every?: Prisma.FacebookPageWhereInput;
    some?: Prisma.FacebookPageWhereInput;
    none?: Prisma.FacebookPageWhereInput;
};
export type FacebookPageOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type FacebookPageCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    pageId?: Prisma.SortOrder;
    pageName?: Prisma.SortOrder;
    pageAccessToken?: Prisma.SortOrder;
    accessTokenExpiry?: Prisma.SortOrder;
    isConnected?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type FacebookPageMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    pageId?: Prisma.SortOrder;
    pageName?: Prisma.SortOrder;
    pageAccessToken?: Prisma.SortOrder;
    accessTokenExpiry?: Prisma.SortOrder;
    isConnected?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type FacebookPageMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    pageId?: Prisma.SortOrder;
    pageName?: Prisma.SortOrder;
    pageAccessToken?: Prisma.SortOrder;
    accessTokenExpiry?: Prisma.SortOrder;
    isConnected?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type FacebookPageScalarRelationFilter = {
    is?: Prisma.FacebookPageWhereInput;
    isNot?: Prisma.FacebookPageWhereInput;
};
export type FacebookPageCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.FacebookPageCreateWithoutUserInput, Prisma.FacebookPageUncheckedCreateWithoutUserInput> | Prisma.FacebookPageCreateWithoutUserInput[] | Prisma.FacebookPageUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.FacebookPageCreateOrConnectWithoutUserInput | Prisma.FacebookPageCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.FacebookPageCreateManyUserInputEnvelope;
    connect?: Prisma.FacebookPageWhereUniqueInput | Prisma.FacebookPageWhereUniqueInput[];
};
export type FacebookPageUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.FacebookPageCreateWithoutUserInput, Prisma.FacebookPageUncheckedCreateWithoutUserInput> | Prisma.FacebookPageCreateWithoutUserInput[] | Prisma.FacebookPageUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.FacebookPageCreateOrConnectWithoutUserInput | Prisma.FacebookPageCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.FacebookPageCreateManyUserInputEnvelope;
    connect?: Prisma.FacebookPageWhereUniqueInput | Prisma.FacebookPageWhereUniqueInput[];
};
export type FacebookPageUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.FacebookPageCreateWithoutUserInput, Prisma.FacebookPageUncheckedCreateWithoutUserInput> | Prisma.FacebookPageCreateWithoutUserInput[] | Prisma.FacebookPageUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.FacebookPageCreateOrConnectWithoutUserInput | Prisma.FacebookPageCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.FacebookPageUpsertWithWhereUniqueWithoutUserInput | Prisma.FacebookPageUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.FacebookPageCreateManyUserInputEnvelope;
    set?: Prisma.FacebookPageWhereUniqueInput | Prisma.FacebookPageWhereUniqueInput[];
    disconnect?: Prisma.FacebookPageWhereUniqueInput | Prisma.FacebookPageWhereUniqueInput[];
    delete?: Prisma.FacebookPageWhereUniqueInput | Prisma.FacebookPageWhereUniqueInput[];
    connect?: Prisma.FacebookPageWhereUniqueInput | Prisma.FacebookPageWhereUniqueInput[];
    update?: Prisma.FacebookPageUpdateWithWhereUniqueWithoutUserInput | Prisma.FacebookPageUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.FacebookPageUpdateManyWithWhereWithoutUserInput | Prisma.FacebookPageUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.FacebookPageScalarWhereInput | Prisma.FacebookPageScalarWhereInput[];
};
export type FacebookPageUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.FacebookPageCreateWithoutUserInput, Prisma.FacebookPageUncheckedCreateWithoutUserInput> | Prisma.FacebookPageCreateWithoutUserInput[] | Prisma.FacebookPageUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.FacebookPageCreateOrConnectWithoutUserInput | Prisma.FacebookPageCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.FacebookPageUpsertWithWhereUniqueWithoutUserInput | Prisma.FacebookPageUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.FacebookPageCreateManyUserInputEnvelope;
    set?: Prisma.FacebookPageWhereUniqueInput | Prisma.FacebookPageWhereUniqueInput[];
    disconnect?: Prisma.FacebookPageWhereUniqueInput | Prisma.FacebookPageWhereUniqueInput[];
    delete?: Prisma.FacebookPageWhereUniqueInput | Prisma.FacebookPageWhereUniqueInput[];
    connect?: Prisma.FacebookPageWhereUniqueInput | Prisma.FacebookPageWhereUniqueInput[];
    update?: Prisma.FacebookPageUpdateWithWhereUniqueWithoutUserInput | Prisma.FacebookPageUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.FacebookPageUpdateManyWithWhereWithoutUserInput | Prisma.FacebookPageUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.FacebookPageScalarWhereInput | Prisma.FacebookPageScalarWhereInput[];
};
export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
};
export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
};
export type FacebookPageCreateNestedOneWithoutCommentsInput = {
    create?: Prisma.XOR<Prisma.FacebookPageCreateWithoutCommentsInput, Prisma.FacebookPageUncheckedCreateWithoutCommentsInput>;
    connectOrCreate?: Prisma.FacebookPageCreateOrConnectWithoutCommentsInput;
    connect?: Prisma.FacebookPageWhereUniqueInput;
};
export type FacebookPageUpdateOneRequiredWithoutCommentsNestedInput = {
    create?: Prisma.XOR<Prisma.FacebookPageCreateWithoutCommentsInput, Prisma.FacebookPageUncheckedCreateWithoutCommentsInput>;
    connectOrCreate?: Prisma.FacebookPageCreateOrConnectWithoutCommentsInput;
    upsert?: Prisma.FacebookPageUpsertWithoutCommentsInput;
    connect?: Prisma.FacebookPageWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.FacebookPageUpdateToOneWithWhereWithoutCommentsInput, Prisma.FacebookPageUpdateWithoutCommentsInput>, Prisma.FacebookPageUncheckedUpdateWithoutCommentsInput>;
};
export type FacebookPageCreateNestedOneWithoutRepliesInput = {
    create?: Prisma.XOR<Prisma.FacebookPageCreateWithoutRepliesInput, Prisma.FacebookPageUncheckedCreateWithoutRepliesInput>;
    connectOrCreate?: Prisma.FacebookPageCreateOrConnectWithoutRepliesInput;
    connect?: Prisma.FacebookPageWhereUniqueInput;
};
export type FacebookPageUpdateOneRequiredWithoutRepliesNestedInput = {
    create?: Prisma.XOR<Prisma.FacebookPageCreateWithoutRepliesInput, Prisma.FacebookPageUncheckedCreateWithoutRepliesInput>;
    connectOrCreate?: Prisma.FacebookPageCreateOrConnectWithoutRepliesInput;
    upsert?: Prisma.FacebookPageUpsertWithoutRepliesInput;
    connect?: Prisma.FacebookPageWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.FacebookPageUpdateToOneWithWhereWithoutRepliesInput, Prisma.FacebookPageUpdateWithoutRepliesInput>, Prisma.FacebookPageUncheckedUpdateWithoutRepliesInput>;
};
export type FacebookPageCreateWithoutUserInput = {
    id?: string;
    pageId: string;
    pageName: string;
    pageAccessToken: string;
    accessTokenExpiry?: Date | string | null;
    isConnected?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    comments?: Prisma.CommentCreateNestedManyWithoutFacebookPageInput;
    replies?: Prisma.ReplyCreateNestedManyWithoutFacebookPageInput;
};
export type FacebookPageUncheckedCreateWithoutUserInput = {
    id?: string;
    pageId: string;
    pageName: string;
    pageAccessToken: string;
    accessTokenExpiry?: Date | string | null;
    isConnected?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    comments?: Prisma.CommentUncheckedCreateNestedManyWithoutFacebookPageInput;
    replies?: Prisma.ReplyUncheckedCreateNestedManyWithoutFacebookPageInput;
};
export type FacebookPageCreateOrConnectWithoutUserInput = {
    where: Prisma.FacebookPageWhereUniqueInput;
    create: Prisma.XOR<Prisma.FacebookPageCreateWithoutUserInput, Prisma.FacebookPageUncheckedCreateWithoutUserInput>;
};
export type FacebookPageCreateManyUserInputEnvelope = {
    data: Prisma.FacebookPageCreateManyUserInput | Prisma.FacebookPageCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type FacebookPageUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.FacebookPageWhereUniqueInput;
    update: Prisma.XOR<Prisma.FacebookPageUpdateWithoutUserInput, Prisma.FacebookPageUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.FacebookPageCreateWithoutUserInput, Prisma.FacebookPageUncheckedCreateWithoutUserInput>;
};
export type FacebookPageUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.FacebookPageWhereUniqueInput;
    data: Prisma.XOR<Prisma.FacebookPageUpdateWithoutUserInput, Prisma.FacebookPageUncheckedUpdateWithoutUserInput>;
};
export type FacebookPageUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.FacebookPageScalarWhereInput;
    data: Prisma.XOR<Prisma.FacebookPageUpdateManyMutationInput, Prisma.FacebookPageUncheckedUpdateManyWithoutUserInput>;
};
export type FacebookPageScalarWhereInput = {
    AND?: Prisma.FacebookPageScalarWhereInput | Prisma.FacebookPageScalarWhereInput[];
    OR?: Prisma.FacebookPageScalarWhereInput[];
    NOT?: Prisma.FacebookPageScalarWhereInput | Prisma.FacebookPageScalarWhereInput[];
    id?: Prisma.StringFilter<"FacebookPage"> | string;
    userId?: Prisma.StringFilter<"FacebookPage"> | string;
    pageId?: Prisma.StringFilter<"FacebookPage"> | string;
    pageName?: Prisma.StringFilter<"FacebookPage"> | string;
    pageAccessToken?: Prisma.StringFilter<"FacebookPage"> | string;
    accessTokenExpiry?: Prisma.DateTimeNullableFilter<"FacebookPage"> | Date | string | null;
    isConnected?: Prisma.BoolFilter<"FacebookPage"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"FacebookPage"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"FacebookPage"> | Date | string;
};
export type FacebookPageCreateWithoutCommentsInput = {
    id?: string;
    pageId: string;
    pageName: string;
    pageAccessToken: string;
    accessTokenExpiry?: Date | string | null;
    isConnected?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutFacebookPagesInput;
    replies?: Prisma.ReplyCreateNestedManyWithoutFacebookPageInput;
};
export type FacebookPageUncheckedCreateWithoutCommentsInput = {
    id?: string;
    userId: string;
    pageId: string;
    pageName: string;
    pageAccessToken: string;
    accessTokenExpiry?: Date | string | null;
    isConnected?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    replies?: Prisma.ReplyUncheckedCreateNestedManyWithoutFacebookPageInput;
};
export type FacebookPageCreateOrConnectWithoutCommentsInput = {
    where: Prisma.FacebookPageWhereUniqueInput;
    create: Prisma.XOR<Prisma.FacebookPageCreateWithoutCommentsInput, Prisma.FacebookPageUncheckedCreateWithoutCommentsInput>;
};
export type FacebookPageUpsertWithoutCommentsInput = {
    update: Prisma.XOR<Prisma.FacebookPageUpdateWithoutCommentsInput, Prisma.FacebookPageUncheckedUpdateWithoutCommentsInput>;
    create: Prisma.XOR<Prisma.FacebookPageCreateWithoutCommentsInput, Prisma.FacebookPageUncheckedCreateWithoutCommentsInput>;
    where?: Prisma.FacebookPageWhereInput;
};
export type FacebookPageUpdateToOneWithWhereWithoutCommentsInput = {
    where?: Prisma.FacebookPageWhereInput;
    data: Prisma.XOR<Prisma.FacebookPageUpdateWithoutCommentsInput, Prisma.FacebookPageUncheckedUpdateWithoutCommentsInput>;
};
export type FacebookPageUpdateWithoutCommentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    pageId?: Prisma.StringFieldUpdateOperationsInput | string;
    pageName?: Prisma.StringFieldUpdateOperationsInput | string;
    pageAccessToken?: Prisma.StringFieldUpdateOperationsInput | string;
    accessTokenExpiry?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isConnected?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutFacebookPagesNestedInput;
    replies?: Prisma.ReplyUpdateManyWithoutFacebookPageNestedInput;
};
export type FacebookPageUncheckedUpdateWithoutCommentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    pageId?: Prisma.StringFieldUpdateOperationsInput | string;
    pageName?: Prisma.StringFieldUpdateOperationsInput | string;
    pageAccessToken?: Prisma.StringFieldUpdateOperationsInput | string;
    accessTokenExpiry?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isConnected?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    replies?: Prisma.ReplyUncheckedUpdateManyWithoutFacebookPageNestedInput;
};
export type FacebookPageCreateWithoutRepliesInput = {
    id?: string;
    pageId: string;
    pageName: string;
    pageAccessToken: string;
    accessTokenExpiry?: Date | string | null;
    isConnected?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutFacebookPagesInput;
    comments?: Prisma.CommentCreateNestedManyWithoutFacebookPageInput;
};
export type FacebookPageUncheckedCreateWithoutRepliesInput = {
    id?: string;
    userId: string;
    pageId: string;
    pageName: string;
    pageAccessToken: string;
    accessTokenExpiry?: Date | string | null;
    isConnected?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    comments?: Prisma.CommentUncheckedCreateNestedManyWithoutFacebookPageInput;
};
export type FacebookPageCreateOrConnectWithoutRepliesInput = {
    where: Prisma.FacebookPageWhereUniqueInput;
    create: Prisma.XOR<Prisma.FacebookPageCreateWithoutRepliesInput, Prisma.FacebookPageUncheckedCreateWithoutRepliesInput>;
};
export type FacebookPageUpsertWithoutRepliesInput = {
    update: Prisma.XOR<Prisma.FacebookPageUpdateWithoutRepliesInput, Prisma.FacebookPageUncheckedUpdateWithoutRepliesInput>;
    create: Prisma.XOR<Prisma.FacebookPageCreateWithoutRepliesInput, Prisma.FacebookPageUncheckedCreateWithoutRepliesInput>;
    where?: Prisma.FacebookPageWhereInput;
};
export type FacebookPageUpdateToOneWithWhereWithoutRepliesInput = {
    where?: Prisma.FacebookPageWhereInput;
    data: Prisma.XOR<Prisma.FacebookPageUpdateWithoutRepliesInput, Prisma.FacebookPageUncheckedUpdateWithoutRepliesInput>;
};
export type FacebookPageUpdateWithoutRepliesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    pageId?: Prisma.StringFieldUpdateOperationsInput | string;
    pageName?: Prisma.StringFieldUpdateOperationsInput | string;
    pageAccessToken?: Prisma.StringFieldUpdateOperationsInput | string;
    accessTokenExpiry?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isConnected?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutFacebookPagesNestedInput;
    comments?: Prisma.CommentUpdateManyWithoutFacebookPageNestedInput;
};
export type FacebookPageUncheckedUpdateWithoutRepliesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    pageId?: Prisma.StringFieldUpdateOperationsInput | string;
    pageName?: Prisma.StringFieldUpdateOperationsInput | string;
    pageAccessToken?: Prisma.StringFieldUpdateOperationsInput | string;
    accessTokenExpiry?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isConnected?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    comments?: Prisma.CommentUncheckedUpdateManyWithoutFacebookPageNestedInput;
};
export type FacebookPageCreateManyUserInput = {
    id?: string;
    pageId: string;
    pageName: string;
    pageAccessToken: string;
    accessTokenExpiry?: Date | string | null;
    isConnected?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type FacebookPageUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    pageId?: Prisma.StringFieldUpdateOperationsInput | string;
    pageName?: Prisma.StringFieldUpdateOperationsInput | string;
    pageAccessToken?: Prisma.StringFieldUpdateOperationsInput | string;
    accessTokenExpiry?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isConnected?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    comments?: Prisma.CommentUpdateManyWithoutFacebookPageNestedInput;
    replies?: Prisma.ReplyUpdateManyWithoutFacebookPageNestedInput;
};
export type FacebookPageUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    pageId?: Prisma.StringFieldUpdateOperationsInput | string;
    pageName?: Prisma.StringFieldUpdateOperationsInput | string;
    pageAccessToken?: Prisma.StringFieldUpdateOperationsInput | string;
    accessTokenExpiry?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isConnected?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    comments?: Prisma.CommentUncheckedUpdateManyWithoutFacebookPageNestedInput;
    replies?: Prisma.ReplyUncheckedUpdateManyWithoutFacebookPageNestedInput;
};
export type FacebookPageUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    pageId?: Prisma.StringFieldUpdateOperationsInput | string;
    pageName?: Prisma.StringFieldUpdateOperationsInput | string;
    pageAccessToken?: Prisma.StringFieldUpdateOperationsInput | string;
    accessTokenExpiry?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isConnected?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
/**
 * Count Type FacebookPageCountOutputType
 */
export type FacebookPageCountOutputType = {
    comments: number;
    replies: number;
};
export type FacebookPageCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    comments?: boolean | FacebookPageCountOutputTypeCountCommentsArgs;
    replies?: boolean | FacebookPageCountOutputTypeCountRepliesArgs;
};
/**
 * FacebookPageCountOutputType without action
 */
export type FacebookPageCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FacebookPageCountOutputType
     */
    select?: Prisma.FacebookPageCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * FacebookPageCountOutputType without action
 */
export type FacebookPageCountOutputTypeCountCommentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CommentWhereInput;
};
/**
 * FacebookPageCountOutputType without action
 */
export type FacebookPageCountOutputTypeCountRepliesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReplyWhereInput;
};
export type FacebookPageSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    pageId?: boolean;
    pageName?: boolean;
    pageAccessToken?: boolean;
    accessTokenExpiry?: boolean;
    isConnected?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    comments?: boolean | Prisma.FacebookPage$commentsArgs<ExtArgs>;
    replies?: boolean | Prisma.FacebookPage$repliesArgs<ExtArgs>;
    _count?: boolean | Prisma.FacebookPageCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["facebookPage"]>;
export type FacebookPageSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    pageId?: boolean;
    pageName?: boolean;
    pageAccessToken?: boolean;
    accessTokenExpiry?: boolean;
    isConnected?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["facebookPage"]>;
export type FacebookPageSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    pageId?: boolean;
    pageName?: boolean;
    pageAccessToken?: boolean;
    accessTokenExpiry?: boolean;
    isConnected?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["facebookPage"]>;
export type FacebookPageSelectScalar = {
    id?: boolean;
    userId?: boolean;
    pageId?: boolean;
    pageName?: boolean;
    pageAccessToken?: boolean;
    accessTokenExpiry?: boolean;
    isConnected?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type FacebookPageOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "pageId" | "pageName" | "pageAccessToken" | "accessTokenExpiry" | "isConnected" | "createdAt" | "updatedAt", ExtArgs["result"]["facebookPage"]>;
export type FacebookPageInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    comments?: boolean | Prisma.FacebookPage$commentsArgs<ExtArgs>;
    replies?: boolean | Prisma.FacebookPage$repliesArgs<ExtArgs>;
    _count?: boolean | Prisma.FacebookPageCountOutputTypeDefaultArgs<ExtArgs>;
};
export type FacebookPageIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type FacebookPageIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $FacebookPagePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "FacebookPage";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        comments: Prisma.$CommentPayload<ExtArgs>[];
        replies: Prisma.$ReplyPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        pageId: string;
        pageName: string;
        pageAccessToken: string;
        accessTokenExpiry: Date | null;
        isConnected: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["facebookPage"]>;
    composites: {};
};
export type FacebookPageGetPayload<S extends boolean | null | undefined | FacebookPageDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$FacebookPagePayload, S>;
export type FacebookPageCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<FacebookPageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: FacebookPageCountAggregateInputType | true;
};
export interface FacebookPageDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['FacebookPage'];
        meta: {
            name: 'FacebookPage';
        };
    };
    /**
     * Find zero or one FacebookPage that matches the filter.
     * @param {FacebookPageFindUniqueArgs} args - Arguments to find a FacebookPage
     * @example
     * // Get one FacebookPage
     * const facebookPage = await prisma.facebookPage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FacebookPageFindUniqueArgs>(args: Prisma.SelectSubset<T, FacebookPageFindUniqueArgs<ExtArgs>>): Prisma.Prisma__FacebookPageClient<runtime.Types.Result.GetResult<Prisma.$FacebookPagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one FacebookPage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FacebookPageFindUniqueOrThrowArgs} args - Arguments to find a FacebookPage
     * @example
     * // Get one FacebookPage
     * const facebookPage = await prisma.facebookPage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FacebookPageFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, FacebookPageFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__FacebookPageClient<runtime.Types.Result.GetResult<Prisma.$FacebookPagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first FacebookPage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FacebookPageFindFirstArgs} args - Arguments to find a FacebookPage
     * @example
     * // Get one FacebookPage
     * const facebookPage = await prisma.facebookPage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FacebookPageFindFirstArgs>(args?: Prisma.SelectSubset<T, FacebookPageFindFirstArgs<ExtArgs>>): Prisma.Prisma__FacebookPageClient<runtime.Types.Result.GetResult<Prisma.$FacebookPagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first FacebookPage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FacebookPageFindFirstOrThrowArgs} args - Arguments to find a FacebookPage
     * @example
     * // Get one FacebookPage
     * const facebookPage = await prisma.facebookPage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FacebookPageFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, FacebookPageFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__FacebookPageClient<runtime.Types.Result.GetResult<Prisma.$FacebookPagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more FacebookPages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FacebookPageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FacebookPages
     * const facebookPages = await prisma.facebookPage.findMany()
     *
     * // Get first 10 FacebookPages
     * const facebookPages = await prisma.facebookPage.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const facebookPageWithIdOnly = await prisma.facebookPage.findMany({ select: { id: true } })
     *
     */
    findMany<T extends FacebookPageFindManyArgs>(args?: Prisma.SelectSubset<T, FacebookPageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FacebookPagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a FacebookPage.
     * @param {FacebookPageCreateArgs} args - Arguments to create a FacebookPage.
     * @example
     * // Create one FacebookPage
     * const FacebookPage = await prisma.facebookPage.create({
     *   data: {
     *     // ... data to create a FacebookPage
     *   }
     * })
     *
     */
    create<T extends FacebookPageCreateArgs>(args: Prisma.SelectSubset<T, FacebookPageCreateArgs<ExtArgs>>): Prisma.Prisma__FacebookPageClient<runtime.Types.Result.GetResult<Prisma.$FacebookPagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many FacebookPages.
     * @param {FacebookPageCreateManyArgs} args - Arguments to create many FacebookPages.
     * @example
     * // Create many FacebookPages
     * const facebookPage = await prisma.facebookPage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends FacebookPageCreateManyArgs>(args?: Prisma.SelectSubset<T, FacebookPageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many FacebookPages and returns the data saved in the database.
     * @param {FacebookPageCreateManyAndReturnArgs} args - Arguments to create many FacebookPages.
     * @example
     * // Create many FacebookPages
     * const facebookPage = await prisma.facebookPage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many FacebookPages and only return the `id`
     * const facebookPageWithIdOnly = await prisma.facebookPage.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends FacebookPageCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, FacebookPageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FacebookPagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a FacebookPage.
     * @param {FacebookPageDeleteArgs} args - Arguments to delete one FacebookPage.
     * @example
     * // Delete one FacebookPage
     * const FacebookPage = await prisma.facebookPage.delete({
     *   where: {
     *     // ... filter to delete one FacebookPage
     *   }
     * })
     *
     */
    delete<T extends FacebookPageDeleteArgs>(args: Prisma.SelectSubset<T, FacebookPageDeleteArgs<ExtArgs>>): Prisma.Prisma__FacebookPageClient<runtime.Types.Result.GetResult<Prisma.$FacebookPagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one FacebookPage.
     * @param {FacebookPageUpdateArgs} args - Arguments to update one FacebookPage.
     * @example
     * // Update one FacebookPage
     * const facebookPage = await prisma.facebookPage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends FacebookPageUpdateArgs>(args: Prisma.SelectSubset<T, FacebookPageUpdateArgs<ExtArgs>>): Prisma.Prisma__FacebookPageClient<runtime.Types.Result.GetResult<Prisma.$FacebookPagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more FacebookPages.
     * @param {FacebookPageDeleteManyArgs} args - Arguments to filter FacebookPages to delete.
     * @example
     * // Delete a few FacebookPages
     * const { count } = await prisma.facebookPage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends FacebookPageDeleteManyArgs>(args?: Prisma.SelectSubset<T, FacebookPageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more FacebookPages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FacebookPageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FacebookPages
     * const facebookPage = await prisma.facebookPage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends FacebookPageUpdateManyArgs>(args: Prisma.SelectSubset<T, FacebookPageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more FacebookPages and returns the data updated in the database.
     * @param {FacebookPageUpdateManyAndReturnArgs} args - Arguments to update many FacebookPages.
     * @example
     * // Update many FacebookPages
     * const facebookPage = await prisma.facebookPage.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more FacebookPages and only return the `id`
     * const facebookPageWithIdOnly = await prisma.facebookPage.updateManyAndReturn({
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
    updateManyAndReturn<T extends FacebookPageUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, FacebookPageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FacebookPagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one FacebookPage.
     * @param {FacebookPageUpsertArgs} args - Arguments to update or create a FacebookPage.
     * @example
     * // Update or create a FacebookPage
     * const facebookPage = await prisma.facebookPage.upsert({
     *   create: {
     *     // ... data to create a FacebookPage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FacebookPage we want to update
     *   }
     * })
     */
    upsert<T extends FacebookPageUpsertArgs>(args: Prisma.SelectSubset<T, FacebookPageUpsertArgs<ExtArgs>>): Prisma.Prisma__FacebookPageClient<runtime.Types.Result.GetResult<Prisma.$FacebookPagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of FacebookPages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FacebookPageCountArgs} args - Arguments to filter FacebookPages to count.
     * @example
     * // Count the number of FacebookPages
     * const count = await prisma.facebookPage.count({
     *   where: {
     *     // ... the filter for the FacebookPages we want to count
     *   }
     * })
    **/
    count<T extends FacebookPageCountArgs>(args?: Prisma.Subset<T, FacebookPageCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], FacebookPageCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a FacebookPage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FacebookPageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FacebookPageAggregateArgs>(args: Prisma.Subset<T, FacebookPageAggregateArgs>): Prisma.PrismaPromise<GetFacebookPageAggregateType<T>>;
    /**
     * Group by FacebookPage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FacebookPageGroupByArgs} args - Group by arguments.
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
    groupBy<T extends FacebookPageGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: FacebookPageGroupByArgs['orderBy'];
    } : {
        orderBy?: FacebookPageGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, FacebookPageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFacebookPageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the FacebookPage model
     */
    readonly fields: FacebookPageFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for FacebookPage.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__FacebookPageClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    comments<T extends Prisma.FacebookPage$commentsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.FacebookPage$commentsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    replies<T extends Prisma.FacebookPage$repliesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.FacebookPage$repliesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReplyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
 * Fields of the FacebookPage model
 */
export interface FacebookPageFieldRefs {
    readonly id: Prisma.FieldRef<"FacebookPage", 'String'>;
    readonly userId: Prisma.FieldRef<"FacebookPage", 'String'>;
    readonly pageId: Prisma.FieldRef<"FacebookPage", 'String'>;
    readonly pageName: Prisma.FieldRef<"FacebookPage", 'String'>;
    readonly pageAccessToken: Prisma.FieldRef<"FacebookPage", 'String'>;
    readonly accessTokenExpiry: Prisma.FieldRef<"FacebookPage", 'DateTime'>;
    readonly isConnected: Prisma.FieldRef<"FacebookPage", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"FacebookPage", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"FacebookPage", 'DateTime'>;
}
/**
 * FacebookPage findUnique
 */
export type FacebookPageFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FacebookPage
     */
    select?: Prisma.FacebookPageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FacebookPage
     */
    omit?: Prisma.FacebookPageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FacebookPageInclude<ExtArgs> | null;
    /**
     * Filter, which FacebookPage to fetch.
     */
    where: Prisma.FacebookPageWhereUniqueInput;
};
/**
 * FacebookPage findUniqueOrThrow
 */
export type FacebookPageFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FacebookPage
     */
    select?: Prisma.FacebookPageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FacebookPage
     */
    omit?: Prisma.FacebookPageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FacebookPageInclude<ExtArgs> | null;
    /**
     * Filter, which FacebookPage to fetch.
     */
    where: Prisma.FacebookPageWhereUniqueInput;
};
/**
 * FacebookPage findFirst
 */
export type FacebookPageFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FacebookPage
     */
    select?: Prisma.FacebookPageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FacebookPage
     */
    omit?: Prisma.FacebookPageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FacebookPageInclude<ExtArgs> | null;
    /**
     * Filter, which FacebookPage to fetch.
     */
    where?: Prisma.FacebookPageWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of FacebookPages to fetch.
     */
    orderBy?: Prisma.FacebookPageOrderByWithRelationInput | Prisma.FacebookPageOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for FacebookPages.
     */
    cursor?: Prisma.FacebookPageWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` FacebookPages from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` FacebookPages.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of FacebookPages.
     */
    distinct?: Prisma.FacebookPageScalarFieldEnum | Prisma.FacebookPageScalarFieldEnum[];
};
/**
 * FacebookPage findFirstOrThrow
 */
export type FacebookPageFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FacebookPage
     */
    select?: Prisma.FacebookPageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FacebookPage
     */
    omit?: Prisma.FacebookPageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FacebookPageInclude<ExtArgs> | null;
    /**
     * Filter, which FacebookPage to fetch.
     */
    where?: Prisma.FacebookPageWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of FacebookPages to fetch.
     */
    orderBy?: Prisma.FacebookPageOrderByWithRelationInput | Prisma.FacebookPageOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for FacebookPages.
     */
    cursor?: Prisma.FacebookPageWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` FacebookPages from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` FacebookPages.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of FacebookPages.
     */
    distinct?: Prisma.FacebookPageScalarFieldEnum | Prisma.FacebookPageScalarFieldEnum[];
};
/**
 * FacebookPage findMany
 */
export type FacebookPageFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FacebookPage
     */
    select?: Prisma.FacebookPageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FacebookPage
     */
    omit?: Prisma.FacebookPageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FacebookPageInclude<ExtArgs> | null;
    /**
     * Filter, which FacebookPages to fetch.
     */
    where?: Prisma.FacebookPageWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of FacebookPages to fetch.
     */
    orderBy?: Prisma.FacebookPageOrderByWithRelationInput | Prisma.FacebookPageOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing FacebookPages.
     */
    cursor?: Prisma.FacebookPageWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` FacebookPages from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` FacebookPages.
     */
    skip?: number;
    distinct?: Prisma.FacebookPageScalarFieldEnum | Prisma.FacebookPageScalarFieldEnum[];
};
/**
 * FacebookPage create
 */
export type FacebookPageCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FacebookPage
     */
    select?: Prisma.FacebookPageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FacebookPage
     */
    omit?: Prisma.FacebookPageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FacebookPageInclude<ExtArgs> | null;
    /**
     * The data needed to create a FacebookPage.
     */
    data: Prisma.XOR<Prisma.FacebookPageCreateInput, Prisma.FacebookPageUncheckedCreateInput>;
};
/**
 * FacebookPage createMany
 */
export type FacebookPageCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many FacebookPages.
     */
    data: Prisma.FacebookPageCreateManyInput | Prisma.FacebookPageCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * FacebookPage createManyAndReturn
 */
export type FacebookPageCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FacebookPage
     */
    select?: Prisma.FacebookPageSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the FacebookPage
     */
    omit?: Prisma.FacebookPageOmit<ExtArgs> | null;
    /**
     * The data used to create many FacebookPages.
     */
    data: Prisma.FacebookPageCreateManyInput | Prisma.FacebookPageCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FacebookPageIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * FacebookPage update
 */
export type FacebookPageUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FacebookPage
     */
    select?: Prisma.FacebookPageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FacebookPage
     */
    omit?: Prisma.FacebookPageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FacebookPageInclude<ExtArgs> | null;
    /**
     * The data needed to update a FacebookPage.
     */
    data: Prisma.XOR<Prisma.FacebookPageUpdateInput, Prisma.FacebookPageUncheckedUpdateInput>;
    /**
     * Choose, which FacebookPage to update.
     */
    where: Prisma.FacebookPageWhereUniqueInput;
};
/**
 * FacebookPage updateMany
 */
export type FacebookPageUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update FacebookPages.
     */
    data: Prisma.XOR<Prisma.FacebookPageUpdateManyMutationInput, Prisma.FacebookPageUncheckedUpdateManyInput>;
    /**
     * Filter which FacebookPages to update
     */
    where?: Prisma.FacebookPageWhereInput;
    /**
     * Limit how many FacebookPages to update.
     */
    limit?: number;
};
/**
 * FacebookPage updateManyAndReturn
 */
export type FacebookPageUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FacebookPage
     */
    select?: Prisma.FacebookPageSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the FacebookPage
     */
    omit?: Prisma.FacebookPageOmit<ExtArgs> | null;
    /**
     * The data used to update FacebookPages.
     */
    data: Prisma.XOR<Prisma.FacebookPageUpdateManyMutationInput, Prisma.FacebookPageUncheckedUpdateManyInput>;
    /**
     * Filter which FacebookPages to update
     */
    where?: Prisma.FacebookPageWhereInput;
    /**
     * Limit how many FacebookPages to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FacebookPageIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * FacebookPage upsert
 */
export type FacebookPageUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FacebookPage
     */
    select?: Prisma.FacebookPageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FacebookPage
     */
    omit?: Prisma.FacebookPageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FacebookPageInclude<ExtArgs> | null;
    /**
     * The filter to search for the FacebookPage to update in case it exists.
     */
    where: Prisma.FacebookPageWhereUniqueInput;
    /**
     * In case the FacebookPage found by the `where` argument doesn't exist, create a new FacebookPage with this data.
     */
    create: Prisma.XOR<Prisma.FacebookPageCreateInput, Prisma.FacebookPageUncheckedCreateInput>;
    /**
     * In case the FacebookPage was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.FacebookPageUpdateInput, Prisma.FacebookPageUncheckedUpdateInput>;
};
/**
 * FacebookPage delete
 */
export type FacebookPageDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FacebookPage
     */
    select?: Prisma.FacebookPageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FacebookPage
     */
    omit?: Prisma.FacebookPageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FacebookPageInclude<ExtArgs> | null;
    /**
     * Filter which FacebookPage to delete.
     */
    where: Prisma.FacebookPageWhereUniqueInput;
};
/**
 * FacebookPage deleteMany
 */
export type FacebookPageDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which FacebookPages to delete
     */
    where?: Prisma.FacebookPageWhereInput;
    /**
     * Limit how many FacebookPages to delete.
     */
    limit?: number;
};
/**
 * FacebookPage.comments
 */
export type FacebookPage$commentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: Prisma.CommentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Comment
     */
    omit?: Prisma.CommentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.CommentInclude<ExtArgs> | null;
    where?: Prisma.CommentWhereInput;
    orderBy?: Prisma.CommentOrderByWithRelationInput | Prisma.CommentOrderByWithRelationInput[];
    cursor?: Prisma.CommentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CommentScalarFieldEnum | Prisma.CommentScalarFieldEnum[];
};
/**
 * FacebookPage.replies
 */
export type FacebookPage$repliesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reply
     */
    select?: Prisma.ReplySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Reply
     */
    omit?: Prisma.ReplyOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ReplyInclude<ExtArgs> | null;
    where?: Prisma.ReplyWhereInput;
    orderBy?: Prisma.ReplyOrderByWithRelationInput | Prisma.ReplyOrderByWithRelationInput[];
    cursor?: Prisma.ReplyWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ReplyScalarFieldEnum | Prisma.ReplyScalarFieldEnum[];
};
/**
 * FacebookPage without action
 */
export type FacebookPageDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FacebookPage
     */
    select?: Prisma.FacebookPageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FacebookPage
     */
    omit?: Prisma.FacebookPageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FacebookPageInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=FacebookPage.d.ts.map