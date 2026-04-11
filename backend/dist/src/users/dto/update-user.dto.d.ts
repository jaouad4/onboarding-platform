import { Domain, Role } from '@prisma/client';
export declare class UpdateUserDto {
    firstName?: string;
    lastName?: string;
    username?: string;
    password?: string;
    email?: string;
    domain?: Domain;
    role?: Role;
    isActive?: boolean;
}
