var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var UsersService_1;
import { ConflictException, Injectable, Logger, NotFoundException, } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { MailService } from '../mail/mail.service.js';
import * as bcrypt from 'bcrypt';
import { UserStatus } from '@prisma/client';
let UsersService = UsersService_1 = class UsersService {
    prisma;
    mailService;
    logger = new Logger(UsersService_1.name);
    constructor(prisma, mailService) {
        this.prisma = prisma;
        this.mailService = mailService;
    }
    async create(dto) {
        const existing = await this.prisma.user.findUnique({
            where: { username: dto.username },
        });
        if (existing) {
            throw new ConflictException('Ce nom d\'utilisateur est deja utilise');
        }
        if (dto.email) {
            const emailExists = await this.prisma.user.findUnique({
                where: { email: dto.email },
            });
            if (emailExists) {
                throw new ConflictException('Cet email est deja utilise');
            }
        }
        const plainPassword = dto.password;
        const hashedPassword = await bcrypt.hash(plainPassword, 12);
        const user = await this.prisma.user.create({
            data: {
                firstName: dto.firstName,
                lastName: dto.lastName,
                username: dto.username,
                password: hashedPassword,
                email: dto.email ?? null,
                domain: dto.domain,
                role: dto.role ?? 'USER',
                status: UserStatus.PENDING_CERTIFICATION,
                isActive: true,
            },
        });
        if (user.email) {
            try {
                await this.mailService.sendWelcomeEmail(user, plainPassword);
            }
            catch (error) {
                this.logger.warn(`Echec de l'envoi de l'email de bienvenue pour l'utilisateur ${user.username}: ${error.message}`);
            }
        }
        else {
            this.logger.log(`Aucun email renseigne pour l'utilisateur ${user.username}. Email de bienvenue non envoye.`);
        }
        const { password: _, ...result } = user;
        return result;
    }
    async findAll(dto) {
        const { page = 1, limit = 20, status, domain, role } = dto;
        const skip = (page - 1) * limit;
        const where = {};
        if (status)
            where.status = status;
        if (domain)
            where.domain = domain;
        if (role)
            where.role = role;
        const [users, total] = await this.prisma.$transaction([
            this.prisma.user.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    username: true,
                    email: true,
                    role: true,
                    domain: true,
                    status: true,
                    isActive: true,
                    firstLoginAt: true,
                    createdAt: true,
                    updatedAt: true,
                },
            }),
            this.prisma.user.count({ where }),
        ]);
        return {
            data: users,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async findOne(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                username: true,
                email: true,
                role: true,
                domain: true,
                status: true,
                isActive: true,
                firstLoginAt: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        if (!user) {
            throw new NotFoundException('Utilisateur introuvable');
        }
        return user;
    }
    async update(id, dto) {
        await this.findOne(id);
        if (dto.username) {
            const conflict = await this.prisma.user.findFirst({
                where: { username: dto.username, NOT: { id } },
            });
            if (conflict) {
                throw new ConflictException('Ce nom d\'utilisateur est deja utilise');
            }
        }
        if (dto.email) {
            const conflict = await this.prisma.user.findFirst({
                where: { email: dto.email, NOT: { id } },
            });
            if (conflict) {
                throw new ConflictException('Cet email est deja utilise');
            }
        }
        const data = { ...dto };
        if (dto.password) {
            data.password = await bcrypt.hash(dto.password, 12);
        }
        const updated = await this.prisma.user.update({
            where: { id },
            data,
            select: {
                id: true,
                firstName: true,
                lastName: true,
                username: true,
                email: true,
                role: true,
                domain: true,
                status: true,
                isActive: true,
                firstLoginAt: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        return updated;
    }
    async remove(id) {
        await this.findOne(id);
        await this.prisma.user.update({
            where: { id },
            data: { isActive: false },
        });
        return { message: 'Utilisateur desactive avec succes' };
    }
};
UsersService = UsersService_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        MailService])
], UsersService);
export { UsersService };
//# sourceMappingURL=users.service.js.map