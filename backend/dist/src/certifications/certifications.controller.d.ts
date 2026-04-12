import { CertificationsService } from './certifications.service.js';
import { VerifyCertificationDto } from './dto/verify-certification.dto.js';
interface JwtPayload {
    userId: string;
    username: string;
    role: string;
}
export declare class CertificationsController {
    private readonly certificationsService;
    constructor(certificationsService: CertificationsService);
    submit(file: Express.Multer.File, user: JwtPayload): Promise<{
        success: boolean;
        message: string;
        data: null;
    } | {
        success: boolean;
        message: string;
        data: {
            primaryVerificationStatus: string;
        };
    }>;
    getMyStatus(user: JwtPayload): Promise<{
        success: boolean;
        data: {
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
        };
        message: null;
    }>;
    getPending(): Promise<{
        success: boolean;
        data: ({
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
        })[];
        message: null;
    }>;
    getPdf(id: string): Promise<import("@nestjs/common").StreamableFile>;
    verify(id: string, dto: VerifyCertificationDto, user: JwtPayload): Promise<{
        success: boolean;
        data: {
            message: string;
        };
        message: string;
    }>;
}
export {};
