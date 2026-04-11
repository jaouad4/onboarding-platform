var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service.js';
import * as bcrypt from 'bcrypt';
let AuthService = class AuthService {
    prisma;
    jwtService;
    configService;
    constructor(prisma, jwtService, configService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async login(dto) {
        const user = await this.prisma.user.findFirst({
            where: {
                OR: [{ username: dto.identifier }, { email: dto.identifier }],
            },
        });
        if (!user) {
            throw new UnauthorizedException('Identifiants incorrects.');
        }
        if (!user.isActive) {
            throw new UnauthorizedException('Votre compte a ete desactive. Contactez ladministrateur.');
        }
        const passwordMatch = await bcrypt.compare(dto.password, user.password);
        if (!passwordMatch) {
            throw new UnauthorizedException('Identifiants incorrects.');
        }
        if (!user.firstLoginAt) {
            await this.prisma.user.update({
                where: { id: user.id },
                data: { firstLoginAt: new Date() },
            });
        }
        const tokens = this.generateTokens(user);
        return {
            success: true,
            data: {
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken,
                user: this.sanitizeUser(user),
            },
            message: 'Connexion reussie.',
        };
    }
    async refresh(userId) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user || !user.isActive) {
            throw new UnauthorizedException('Votre compte a ete desactive. Contactez ladministrateur.');
        }
        const tokens = this.generateTokens(user);
        return {
            success: true,
            data: {
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken,
            },
            message: 'Token rafraichi avec succes.',
        };
    }
    logout() {
        return {
            success: true,
            data: null,
            message: 'Deconnexion reussie.',
        };
    }
    getMe(user) {
        return {
            success: true,
            data: this.sanitizeUser(user),
            message: null,
        };
    }
    generateTokens(user) {
        const payload = { sub: user.id, username: user.username, role: user.role };
        const accessToken = this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_SECRET') ?? '',
            expiresIn: '15m',
        });
        const refreshToken = this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_REFRESH_SECRET') ?? '',
            expiresIn: '7d',
        });
        return { accessToken, refreshToken };
    }
    sanitizeUser(user) {
        const { password: _, ...sanitized } = user;
        return sanitized;
    }
};
AuthService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        JwtService,
        ConfigService])
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map