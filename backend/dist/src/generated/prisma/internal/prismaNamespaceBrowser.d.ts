import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models.js';
export type * from './prismaNamespace.js';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
export declare const ModelName: {
    readonly User: "User";
    readonly CertificationSubmission: "CertificationSubmission";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly email: "email";
    readonly username: "username";
    readonly password: "password";
    readonly firstName: "firstName";
    readonly lastName: "lastName";
    readonly role: "role";
    readonly domain: "domain";
    readonly status: "status";
    readonly isActive: "isActive";
    readonly firstLoginAt: "firstLoginAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const CertificationSubmissionScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly pdfStoragePath: "pdfStoragePath";
    readonly submittedAt: "submittedAt";
    readonly primaryVerificationStatus: "primaryVerificationStatus";
    readonly primaryVerificationNote: "primaryVerificationNote";
    readonly adminVerificationStatus: "adminVerificationStatus";
    readonly adminVerificationNote: "adminVerificationNote";
    readonly verifiedAt: "verifiedAt";
    readonly verifiedBy: "verifiedBy";
};
export type CertificationSubmissionScalarFieldEnum = (typeof CertificationSubmissionScalarFieldEnum)[keyof typeof CertificationSubmissionScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
