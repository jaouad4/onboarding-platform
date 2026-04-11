import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type CertificationSubmissionModel = runtime.Types.Result.DefaultSelection<Prisma.$CertificationSubmissionPayload>;
export type AggregateCertificationSubmission = {
    _count: CertificationSubmissionCountAggregateOutputType | null;
    _min: CertificationSubmissionMinAggregateOutputType | null;
    _max: CertificationSubmissionMaxAggregateOutputType | null;
};
export type CertificationSubmissionMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    pdfStoragePath: string | null;
    submittedAt: Date | null;
    primaryVerificationStatus: $Enums.PrimaryVerificationStatus | null;
    primaryVerificationNote: string | null;
    adminVerificationStatus: $Enums.AdminVerificationStatus | null;
    adminVerificationNote: string | null;
    verifiedAt: Date | null;
    verifiedBy: string | null;
};
export type CertificationSubmissionMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    pdfStoragePath: string | null;
    submittedAt: Date | null;
    primaryVerificationStatus: $Enums.PrimaryVerificationStatus | null;
    primaryVerificationNote: string | null;
    adminVerificationStatus: $Enums.AdminVerificationStatus | null;
    adminVerificationNote: string | null;
    verifiedAt: Date | null;
    verifiedBy: string | null;
};
export type CertificationSubmissionCountAggregateOutputType = {
    id: number;
    userId: number;
    pdfStoragePath: number;
    submittedAt: number;
    primaryVerificationStatus: number;
    primaryVerificationNote: number;
    adminVerificationStatus: number;
    adminVerificationNote: number;
    verifiedAt: number;
    verifiedBy: number;
    _all: number;
};
export type CertificationSubmissionMinAggregateInputType = {
    id?: true;
    userId?: true;
    pdfStoragePath?: true;
    submittedAt?: true;
    primaryVerificationStatus?: true;
    primaryVerificationNote?: true;
    adminVerificationStatus?: true;
    adminVerificationNote?: true;
    verifiedAt?: true;
    verifiedBy?: true;
};
export type CertificationSubmissionMaxAggregateInputType = {
    id?: true;
    userId?: true;
    pdfStoragePath?: true;
    submittedAt?: true;
    primaryVerificationStatus?: true;
    primaryVerificationNote?: true;
    adminVerificationStatus?: true;
    adminVerificationNote?: true;
    verifiedAt?: true;
    verifiedBy?: true;
};
export type CertificationSubmissionCountAggregateInputType = {
    id?: true;
    userId?: true;
    pdfStoragePath?: true;
    submittedAt?: true;
    primaryVerificationStatus?: true;
    primaryVerificationNote?: true;
    adminVerificationStatus?: true;
    adminVerificationNote?: true;
    verifiedAt?: true;
    verifiedBy?: true;
    _all?: true;
};
export type CertificationSubmissionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CertificationSubmissionWhereInput;
    orderBy?: Prisma.CertificationSubmissionOrderByWithRelationInput | Prisma.CertificationSubmissionOrderByWithRelationInput[];
    cursor?: Prisma.CertificationSubmissionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | CertificationSubmissionCountAggregateInputType;
    _min?: CertificationSubmissionMinAggregateInputType;
    _max?: CertificationSubmissionMaxAggregateInputType;
};
export type GetCertificationSubmissionAggregateType<T extends CertificationSubmissionAggregateArgs> = {
    [P in keyof T & keyof AggregateCertificationSubmission]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCertificationSubmission[P]> : Prisma.GetScalarType<T[P], AggregateCertificationSubmission[P]>;
};
export type CertificationSubmissionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CertificationSubmissionWhereInput;
    orderBy?: Prisma.CertificationSubmissionOrderByWithAggregationInput | Prisma.CertificationSubmissionOrderByWithAggregationInput[];
    by: Prisma.CertificationSubmissionScalarFieldEnum[] | Prisma.CertificationSubmissionScalarFieldEnum;
    having?: Prisma.CertificationSubmissionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CertificationSubmissionCountAggregateInputType | true;
    _min?: CertificationSubmissionMinAggregateInputType;
    _max?: CertificationSubmissionMaxAggregateInputType;
};
export type CertificationSubmissionGroupByOutputType = {
    id: string;
    userId: string;
    pdfStoragePath: string;
    submittedAt: Date;
    primaryVerificationStatus: $Enums.PrimaryVerificationStatus;
    primaryVerificationNote: string | null;
    adminVerificationStatus: $Enums.AdminVerificationStatus;
    adminVerificationNote: string | null;
    verifiedAt: Date | null;
    verifiedBy: string | null;
    _count: CertificationSubmissionCountAggregateOutputType | null;
    _min: CertificationSubmissionMinAggregateOutputType | null;
    _max: CertificationSubmissionMaxAggregateOutputType | null;
};
export type GetCertificationSubmissionGroupByPayload<T extends CertificationSubmissionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CertificationSubmissionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CertificationSubmissionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CertificationSubmissionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CertificationSubmissionGroupByOutputType[P]>;
}>>;
export type CertificationSubmissionWhereInput = {
    AND?: Prisma.CertificationSubmissionWhereInput | Prisma.CertificationSubmissionWhereInput[];
    OR?: Prisma.CertificationSubmissionWhereInput[];
    NOT?: Prisma.CertificationSubmissionWhereInput | Prisma.CertificationSubmissionWhereInput[];
    id?: Prisma.StringFilter<"CertificationSubmission"> | string;
    userId?: Prisma.StringFilter<"CertificationSubmission"> | string;
    pdfStoragePath?: Prisma.StringFilter<"CertificationSubmission"> | string;
    submittedAt?: Prisma.DateTimeFilter<"CertificationSubmission"> | Date | string;
    primaryVerificationStatus?: Prisma.EnumPrimaryVerificationStatusFilter<"CertificationSubmission"> | $Enums.PrimaryVerificationStatus;
    primaryVerificationNote?: Prisma.StringNullableFilter<"CertificationSubmission"> | string | null;
    adminVerificationStatus?: Prisma.EnumAdminVerificationStatusFilter<"CertificationSubmission"> | $Enums.AdminVerificationStatus;
    adminVerificationNote?: Prisma.StringNullableFilter<"CertificationSubmission"> | string | null;
    verifiedAt?: Prisma.DateTimeNullableFilter<"CertificationSubmission"> | Date | string | null;
    verifiedBy?: Prisma.StringNullableFilter<"CertificationSubmission"> | string | null;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type CertificationSubmissionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    pdfStoragePath?: Prisma.SortOrder;
    submittedAt?: Prisma.SortOrder;
    primaryVerificationStatus?: Prisma.SortOrder;
    primaryVerificationNote?: Prisma.SortOrderInput | Prisma.SortOrder;
    adminVerificationStatus?: Prisma.SortOrder;
    adminVerificationNote?: Prisma.SortOrderInput | Prisma.SortOrder;
    verifiedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    verifiedBy?: Prisma.SortOrderInput | Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type CertificationSubmissionWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.CertificationSubmissionWhereInput | Prisma.CertificationSubmissionWhereInput[];
    OR?: Prisma.CertificationSubmissionWhereInput[];
    NOT?: Prisma.CertificationSubmissionWhereInput | Prisma.CertificationSubmissionWhereInput[];
    userId?: Prisma.StringFilter<"CertificationSubmission"> | string;
    pdfStoragePath?: Prisma.StringFilter<"CertificationSubmission"> | string;
    submittedAt?: Prisma.DateTimeFilter<"CertificationSubmission"> | Date | string;
    primaryVerificationStatus?: Prisma.EnumPrimaryVerificationStatusFilter<"CertificationSubmission"> | $Enums.PrimaryVerificationStatus;
    primaryVerificationNote?: Prisma.StringNullableFilter<"CertificationSubmission"> | string | null;
    adminVerificationStatus?: Prisma.EnumAdminVerificationStatusFilter<"CertificationSubmission"> | $Enums.AdminVerificationStatus;
    adminVerificationNote?: Prisma.StringNullableFilter<"CertificationSubmission"> | string | null;
    verifiedAt?: Prisma.DateTimeNullableFilter<"CertificationSubmission"> | Date | string | null;
    verifiedBy?: Prisma.StringNullableFilter<"CertificationSubmission"> | string | null;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id">;
export type CertificationSubmissionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    pdfStoragePath?: Prisma.SortOrder;
    submittedAt?: Prisma.SortOrder;
    primaryVerificationStatus?: Prisma.SortOrder;
    primaryVerificationNote?: Prisma.SortOrderInput | Prisma.SortOrder;
    adminVerificationStatus?: Prisma.SortOrder;
    adminVerificationNote?: Prisma.SortOrderInput | Prisma.SortOrder;
    verifiedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    verifiedBy?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.CertificationSubmissionCountOrderByAggregateInput;
    _max?: Prisma.CertificationSubmissionMaxOrderByAggregateInput;
    _min?: Prisma.CertificationSubmissionMinOrderByAggregateInput;
};
export type CertificationSubmissionScalarWhereWithAggregatesInput = {
    AND?: Prisma.CertificationSubmissionScalarWhereWithAggregatesInput | Prisma.CertificationSubmissionScalarWhereWithAggregatesInput[];
    OR?: Prisma.CertificationSubmissionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.CertificationSubmissionScalarWhereWithAggregatesInput | Prisma.CertificationSubmissionScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"CertificationSubmission"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"CertificationSubmission"> | string;
    pdfStoragePath?: Prisma.StringWithAggregatesFilter<"CertificationSubmission"> | string;
    submittedAt?: Prisma.DateTimeWithAggregatesFilter<"CertificationSubmission"> | Date | string;
    primaryVerificationStatus?: Prisma.EnumPrimaryVerificationStatusWithAggregatesFilter<"CertificationSubmission"> | $Enums.PrimaryVerificationStatus;
    primaryVerificationNote?: Prisma.StringNullableWithAggregatesFilter<"CertificationSubmission"> | string | null;
    adminVerificationStatus?: Prisma.EnumAdminVerificationStatusWithAggregatesFilter<"CertificationSubmission"> | $Enums.AdminVerificationStatus;
    adminVerificationNote?: Prisma.StringNullableWithAggregatesFilter<"CertificationSubmission"> | string | null;
    verifiedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"CertificationSubmission"> | Date | string | null;
    verifiedBy?: Prisma.StringNullableWithAggregatesFilter<"CertificationSubmission"> | string | null;
};
export type CertificationSubmissionCreateInput = {
    id?: string;
    pdfStoragePath: string;
    submittedAt?: Date | string;
    primaryVerificationStatus?: $Enums.PrimaryVerificationStatus;
    primaryVerificationNote?: string | null;
    adminVerificationStatus?: $Enums.AdminVerificationStatus;
    adminVerificationNote?: string | null;
    verifiedAt?: Date | string | null;
    verifiedBy?: string | null;
    user: Prisma.UserCreateNestedOneWithoutCertificationSubmissionsInput;
};
export type CertificationSubmissionUncheckedCreateInput = {
    id?: string;
    userId: string;
    pdfStoragePath: string;
    submittedAt?: Date | string;
    primaryVerificationStatus?: $Enums.PrimaryVerificationStatus;
    primaryVerificationNote?: string | null;
    adminVerificationStatus?: $Enums.AdminVerificationStatus;
    adminVerificationNote?: string | null;
    verifiedAt?: Date | string | null;
    verifiedBy?: string | null;
};
export type CertificationSubmissionUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    pdfStoragePath?: Prisma.StringFieldUpdateOperationsInput | string;
    submittedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    primaryVerificationStatus?: Prisma.EnumPrimaryVerificationStatusFieldUpdateOperationsInput | $Enums.PrimaryVerificationStatus;
    primaryVerificationNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    adminVerificationStatus?: Prisma.EnumAdminVerificationStatusFieldUpdateOperationsInput | $Enums.AdminVerificationStatus;
    adminVerificationNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    verifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    verifiedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    user?: Prisma.UserUpdateOneRequiredWithoutCertificationSubmissionsNestedInput;
};
export type CertificationSubmissionUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    pdfStoragePath?: Prisma.StringFieldUpdateOperationsInput | string;
    submittedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    primaryVerificationStatus?: Prisma.EnumPrimaryVerificationStatusFieldUpdateOperationsInput | $Enums.PrimaryVerificationStatus;
    primaryVerificationNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    adminVerificationStatus?: Prisma.EnumAdminVerificationStatusFieldUpdateOperationsInput | $Enums.AdminVerificationStatus;
    adminVerificationNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    verifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    verifiedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type CertificationSubmissionCreateManyInput = {
    id?: string;
    userId: string;
    pdfStoragePath: string;
    submittedAt?: Date | string;
    primaryVerificationStatus?: $Enums.PrimaryVerificationStatus;
    primaryVerificationNote?: string | null;
    adminVerificationStatus?: $Enums.AdminVerificationStatus;
    adminVerificationNote?: string | null;
    verifiedAt?: Date | string | null;
    verifiedBy?: string | null;
};
export type CertificationSubmissionUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    pdfStoragePath?: Prisma.StringFieldUpdateOperationsInput | string;
    submittedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    primaryVerificationStatus?: Prisma.EnumPrimaryVerificationStatusFieldUpdateOperationsInput | $Enums.PrimaryVerificationStatus;
    primaryVerificationNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    adminVerificationStatus?: Prisma.EnumAdminVerificationStatusFieldUpdateOperationsInput | $Enums.AdminVerificationStatus;
    adminVerificationNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    verifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    verifiedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type CertificationSubmissionUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    pdfStoragePath?: Prisma.StringFieldUpdateOperationsInput | string;
    submittedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    primaryVerificationStatus?: Prisma.EnumPrimaryVerificationStatusFieldUpdateOperationsInput | $Enums.PrimaryVerificationStatus;
    primaryVerificationNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    adminVerificationStatus?: Prisma.EnumAdminVerificationStatusFieldUpdateOperationsInput | $Enums.AdminVerificationStatus;
    adminVerificationNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    verifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    verifiedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type CertificationSubmissionListRelationFilter = {
    every?: Prisma.CertificationSubmissionWhereInput;
    some?: Prisma.CertificationSubmissionWhereInput;
    none?: Prisma.CertificationSubmissionWhereInput;
};
export type CertificationSubmissionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type CertificationSubmissionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    pdfStoragePath?: Prisma.SortOrder;
    submittedAt?: Prisma.SortOrder;
    primaryVerificationStatus?: Prisma.SortOrder;
    primaryVerificationNote?: Prisma.SortOrder;
    adminVerificationStatus?: Prisma.SortOrder;
    adminVerificationNote?: Prisma.SortOrder;
    verifiedAt?: Prisma.SortOrder;
    verifiedBy?: Prisma.SortOrder;
};
export type CertificationSubmissionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    pdfStoragePath?: Prisma.SortOrder;
    submittedAt?: Prisma.SortOrder;
    primaryVerificationStatus?: Prisma.SortOrder;
    primaryVerificationNote?: Prisma.SortOrder;
    adminVerificationStatus?: Prisma.SortOrder;
    adminVerificationNote?: Prisma.SortOrder;
    verifiedAt?: Prisma.SortOrder;
    verifiedBy?: Prisma.SortOrder;
};
export type CertificationSubmissionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    pdfStoragePath?: Prisma.SortOrder;
    submittedAt?: Prisma.SortOrder;
    primaryVerificationStatus?: Prisma.SortOrder;
    primaryVerificationNote?: Prisma.SortOrder;
    adminVerificationStatus?: Prisma.SortOrder;
    adminVerificationNote?: Prisma.SortOrder;
    verifiedAt?: Prisma.SortOrder;
    verifiedBy?: Prisma.SortOrder;
};
export type CertificationSubmissionCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.CertificationSubmissionCreateWithoutUserInput, Prisma.CertificationSubmissionUncheckedCreateWithoutUserInput> | Prisma.CertificationSubmissionCreateWithoutUserInput[] | Prisma.CertificationSubmissionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.CertificationSubmissionCreateOrConnectWithoutUserInput | Prisma.CertificationSubmissionCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.CertificationSubmissionCreateManyUserInputEnvelope;
    connect?: Prisma.CertificationSubmissionWhereUniqueInput | Prisma.CertificationSubmissionWhereUniqueInput[];
};
export type CertificationSubmissionUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.CertificationSubmissionCreateWithoutUserInput, Prisma.CertificationSubmissionUncheckedCreateWithoutUserInput> | Prisma.CertificationSubmissionCreateWithoutUserInput[] | Prisma.CertificationSubmissionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.CertificationSubmissionCreateOrConnectWithoutUserInput | Prisma.CertificationSubmissionCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.CertificationSubmissionCreateManyUserInputEnvelope;
    connect?: Prisma.CertificationSubmissionWhereUniqueInput | Prisma.CertificationSubmissionWhereUniqueInput[];
};
export type CertificationSubmissionUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.CertificationSubmissionCreateWithoutUserInput, Prisma.CertificationSubmissionUncheckedCreateWithoutUserInput> | Prisma.CertificationSubmissionCreateWithoutUserInput[] | Prisma.CertificationSubmissionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.CertificationSubmissionCreateOrConnectWithoutUserInput | Prisma.CertificationSubmissionCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.CertificationSubmissionUpsertWithWhereUniqueWithoutUserInput | Prisma.CertificationSubmissionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.CertificationSubmissionCreateManyUserInputEnvelope;
    set?: Prisma.CertificationSubmissionWhereUniqueInput | Prisma.CertificationSubmissionWhereUniqueInput[];
    disconnect?: Prisma.CertificationSubmissionWhereUniqueInput | Prisma.CertificationSubmissionWhereUniqueInput[];
    delete?: Prisma.CertificationSubmissionWhereUniqueInput | Prisma.CertificationSubmissionWhereUniqueInput[];
    connect?: Prisma.CertificationSubmissionWhereUniqueInput | Prisma.CertificationSubmissionWhereUniqueInput[];
    update?: Prisma.CertificationSubmissionUpdateWithWhereUniqueWithoutUserInput | Prisma.CertificationSubmissionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.CertificationSubmissionUpdateManyWithWhereWithoutUserInput | Prisma.CertificationSubmissionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.CertificationSubmissionScalarWhereInput | Prisma.CertificationSubmissionScalarWhereInput[];
};
export type CertificationSubmissionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.CertificationSubmissionCreateWithoutUserInput, Prisma.CertificationSubmissionUncheckedCreateWithoutUserInput> | Prisma.CertificationSubmissionCreateWithoutUserInput[] | Prisma.CertificationSubmissionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.CertificationSubmissionCreateOrConnectWithoutUserInput | Prisma.CertificationSubmissionCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.CertificationSubmissionUpsertWithWhereUniqueWithoutUserInput | Prisma.CertificationSubmissionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.CertificationSubmissionCreateManyUserInputEnvelope;
    set?: Prisma.CertificationSubmissionWhereUniqueInput | Prisma.CertificationSubmissionWhereUniqueInput[];
    disconnect?: Prisma.CertificationSubmissionWhereUniqueInput | Prisma.CertificationSubmissionWhereUniqueInput[];
    delete?: Prisma.CertificationSubmissionWhereUniqueInput | Prisma.CertificationSubmissionWhereUniqueInput[];
    connect?: Prisma.CertificationSubmissionWhereUniqueInput | Prisma.CertificationSubmissionWhereUniqueInput[];
    update?: Prisma.CertificationSubmissionUpdateWithWhereUniqueWithoutUserInput | Prisma.CertificationSubmissionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.CertificationSubmissionUpdateManyWithWhereWithoutUserInput | Prisma.CertificationSubmissionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.CertificationSubmissionScalarWhereInput | Prisma.CertificationSubmissionScalarWhereInput[];
};
export type EnumPrimaryVerificationStatusFieldUpdateOperationsInput = {
    set?: $Enums.PrimaryVerificationStatus;
};
export type EnumAdminVerificationStatusFieldUpdateOperationsInput = {
    set?: $Enums.AdminVerificationStatus;
};
export type CertificationSubmissionCreateWithoutUserInput = {
    id?: string;
    pdfStoragePath: string;
    submittedAt?: Date | string;
    primaryVerificationStatus?: $Enums.PrimaryVerificationStatus;
    primaryVerificationNote?: string | null;
    adminVerificationStatus?: $Enums.AdminVerificationStatus;
    adminVerificationNote?: string | null;
    verifiedAt?: Date | string | null;
    verifiedBy?: string | null;
};
export type CertificationSubmissionUncheckedCreateWithoutUserInput = {
    id?: string;
    pdfStoragePath: string;
    submittedAt?: Date | string;
    primaryVerificationStatus?: $Enums.PrimaryVerificationStatus;
    primaryVerificationNote?: string | null;
    adminVerificationStatus?: $Enums.AdminVerificationStatus;
    adminVerificationNote?: string | null;
    verifiedAt?: Date | string | null;
    verifiedBy?: string | null;
};
export type CertificationSubmissionCreateOrConnectWithoutUserInput = {
    where: Prisma.CertificationSubmissionWhereUniqueInput;
    create: Prisma.XOR<Prisma.CertificationSubmissionCreateWithoutUserInput, Prisma.CertificationSubmissionUncheckedCreateWithoutUserInput>;
};
export type CertificationSubmissionCreateManyUserInputEnvelope = {
    data: Prisma.CertificationSubmissionCreateManyUserInput | Prisma.CertificationSubmissionCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type CertificationSubmissionUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.CertificationSubmissionWhereUniqueInput;
    update: Prisma.XOR<Prisma.CertificationSubmissionUpdateWithoutUserInput, Prisma.CertificationSubmissionUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.CertificationSubmissionCreateWithoutUserInput, Prisma.CertificationSubmissionUncheckedCreateWithoutUserInput>;
};
export type CertificationSubmissionUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.CertificationSubmissionWhereUniqueInput;
    data: Prisma.XOR<Prisma.CertificationSubmissionUpdateWithoutUserInput, Prisma.CertificationSubmissionUncheckedUpdateWithoutUserInput>;
};
export type CertificationSubmissionUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.CertificationSubmissionScalarWhereInput;
    data: Prisma.XOR<Prisma.CertificationSubmissionUpdateManyMutationInput, Prisma.CertificationSubmissionUncheckedUpdateManyWithoutUserInput>;
};
export type CertificationSubmissionScalarWhereInput = {
    AND?: Prisma.CertificationSubmissionScalarWhereInput | Prisma.CertificationSubmissionScalarWhereInput[];
    OR?: Prisma.CertificationSubmissionScalarWhereInput[];
    NOT?: Prisma.CertificationSubmissionScalarWhereInput | Prisma.CertificationSubmissionScalarWhereInput[];
    id?: Prisma.StringFilter<"CertificationSubmission"> | string;
    userId?: Prisma.StringFilter<"CertificationSubmission"> | string;
    pdfStoragePath?: Prisma.StringFilter<"CertificationSubmission"> | string;
    submittedAt?: Prisma.DateTimeFilter<"CertificationSubmission"> | Date | string;
    primaryVerificationStatus?: Prisma.EnumPrimaryVerificationStatusFilter<"CertificationSubmission"> | $Enums.PrimaryVerificationStatus;
    primaryVerificationNote?: Prisma.StringNullableFilter<"CertificationSubmission"> | string | null;
    adminVerificationStatus?: Prisma.EnumAdminVerificationStatusFilter<"CertificationSubmission"> | $Enums.AdminVerificationStatus;
    adminVerificationNote?: Prisma.StringNullableFilter<"CertificationSubmission"> | string | null;
    verifiedAt?: Prisma.DateTimeNullableFilter<"CertificationSubmission"> | Date | string | null;
    verifiedBy?: Prisma.StringNullableFilter<"CertificationSubmission"> | string | null;
};
export type CertificationSubmissionCreateManyUserInput = {
    id?: string;
    pdfStoragePath: string;
    submittedAt?: Date | string;
    primaryVerificationStatus?: $Enums.PrimaryVerificationStatus;
    primaryVerificationNote?: string | null;
    adminVerificationStatus?: $Enums.AdminVerificationStatus;
    adminVerificationNote?: string | null;
    verifiedAt?: Date | string | null;
    verifiedBy?: string | null;
};
export type CertificationSubmissionUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    pdfStoragePath?: Prisma.StringFieldUpdateOperationsInput | string;
    submittedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    primaryVerificationStatus?: Prisma.EnumPrimaryVerificationStatusFieldUpdateOperationsInput | $Enums.PrimaryVerificationStatus;
    primaryVerificationNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    adminVerificationStatus?: Prisma.EnumAdminVerificationStatusFieldUpdateOperationsInput | $Enums.AdminVerificationStatus;
    adminVerificationNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    verifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    verifiedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type CertificationSubmissionUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    pdfStoragePath?: Prisma.StringFieldUpdateOperationsInput | string;
    submittedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    primaryVerificationStatus?: Prisma.EnumPrimaryVerificationStatusFieldUpdateOperationsInput | $Enums.PrimaryVerificationStatus;
    primaryVerificationNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    adminVerificationStatus?: Prisma.EnumAdminVerificationStatusFieldUpdateOperationsInput | $Enums.AdminVerificationStatus;
    adminVerificationNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    verifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    verifiedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type CertificationSubmissionUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    pdfStoragePath?: Prisma.StringFieldUpdateOperationsInput | string;
    submittedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    primaryVerificationStatus?: Prisma.EnumPrimaryVerificationStatusFieldUpdateOperationsInput | $Enums.PrimaryVerificationStatus;
    primaryVerificationNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    adminVerificationStatus?: Prisma.EnumAdminVerificationStatusFieldUpdateOperationsInput | $Enums.AdminVerificationStatus;
    adminVerificationNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    verifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    verifiedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type CertificationSubmissionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    pdfStoragePath?: boolean;
    submittedAt?: boolean;
    primaryVerificationStatus?: boolean;
    primaryVerificationNote?: boolean;
    adminVerificationStatus?: boolean;
    adminVerificationNote?: boolean;
    verifiedAt?: boolean;
    verifiedBy?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["certificationSubmission"]>;
