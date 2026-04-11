import { Domain, Role } from './create-user.dto.js';
export declare enum UserStatus {
    PENDING_CERTIFICATION = "PENDING_CERTIFICATION",
    CERTIFICATION_SUBMITTED = "CERTIFICATION_SUBMITTED",
    CERTIFICATION_VERIFIED = "CERTIFICATION_VERIFIED",
    READY = "READY"
}
export declare class ListUsersDto {
    page?: number;
    limit?: number;
    status?: UserStatus;
    domain?: Domain;
    role?: Role;
}
