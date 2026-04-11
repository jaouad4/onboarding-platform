import * as runtime from "@prisma/client/runtime/index-browser";
export const Decimal = runtime.Decimal;
export const NullTypes = {
    DbNull: runtime.NullTypes.DbNull,
    JsonNull: runtime.NullTypes.JsonNull,
    AnyNull: runtime.NullTypes.AnyNull,
};
export const DbNull = runtime.DbNull;
export const JsonNull = runtime.JsonNull;
export const AnyNull = runtime.AnyNull;
export const ModelName = {
    User: 'User',
    CertificationSubmission: 'CertificationSubmission'
};
export const TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
export const UserScalarFieldEnum = {
    id: 'id',
    email: 'email',
    username: 'username',
    password: 'password',
    firstName: 'firstName',
    lastName: 'lastName',
    role: 'role',
    domain: 'domain',
    status: 'status',
    isActive: 'isActive',
    firstLoginAt: 'firstLoginAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const CertificationSubmissionScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    pdfStoragePath: 'pdfStoragePath',
    submittedAt: 'submittedAt',
    primaryVerificationStatus: 'primaryVerificationStatus',
    primaryVerificationNote: 'primaryVerificationNote',
    adminVerificationStatus: 'adminVerificationStatus',
    adminVerificationNote: 'adminVerificationNote',
    verifiedAt: 'verifiedAt',
    verifiedBy: 'verifiedBy'
};
export const SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
export const QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
export const NullsOrder = {
    first: 'first',
    last: 'last'
};
//# sourceMappingURL=prismaNamespaceBrowser.js.map