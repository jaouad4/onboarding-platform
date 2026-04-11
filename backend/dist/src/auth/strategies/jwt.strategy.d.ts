import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service.js';
interface JwtPayload {
    sub: string;
    username: string;
    role: string;
}
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    private prisma;
    constructor(configService: ConfigService, prisma: PrismaService);
    validate(payload: JwtPayload): Promise<{
        id: string;
        email: string | null;
        username: string;
        password: string;
        firstName: string;
        lastName: string;
        role: import("../../generated/prisma/enums.js").Role;
        domain: import("../../generated/prisma/enums.js").Domain | null;
        status: import("../../generated/prisma/enums.js").UserStatus;
        isActive: boolean;
        firstLoginAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
export {};
