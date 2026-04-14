import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
import { CertificationsService } from './certifications.service.js';
import { VerifyCertificationDto } from './dto/verify-certification.dto.js';

interface AuthenticatedUser {
  id: string;
  username: string;
  role: string;
}

interface SubmitResult {
  primaryVerificationStatus: string;
  primaryVerificationNote: string | null;
  message: string;
}

@Controller('certifications')
@UseGuards(JwtAuthGuard)
export class CertificationsController {
  constructor(private readonly certificationsService: CertificationsService) {}

  @Post('submit')
  @UseInterceptors(FileInterceptor('file'))
  async submit(
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    if (!file) {
      return { success: false, message: 'Aucun fichier fourni', data: null };
    }

    const relativePath = file.path
      .replace(process.cwd() + '/', '')
      .replace(process.cwd() + '\\', '');

    const result: SubmitResult =
      await this.certificationsService.submitCertification(
        user.id,
        relativePath,
      );

    return {
      success: result.primaryVerificationStatus === 'PASSED',
      message: result.message,
      data: {
        primaryVerificationStatus: result.primaryVerificationStatus,
        primaryVerificationNote: result.primaryVerificationNote,
      },
    };
  }

  @Get('my-status')
  async getMyStatus(@CurrentUser() user: AuthenticatedUser) {
    const data: unknown = await this.certificationsService.getMyStatus(user.id);
    return { success: true, data, message: null };
  }

  @Get('pending')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  async getPending() {
    const data: unknown =
      await this.certificationsService.getPendingSubmissions();
    return { success: true, data, message: null };
  }

  @Get(':id/pdf')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  async getPdf(@Param('id') id: string) {
    return this.certificationsService.streamPdf(id);
  }

  @Post(':id/verify')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  async verify(
    @Param('id') id: string,
    @Body() dto: VerifyCertificationDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    const result: { message: string } =
      await this.certificationsService.verifySubmission(id, dto, user.username);
    return { success: true, data: result, message: result.message };
  }

  @Get('history')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  async getHistory() {
    return this.certificationsService.getHistory();
  }
}
