var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { mkdirSync } from 'fs';
import { CertificationsController } from './certifications.controller.js';
import { CertificationsService } from './certifications.service.js';
import { PrismaModule } from '../prisma/prisma.module.js';
let CertificationsModule = class CertificationsModule {
};
CertificationsModule = __decorate([
    Module({
        imports: [
            PrismaModule,
            MulterModule.register({
                storage: diskStorage({
                    destination: (req, file, cb) => {
                        const user = req.user;
                        const userId = user?.userId ?? 'unknown';
                        const uploadPath = join(process.cwd(), 'uploads', 'certifications', userId);
                        mkdirSync(uploadPath, { recursive: true });
                        cb(null, uploadPath);
                    },
                    filename: (req, file, cb) => {
                        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                        cb(null, uniqueSuffix + extname(file.originalname));
                    },
                }),
                limits: { fileSize: 5 * 1024 * 1024 },
                fileFilter: (req, file, cb) => {
                    if (file.mimetype === 'application/pdf' &&
                        extname(file.originalname).toLowerCase() === '.pdf') {
                        cb(null, true);
                    }
                    else {
                        cb(new Error('Seuls les fichiers PDF sont acceptes'), false);
                    }
                },
            }),
        ],
        controllers: [CertificationsController],
        providers: [CertificationsService],
    })
], CertificationsModule);
export { CertificationsModule };
//# sourceMappingURL=certifications.module.js.map