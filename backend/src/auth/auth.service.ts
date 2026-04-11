import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service.js';
import * as bcrypt from 'bcrypt';
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

interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ username: dto.identifier }, { email: dto.identifier }],
      },
    });

    if (!user) {
      throw new UnauthorizedException('Identifiants incorrects.');
    }

    if (!user.isActive) {
      throw new UnauthorizedException(
        'Votre compte a ete desactive. Contactez ladministrateur.',
      );
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

    const tokens = this.generateTokens(user as UserRecord);
    return {
      success: true,
      data: {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        user: this.sanitizeUser(user as UserRecord),
      },
      message: 'Connexion reussie.',
    };
  }

  async refresh(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user || !user.isActive) {
      throw new UnauthorizedException(
        'Votre compte a ete desactive. Contactez ladministrateur.',
      );
    }

    const tokens = this.generateTokens(user as UserRecord);
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

  getMe(user: UserRecord) {
    return {
      success: true,
      data: this.sanitizeUser(user),
      message: null,
    };
  }

  private generateTokens(user: UserRecord): TokenPair {
    const payload = { sub: user.id, username: user.username, role: user.role };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET') ?? '',
      expiresIn: '15m',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET') ?? '',
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }

  private sanitizeUser(user: UserRecord): Omit<UserRecord, 'password'> {
    const { password: _, ...sanitized } = user;
    return sanitized;
  }
}
