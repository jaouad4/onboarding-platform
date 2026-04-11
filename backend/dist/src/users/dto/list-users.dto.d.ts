import { Domain, Role, UserStatus } from '@prisma/client';
export declare class ListUsersDto {
    page?: number;
    limit?: number;
    status?: UserStatus;
    domain?: Domain;
    role?: Role;
}
