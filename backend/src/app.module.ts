import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module.js';
import { MailModule } from './mail/mail.module.js';
import { AuthModule } from './auth/auth.module.js';
import { UsersModule } from './users/users.module.js';
import { CertificationsModule } from './certifications/certifications.module.js';

@Module({
  imports: [
    PrismaModule,
    MailModule,
    AuthModule,
    UsersModule,
    CertificationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
