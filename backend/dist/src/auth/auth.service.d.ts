import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service.js';
import { LoginDto } from './dto/login.dto.js';
export interface UserRecord {
    id: string;
    username: string;
    email: string | null;
    firstName: string;
    lastName: string;
    role: string;
    domain: string | null;
    status: string;
    isActive: boolean;
    firstLoginAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    password: string;
}
export declare class AuthService {
    private prisma;
    private jwtService;
    private configService;
    constructor(prisma: PrismaService, jwtService: JwtService, configService: ConfigService);
    login(dto: LoginDto): Promise<{
        success: boolean;
        data: {
            accessToken: string;
            refreshToken: string;
            user: Omit<UserRecord, "password">;
        };
        message: string;
    }>;
    refresh(userId: string): Promise<{
        success: boolean;
        data: {
            accessToken: string;
            refreshToken: string;
        };
        message: string;
    }>;
    logout(): {
        success: boolean;
        data: null;
        message: string;
    };
    getMe(user: UserRecord): {
        success: boolean;
        data: Omit<UserRecord, "password">;
        message: null;
    };
    private generateTokens;
    private sanitizeUser;
}
