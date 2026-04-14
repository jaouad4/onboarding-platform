import { CertificationsService } from './certifications.service.js';
import { VerifyCertificationDto } from './dto/verify-certification.dto.js';
interface AuthenticatedUser {
    id: string;
    username: string;
    role: string;
}
export declare class CertificationsController {
    private readonly certificationsService;
    constructor(certificationsService: CertificationsService);
    submit(file: Express.Multer.File, user: AuthenticatedUser): Promise<{
        success: boolean;
        message: string;
        data: null;
    } | {
        success: boolean;
        message: string;
        data: {
            primaryVerificationStatus: string;
            primaryVerificationNote: string | null;
        };
    }>;
    getMyStatus(user: AuthenticatedUser): Promise<{
        success: boolean;
        data: unknown;
        message: null;
    }>;
    getPending(): Promise<{
        success: boolean;
        data: unknown;
        message: null;
    }>;
    getPdf(id: string): Promise<import("@nestjs/common").StreamableFile>;
    verify(id: string, dto: VerifyCertificationDto, user: AuthenticatedUser): Promise<{
        success: boolean;
        data: {
            message: string;
        };
        message: string;
    }>;
    getHistory(): Promise<{
        success: boolean;
        data: ({
            user: {
                id: string;
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
        message: string;
    }>;
}
export {};
