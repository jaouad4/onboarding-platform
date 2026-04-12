var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Body, Controller, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors, } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
import { CertificationsService } from './certifications.service.js';
import { VerifyCertificationDto } from './dto/verify-certification.dto.js';
let CertificationsController = class CertificationsController {
    certificationsService;
    constructor(certificationsService) {
        this.certificationsService = certificationsService;
    }
    async submit(file, user) {
        if (!file) {
            return { success: false, message: 'Aucun fichier fourni', data: null };
        }
        const relativePath = file.path
            .replace(process.cwd() + '/', '')
            .replace(process.cwd() + '\\', '');
        const result = await this.certificationsService.submitCertification(user.id, relativePath);
        return {
            success: result.primaryVerificationStatus === 'PASSED',
            message: result.message,
            data: {
                primaryVerificationStatus: result.primaryVerificationStatus,
                primaryVerificationNote: result.primaryVerificationNote,
            },
        };
    }
    async getMyStatus(user) {
        const data = await this.certificationsService.getMyStatus(user.id);
        return { success: true, data, message: null };
    }
    async getPending() {
        const data = await this.certificationsService.getPendingSubmissions();
        return { success: true, data, message: null };
    }
    async getPdf(id) {
        return this.certificationsService.streamPdf(id);
    }
    async verify(id, dto, user) {
        const result = await this.certificationsService.verifySubmission(id, dto, user.username);
        return { success: true, data: result, message: result.message };
    }
};
__decorate([
    Post('submit'),
    UseInterceptors(FileInterceptor('file')),
    __param(0, UploadedFile()),
    __param(1, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CertificationsController.prototype, "submit", null);
__decorate([
    Get('my-status'),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CertificationsController.prototype, "getMyStatus", null);
__decorate([
    Get('pending'),
    UseGuards(RolesGuard),
    Roles('ADMIN'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CertificationsController.prototype, "getPending", null);
__decorate([
    Get(':id/pdf'),
    UseGuards(RolesGuard),
    Roles('ADMIN'),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CertificationsController.prototype, "getPdf", null);
__decorate([
    Post(':id/verify'),
    UseGuards(RolesGuard),
    Roles('ADMIN'),
    __param(0, Param('id')),
    __param(1, Body()),
    __param(2, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, VerifyCertificationDto, Object]),
    __metadata("design:returntype", Promise)
], CertificationsController.prototype, "verify", null);
CertificationsController = __decorate([
    Controller('certifications'),
    UseGuards(JwtAuthGuard),
    __metadata("design:paramtypes", [CertificationsService])
], CertificationsController);
export { CertificationsController };
//# sourceMappingURL=certifications.controller.js.map