export type CertificationSubmissionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    pdfStoragePath?: boolean;
    submittedAt?: boolean;
    primaryVerificationStatus?: boolean;
    primaryVerificationNote?: boolean;
    adminVerificationStatus?: boolean;
    adminVerificationNote?: boolean;
    verifiedAt?: boolean;
    verifiedBy?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["certificationSubmission"]>;
export type CertificationSubmissionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    pdfStoragePath?: boolean;
    submittedAt?: boolean;
    primaryVerificationStatus?: boolean;
    primaryVerificationNote?: boolean;
    adminVerificationStatus?: boolean;
    adminVerificationNote?: boolean;
    verifiedAt?: boolean;
    verifiedBy?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["certificationSubmission"]>;
export type CertificationSubmissionSelectScalar = {
    id?: boolean;
    userId?: boolean;
    pdfStoragePath?: boolean;
    submittedAt?: boolean;
    primaryVerificationStatus?: boolean;
    primaryVerificationNote?: boolean;
    adminVerificationStatus?: boolean;
    adminVerificationNote?: boolean;
    verifiedAt?: boolean;
    verifiedBy?: boolean;
};
export type CertificationSubmissionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "pdfStoragePath" | "submittedAt" | "primaryVerificationStatus" | "primaryVerificationNote" | "adminVerificationStatus" | "adminVerificationNote" | "verifiedAt" | "verifiedBy", ExtArgs["result"]["certificationSubmission"]>;
export type CertificationSubmissionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type CertificationSubmissionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type CertificationSubmissionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $CertificationSubmissionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "CertificationSubmission";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        pdfStoragePath: string;
        submittedAt: Date;
        primaryVerificationStatus: $Enums.PrimaryVerificationStatus;
        primaryVerificationNote: string | null;
        adminVerificationStatus: $Enums.AdminVerificationStatus;
        adminVerificationNote: string | null;
        verifiedAt: Date | null;
        verifiedBy: string | null;
    }, ExtArgs["result"]["certificationSubmission"]>;
    composites: {};
};
export type CertificationSubmissionGetPayload<S extends boolean | null | undefined | CertificationSubmissionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$CertificationSubmissionPayload, S>;
export type CertificationSubmissionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<CertificationSubmissionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CertificationSubmissionCountAggregateInputType | true;
};
export interface CertificationSubmissionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['CertificationSubmission'];
        meta: {
            name: 'CertificationSubmission';
        };
    };
    findUnique<T extends CertificationSubmissionFindUniqueArgs>(args: Prisma.SelectSubset<T, CertificationSubmissionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__CertificationSubmissionClient<runtime.Types.Result.GetResult<Prisma.$CertificationSubmissionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends CertificationSubmissionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, CertificationSubmissionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__CertificationSubmissionClient<runtime.Types.Result.GetResult<Prisma.$CertificationSubmissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends CertificationSubmissionFindFirstArgs>(args?: Prisma.SelectSubset<T, CertificationSubmissionFindFirstArgs<ExtArgs>>): Prisma.Prisma__CertificationSubmissionClient<runtime.Types.Result.GetResult<Prisma.$CertificationSubmissionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends CertificationSubmissionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, CertificationSubmissionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__CertificationSubmissionClient<runtime.Types.Result.GetResult<Prisma.$CertificationSubmissionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends CertificationSubmissionFindManyArgs>(args?: Prisma.SelectSubset<T, CertificationSubmissionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CertificationSubmissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends CertificationSubmissionCreateArgs>(args: Prisma.SelectSubset<T, CertificationSubmissionCreateArgs<ExtArgs>>): Prisma.Prisma__CertificationSubmissionClient<runtime.Types.Result.GetResult<Prisma.$CertificationSubmissionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends CertificationSubmissionCreateManyArgs>(args?: Prisma.SelectSubset<T, CertificationSubmissionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends CertificationSubmissionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, CertificationSubmissionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CertificationSubmissionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends CertificationSubmissionDeleteArgs>(args: Prisma.SelectSubset<T, CertificationSubmissionDeleteArgs<ExtArgs>>): Prisma.Prisma__CertificationSubmissionClient<runtime.Types.Result.GetResult<Prisma.$CertificationSubmissionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends CertificationSubmissionUpdateArgs>(args: Prisma.SelectSubset<T, CertificationSubmissionUpdateArgs<ExtArgs>>): Prisma.Prisma__CertificationSubmissionClient<runtime.Types.Result.GetResult<Prisma.$CertificationSubmissionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends CertificationSubmissionDeleteManyArgs>(args?: Prisma.SelectSubset<T, CertificationSubmissionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends CertificationSubmissionUpdateManyArgs>(args: Prisma.SelectSubset<T, CertificationSubmissionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends CertificationSubmissionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, CertificationSubmissionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CertificationSubmissionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends CertificationSubmissionUpsertArgs>(args: Prisma.SelectSubset<T, CertificationSubmissionUpsertArgs<ExtArgs>>): Prisma.Prisma__CertificationSubmissionClient<runtime.Types.Result.GetResult<Prisma.$CertificationSubmissionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends CertificationSubmissionCountArgs>(args?: Prisma.Subset<T, CertificationSubmissionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CertificationSubmissionCountAggregateOutputType> : number>;
    aggregate<T extends CertificationSubmissionAggregateArgs>(args: Prisma.Subset<T, CertificationSubmissionAggregateArgs>): Prisma.PrismaPromise<GetCertificationSubmissionAggregateType<T>>;
    groupBy<T extends CertificationSubmissionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: CertificationSubmissionGroupByArgs['orderBy'];
    } : {
        orderBy?: CertificationSubmissionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, CertificationSubmissionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCertificationSubmissionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: CertificationSubmissionFieldRefs;
}
export interface Prisma__CertificationSubmissionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface CertificationSubmissionFieldRefs {
    readonly id: Prisma.FieldRef<"CertificationSubmission", 'String'>;
    readonly userId: Prisma.FieldRef<"CertificationSubmission", 'String'>;
    readonly pdfStoragePath: Prisma.FieldRef<"CertificationSubmission", 'String'>;
    readonly submittedAt: Prisma.FieldRef<"CertificationSubmission", 'DateTime'>;
    readonly primaryVerificationStatus: Prisma.FieldRef<"CertificationSubmission", 'PrimaryVerificationStatus'>;
    readonly primaryVerificationNote: Prisma.FieldRef<"CertificationSubmission", 'String'>;
    readonly adminVerificationStatus: Prisma.FieldRef<"CertificationSubmission", 'AdminVerificationStatus'>;
    readonly adminVerificationNote: Prisma.FieldRef<"CertificationSubmission", 'String'>;
    readonly verifiedAt: Prisma.FieldRef<"CertificationSubmission", 'DateTime'>;
    readonly verifiedBy: Prisma.FieldRef<"CertificationSubmission", 'String'>;
}
export type CertificationSubmissionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CertificationSubmissionSelect<ExtArgs> | null;
    omit?: Prisma.CertificationSubmissionOmit<ExtArgs> | null;
    include?: Prisma.CertificationSubmissionInclude<ExtArgs> | null;
    where: Prisma.CertificationSubmissionWhereUniqueInput;
};
export type CertificationSubmissionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CertificationSubmissionSelect<ExtArgs> | null;
    omit?: Prisma.CertificationSubmissionOmit<ExtArgs> | null;
    include?: Prisma.CertificationSubmissionInclude<ExtArgs> | null;
    where: Prisma.CertificationSubmissionWhereUniqueInput;
};
export type CertificationSubmissionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CertificationSubmissionSelect<ExtArgs> | null;
    omit?: Prisma.CertificationSubmissionOmit<ExtArgs> | null;
    include?: Prisma.CertificationSubmissionInclude<ExtArgs> | null;
    where?: Prisma.CertificationSubmissionWhereInput;
    orderBy?: Prisma.CertificationSubmissionOrderByWithRelationInput | Prisma.CertificationSubmissionOrderByWithRelationInput[];
    cursor?: Prisma.CertificationSubmissionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CertificationSubmissionScalarFieldEnum | Prisma.CertificationSubmissionScalarFieldEnum[];
};
export type CertificationSubmissionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CertificationSubmissionSelect<ExtArgs> | null;
    omit?: Prisma.CertificationSubmissionOmit<ExtArgs> | null;
    include?: Prisma.CertificationSubmissionInclude<ExtArgs> | null;
    where?: Prisma.CertificationSubmissionWhereInput;
    orderBy?: Prisma.CertificationSubmissionOrderByWithRelationInput | Prisma.CertificationSubmissionOrderByWithRelationInput[];
    cursor?: Prisma.CertificationSubmissionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CertificationSubmissionScalarFieldEnum | Prisma.CertificationSubmissionScalarFieldEnum[];
};
export type CertificationSubmissionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CertificationSubmissionSelect<ExtArgs> | null;
    omit?: Prisma.CertificationSubmissionOmit<ExtArgs> | null;
    include?: Prisma.CertificationSubmissionInclude<ExtArgs> | null;
    where?: Prisma.CertificationSubmissionWhereInput;
    orderBy?: Prisma.CertificationSubmissionOrderByWithRelationInput | Prisma.CertificationSubmissionOrderByWithRelationInput[];
    cursor?: Prisma.CertificationSubmissionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CertificationSubmissionScalarFieldEnum | Prisma.CertificationSubmissionScalarFieldEnum[];
};
export type CertificationSubmissionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CertificationSubmissionSelect<ExtArgs> | null;
    omit?: Prisma.CertificationSubmissionOmit<ExtArgs> | null;
    include?: Prisma.CertificationSubmissionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CertificationSubmissionCreateInput, Prisma.CertificationSubmissionUncheckedCreateInput>;
};
export type CertificationSubmissionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.CertificationSubmissionCreateManyInput | Prisma.CertificationSubmissionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type CertificationSubmissionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CertificationSubmissionSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CertificationSubmissionOmit<ExtArgs> | null;
    data: Prisma.CertificationSubmissionCreateManyInput | Prisma.CertificationSubmissionCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.CertificationSubmissionIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type CertificationSubmissionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CertificationSubmissionSelect<ExtArgs> | null;
    omit?: Prisma.CertificationSubmissionOmit<ExtArgs> | null;
    include?: Prisma.CertificationSubmissionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CertificationSubmissionUpdateInput, Prisma.CertificationSubmissionUncheckedUpdateInput>;
    where: Prisma.CertificationSubmissionWhereUniqueInput;
};
export type CertificationSubmissionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.CertificationSubmissionUpdateManyMutationInput, Prisma.CertificationSubmissionUncheckedUpdateManyInput>;
    where?: Prisma.CertificationSubmissionWhereInput;
    limit?: number;
};
export type CertificationSubmissionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CertificationSubmissionSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CertificationSubmissionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CertificationSubmissionUpdateManyMutationInput, Prisma.CertificationSubmissionUncheckedUpdateManyInput>;
    where?: Prisma.CertificationSubmissionWhereInput;
    limit?: number;
    include?: Prisma.CertificationSubmissionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type CertificationSubmissionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CertificationSubmissionSelect<ExtArgs> | null;
    omit?: Prisma.CertificationSubmissionOmit<ExtArgs> | null;
    include?: Prisma.CertificationSubmissionInclude<ExtArgs> | null;
    where: Prisma.CertificationSubmissionWhereUniqueInput;
    create: Prisma.XOR<Prisma.CertificationSubmissionCreateInput, Prisma.CertificationSubmissionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.CertificationSubmissionUpdateInput, Prisma.CertificationSubmissionUncheckedUpdateInput>;
};
export type CertificationSubmissionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CertificationSubmissionSelect<ExtArgs> | null;
    omit?: Prisma.CertificationSubmissionOmit<ExtArgs> | null;
    include?: Prisma.CertificationSubmissionInclude<ExtArgs> | null;
    where: Prisma.CertificationSubmissionWhereUniqueInput;
};
export type CertificationSubmissionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CertificationSubmissionWhereInput;
    limit?: number;
};
export type CertificationSubmissionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CertificationSubmissionSelect<ExtArgs> | null;
    omit?: Prisma.CertificationSubmissionOmit<ExtArgs> | null;
    include?: Prisma.CertificationSubmissionInclude<ExtArgs> | null;
};
