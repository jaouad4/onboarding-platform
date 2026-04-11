import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { mkdirSync } from 'fs';
import { Request } from 'express';
import { CertificationsController } from './certifications.controller.js';
import { CertificationsService } from './certifications.service.js';
import { PrismaModule } from '../prisma/prisma.module.js';

interface AuthenticatedRequest extends Request {
  user?: { userId: string };
}

@Module({
  imports: [
    PrismaModule,
    MulterModule.register({
      storage: diskStorage({
        destination: (req: AuthenticatedRequest, file, cb) => {
          const userId = req.user?.userId ?? 'unknown';
          const uploadPath = join(
            process.cwd(),
            'uploads',
            'certifications',
            userId,
          );
          mkdirSync(uploadPath, { recursive: true });
          cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter: (req, file, cb) => {
        if (
          file.mimetype === 'application/pdf' &&
          extname(file.originalname).toLowerCase() === '.pdf'
        ) {
          cb(null, true);
        } else {
          cb(new Error('Seuls les fichiers PDF sont acceptes'), false);
        }
      },
    }),
  ],
  controllers: [CertificationsController],
  providers: [CertificationsService],
})
export class CertificationsModule {}
