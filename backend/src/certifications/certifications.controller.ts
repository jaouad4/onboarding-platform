import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
import { CertificationsService } from './certifications.service.js';
import { VerifyCertificationDto } from './dto/verify-certification.dto.js';

@Controller('api/v1/certifications')
@UseGuards(JwtAuthGuard)
export class CertificationsController {
  constructor(
    private readonly certificationsService: CertificationsService,
  ) {}

  @Post('submit')
  @UseInterceptors(FileInterceptor('file'))
  async submit(
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: any,
  ) {
    if (!file) {
      return { success: false, message: 'Aucun fichier fourni', data: null };
    }

    const relativePath = file.path.replace(process.cwd() + '/', '').replace(process.cwd() + '\\', '');

    const result = await this.certificationsService.submitCertification(
      user.userId,
      relativePath,
    );

    return {
      success: result.primaryVerificationStatus === 'PASSED',
      message: result.message,
      data: { primaryVerificationStatus: result.primaryVerificationStatus },
    };
  }

  @Get('my-status')
  async getMyStatus(@CurrentUser() user: any) {
    const data = await this.certificationsService.getMyStatus(user.userId);
    return { success: true, data, message: null };
  }

  @Get('pending')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  async getPending() {
    const data = await this.certificationsService.getPendingSubmissions();
    return { success: true, data, message: null };
  }

  @Get(':id/pdf')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  async getPdf(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.certificationsService.streamPdf(id);
  }

  @Post(':id/verify')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  async verify(
    @Param('id') id: string,
    @Body() dto: VerifyCertificationDto,
    @CurrentUser() user: any,
  ) {
    const data = await this.certificationsService.verifySubmission(
      id,
      dto,
      user.username,
    );
    return { success: true, data, message: data.message };
  }
}
