import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { MailService } from '../mail/mail.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { ListUsersDto } from './dto/list-users.dto.js';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly mailService: MailService,
  ) {}

  async create(dto: CreateUserDto) {
    const existing = await this.prisma.user.findUnique({
      where: { username: dto.username },
    });

    if (existing) {
      throw new ConflictException("Ce nom d'utilisateur est deja utilise");
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
        status: 'PENDING_CERTIFICATION',
        isActive: true,
      },
    });

    if (user.email) {
      try {
        await this.mailService.sendWelcomeEmail({
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          email: user.email,
          plainPassword,
        });
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        this.logger.warn(
          `Echec de l'envoi de l'email de bienvenue pour l'utilisateur ${user.username}: ${message}`,
        );
      }
    } else {
      this.logger.log(
        `Aucun email renseigne pour l'utilisateur ${user.username}. Email de bienvenue non envoye.`,
      );
    }

    const { password: _pw, ...result } = user;
    void _pw;
    return result;
  }

  async findAll(dto: ListUsersDto) {
    const { page = 1, limit = 20, status, domain, role } = dto;
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};
    if (status) where.status = status;
    if (domain) where.domain = domain;
    if (role) where.role = role;

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

  async findOne(id: string) {
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

  async update(id: string, dto: UpdateUserDto) {
    await this.findOne(id);

    if (dto.username) {
      const conflict = await this.prisma.user.findFirst({
        where: { username: dto.username, NOT: { id } },
      });
      if (conflict) {
        throw new ConflictException("Ce nom d'utilisateur est deja utilise");
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

    const data: Record<string, unknown> = { ...dto };

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

  async remove(id: string) {
    await this.findOne(id);

    await this.prisma.user.update({
      where: { id },
      data: { isActive: false },
    });

    return { message: 'Utilisateur desactive avec succes' };
  }
}
