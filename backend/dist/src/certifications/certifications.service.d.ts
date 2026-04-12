import { StreamableFile } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { VerifyCertificationDto } from './dto/verify-certification.dto.js';
interface SubmitResult {
    primaryVerificationStatus: string;
    primaryVerificationNote: string | null;
    message: string;
}
export declare class CertificationsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private removeDiacritics;
    submitCertification(userId: string, filePath: string): Promise<SubmitResult>;
    getMyStatus(userId: string): Promise<{
        status: import("../generated/prisma/enums.js").UserStatus;
        domain: import("../generated/prisma/enums.js").Domain | null;
        firstLoginAt: Date | null;
        timer: {
            timerElapsed: boolean;
            remainingMs: number | null;
        };
        latestSubmission: {
            submittedAt: Date;
            primaryVerificationStatus: import("../generated/prisma/enums.js").PrimaryVerificationStatus;
            primaryVerificationNote: string | null;
            adminVerificationStatus: import("../generated/prisma/enums.js").AdminVerificationStatus;
            adminVerificationNote: string | null;
        } | null;
    }>;
    getPendingSubmissions(): Promise<({
        user: {
            username: string;
            firstName: string;
            lastName: string;
            domain: import("../generated/prisma/enums.js").Domain | null;
        };
    } & {
        id: string;
        userId: string;
        pdfStoragePath: string;
        submittedAt: Date;
        primaryVerificationStatus: import("../generated/prisma/enums.js").PrimaryVerificationStatus;
        primaryVerificationNote: string | null;
        adminVerificationStatus: import("../generated/prisma/enums.js").AdminVerificationStatus;
        adminVerificationNote: string | null;
        verifiedAt: Date | null;
        verifiedBy: string | null;
    })[]>;
    streamPdf(submissionId: string): Promise<StreamableFile>;
    verifySubmission(submissionId: string, dto: VerifyCertificationDto, adminUsername: string): Promise<{
        message: string;
    }>;
}
export {};
