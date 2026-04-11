import { Domain, Role } from './create-user.dto.js';
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
