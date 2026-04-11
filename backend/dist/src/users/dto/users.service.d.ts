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
    create(dto: CreateUserDto): Promise<any>;
    findAll(dto: ListUsersDto): Promise<{
        data: any;
        meta: {
            total: any;
            page: ListUsersDto;
            limit: ListUsersDto;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<any>;
    update(id: string, dto: UpdateUserDto): Promise<any>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
