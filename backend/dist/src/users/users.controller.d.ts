import { UsersService } from './users.service.js';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ListUsersDto } from './dto/list-users.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(dto: CreateUserDto): Promise<{
        success: boolean;
        data: {
            id: string;
            email: string | null;
            username: string;
            firstName: string;
            lastName: string;
            role: import("../generated/prisma/enums.js").Role;
            domain: import("../generated/prisma/enums.js").Domain | null;
            status: import("../generated/prisma/enums.js").UserStatus;
            isActive: boolean;
            firstLoginAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
        };
        message: string;
    }>;
    findAll(query: ListUsersDto): Promise<{
        success: boolean;
        data: {
            data: {
                id: string;
                email: string | null;
                username: string;
                firstName: string;
                lastName: string;
                role: import("../generated/prisma/enums.js").Role;
                domain: import("../generated/prisma/enums.js").Domain | null;
                status: import("../generated/prisma/enums.js").UserStatus;
                isActive: boolean;
                firstLoginAt: Date | null;
                createdAt: Date;
                updatedAt: Date;
            }[];
            meta: {
                total: number;
                page: number;
                limit: number;
                totalPages: number;
            };
        };
        message: null;
    }>;
    findOne(id: string): Promise<{
        success: boolean;
        data: {
            id: string;
            email: string | null;
            username: string;
            firstName: string;
            lastName: string;
            role: import("../generated/prisma/enums.js").Role;
            domain: import("../generated/prisma/enums.js").Domain | null;
            status: import("../generated/prisma/enums.js").UserStatus;
            isActive: boolean;
            firstLoginAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
        };
        message: null;
    }>;
    update(id: string, dto: UpdateUserDto): Promise<{
        success: boolean;
        data: {
            id: string;
            email: string | null;
            username: string;
            firstName: string;
            lastName: string;
            role: import("../generated/prisma/enums.js").Role;
            domain: import("../generated/prisma/enums.js").Domain | null;
            status: import("../generated/prisma/enums.js").UserStatus;
            isActive: boolean;
            firstLoginAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
        };
        message: string;
    }>;
    remove(id: string): Promise<{
        success: boolean;
        data: null;
        message: string;
    }>;
}
