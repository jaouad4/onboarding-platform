var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BadRequestException, ForbiddenException, Injectable, NotFoundException, StreamableFile, } from '@nestjs/common';
import { join } from 'path';
import { createReadStream, existsSync, readFileSync } from 'fs';
import { PrismaService } from '../prisma/prisma.service.js';
import { VerificationDecision, } from './dto/verify-certification.dto.js';
async function parsePdf(dataBuffer) {
    const mod = await import('pdf-parse');
    const parse = mod;
    return parse(dataBuffer);
}
let CertificationsService = class CertificationsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    removeDiacritics(str) {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }
    async submitCertification(userId, filePath) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new NotFoundException('Utilisateur introuvable');
        }
        if (!user.firstLoginAt) {
            throw new ForbiddenException('Aucune date de premier login enregistree');
        }
        const msElapsed = Date.now() - user.firstLoginAt.getTime();
        const daysElapsed = msElapsed / (1000 * 60 * 60 * 24);
        if (daysElapsed < 5) {
            const remaining = 5 - daysElapsed;
            const days = Math.floor(remaining);
            const hours = Math.floor((remaining - days) * 24);
            throw new ForbiddenException(`Vous devez attendre encore ${days} jour(s) et ${hours} heure(s) avant de soumettre votre certificat`);
        }
        const existing = await this.prisma.certificationSubmission.findFirst({
            where: {
                userId,
                primaryVerificationStatus: 'PASSED',
                adminVerificationStatus: 'PENDING',
            },
        });
        if (existing) {
            throw new BadRequestException('Une soumission est deja en cours de verification');
        }
        const fullPath = join(process.cwd(), filePath);
        const dataBuffer = readFileSync(fullPath);
        const pdfData = await parsePdf(dataBuffer);
        const pdfText = this.removeDiacritics(pdfData.text.toLowerCase());
        const firstName = this.removeDiacritics(user.firstName.toLowerCase());
        const lastName = this.removeDiacritics(user.lastName.toLowerCase());
        const nameFound = pdfText.includes(firstName) && pdfText.includes(lastName);
        if (nameFound) {
            await this.prisma.certificationSubmission.create({
                data: {
                    userId,
                    pdfStoragePath: filePath,
                    primaryVerificationStatus: 'PASSED',
                    adminVerificationStatus: 'PENDING',
                },
            });
            await this.prisma.user.update({
                where: { id: userId },
                data: { status: 'CERTIFICATION_SUBMITTED' },
            });
            return {
                primaryVerificationStatus: 'PASSED',
                message: 'Votre certificat a ete soumis avec succes et est en cours de verification par un administrateur',
            };
        }
        await this.prisma.certificationSubmission.create({
            data: {
                userId,
                pdfStoragePath: filePath,
                primaryVerificationStatus: 'FAILED',
                adminVerificationStatus: 'PENDING',
                primaryVerificationNote: "Le nom complet de l'utilisateur n'a pas ete trouve dans le certificat",
            },
        });
        return {
            primaryVerificationStatus: 'FAILED',
            message: 'Le nom sur le certificat ne correspond pas a votre nom enregistre. Veuillez soumettre le bon certificat',
        };
    }
    async getMyStatus(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                status: true,
                domain: true,
                firstLoginAt: true,
            },
        });
        if (!user) {
            throw new NotFoundException('Utilisateur introuvable');
        }
        const latestSubmission = await this.prisma.certificationSubmission.findFirst({
            where: { userId },
            orderBy: { submittedAt: 'desc' },
            select: {
                primaryVerificationStatus: true,
                primaryVerificationNote: true,
                adminVerificationStatus: true,
                adminVerificationNote: true,
                submittedAt: true,
            },
        });
        let timerInfo = {
            timerElapsed: true,
            remainingMs: null,
        };
        if (user.firstLoginAt) {
            const msElapsed = Date.now() - user.firstLoginAt.getTime();
            const fiveDaysMs = 5 * 24 * 60 * 60 * 1000;
            if (msElapsed < fiveDaysMs) {
                timerInfo = {
                    timerElapsed: false,
                    remainingMs: fiveDaysMs - msElapsed,
                };
            }
        }
        return {
            status: user.status,
            domain: user.domain,
            firstLoginAt: user.firstLoginAt,
            timer: timerInfo,
            latestSubmission,
        };
    }
    async getPendingSubmissions() {
        return this.prisma.certificationSubmission.findMany({
            where: {
                primaryVerificationStatus: 'PASSED',
                adminVerificationStatus: 'PENDING',
            },
            include: {
                user: {
                    select: {
                        firstName: true,
                        lastName: true,
                        username: true,
                        domain: true,
                    },
                },
            },
            orderBy: { submittedAt: 'asc' },
        });
    }
    async streamPdf(submissionId) {
        const submission = await this.prisma.certificationSubmission.findUnique({
            where: { id: submissionId },
        });
        if (!submission) {
            throw new NotFoundException('Soumission introuvable');
        }
        const fullPath = join(process.cwd(), submission.pdfStoragePath);
        if (!existsSync(fullPath)) {
            throw new NotFoundException('Fichier PDF introuvable sur le serveur');
        }
        const stream = createReadStream(fullPath);
        return new StreamableFile(stream, {
            type: 'application/pdf',
            disposition: 'inline',
        });
    }
    async verifySubmission(submissionId, dto, adminUsername) {
        const submission = await this.prisma.certificationSubmission.findUnique({
            where: { id: submissionId },
            include: { user: true },
        });
        if (!submission) {
            throw new NotFoundException('Soumission introuvable');
        }
        if (submission.adminVerificationStatus !== 'PENDING') {
            throw new BadRequestException('Cette soumission a deja ete traitee');
        }
        if (dto.decision === VerificationDecision.APPROVED) {
            await this.prisma.certificationSubmission.update({
                where: { id: submissionId },
                data: {
                    adminVerificationStatus: 'APPROVED',
                    adminVerificationNote: dto.note ?? null,
                    verifiedAt: new Date(),
                    verifiedBy: adminUsername,
                },
            });
            await this.prisma.user.update({
                where: { id: submission.userId },
                data: { status: 'CERTIFICATION_VERIFIED' },
            });
            return {
                message: "Certification approuvee. Le domaine de l'utilisateur est maintenant visible",
            };
        }
        await this.prisma.certificationSubmission.update({
            where: { id: submissionId },
            data: {
                adminVerificationStatus: 'REJECTED',
                adminVerificationNote: dto.note ?? null,
                verifiedAt: new Date(),
                verifiedBy: adminUsername,
            },
        });
        await this.prisma.user.update({
            where: { id: submission.userId },
            data: { status: 'PENDING_CERTIFICATION' },
        });
        return {
            message: "Certification rejetee. L'utilisateur peut re-soumettre son certificat",
        };
    }
};
CertificationsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], CertificationsService);
export { CertificationsService };
//# sourceMappingURL=certifications.service.js.map