export declare const Role: {
    readonly ADMIN: "ADMIN";
    readonly USER: "USER";
};
export type Role = (typeof Role)[keyof typeof Role];
export declare const Domain: {
    readonly TECHNIQUE: "TECHNIQUE";
    readonly COMMERCE: "COMMERCE";
    readonly MARKETING: "MARKETING";
    readonly FINANCE: "FINANCE";
    readonly RH: "RH";
};
export type Domain = (typeof Domain)[keyof typeof Domain];
export declare const UserStatus: {
    readonly PENDING_CERTIFICATION: "PENDING_CERTIFICATION";
    readonly CERTIFICATION_SUBMITTED: "CERTIFICATION_SUBMITTED";
    readonly CERTIFICATION_VERIFIED: "CERTIFICATION_VERIFIED";
    readonly READY: "READY";
};
export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];
export declare const PrimaryVerificationStatus: {
    readonly PENDING: "PENDING";
    readonly PASSED: "PASSED";
    readonly FAILED: "FAILED";
};
export type PrimaryVerificationStatus = (typeof PrimaryVerificationStatus)[keyof typeof PrimaryVerificationStatus];
export declare const AdminVerificationStatus: {
    readonly PENDING: "PENDING";
    readonly APPROVED: "APPROVED";
    readonly REJECTED: "REJECTED";
};
export type AdminVerificationStatus = (typeof AdminVerificationStatus)[keyof typeof AdminVerificationStatus];
