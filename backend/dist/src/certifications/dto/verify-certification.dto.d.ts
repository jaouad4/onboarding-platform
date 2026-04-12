export declare enum VerificationDecision {
    APPROVED = "APPROVED",
    REJECTED = "REJECTED"
}
export declare class VerifyCertificationDto {
    decision: VerificationDecision;
    note?: string;
}
