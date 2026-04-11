import { PrismaService } from '../prisma/prisma.service.js';
import { MailService } from '../mail/mail.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { ListUsersDto } from './dto/list-users.dto.js';
export declare class UsersService {
    private readonly prisma;
    private readonly mailService;
    private readonly logger;
    constructor(prisma: PrismaService, mailService: MailService);
    create(dto: CreateUserDto): Promise<{
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
    }>;
    findAll(dto: ListUsersDto): Promise<{
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
    }>;
    findOne(id: string): Promise<{
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
    }>;
    update(id: string, dto: UpdateUserDto): Promise<{
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
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
