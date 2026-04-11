var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var MailService_1;
import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
let MailService = MailService_1 = class MailService {
    logger = new Logger(MailService_1.name);
    transporter;
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: process.env.SMTP_SECURE === 'true',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
    }
    async sendWelcomeEmail(payload) {
        const { firstName, lastName, username, email, plainPassword, } = payload;
        const platformUrl = process.env.PLATFORM_URL ?? 'http://localhost:3000';
        const fromName = process.env.SMTP_FROM_NAME ?? 'SMODU Platform';
        const fromEmail = process.env.SMTP_FROM_EMAIL ?? 'no-reply@smodu.ma';
        const templateData = {
            firstName,
            lastName,
            username,
            plainPassword,
            platformUrl,
        };
        const html = this.buildWelcomeHtml(templateData);
        const text = this.buildWelcomeText(templateData);
        try {
            const info = (await this.transporter.sendMail({
                from: `"${fromName}" <${fromEmail}>`,
                to: email,
                subject: 'Bienvenue chez SMODU - Vos identifiants de connexion',
                html,
                text,
            }));
            this.logger.log(`Email de bienvenue envoye a ${email} — MessageId: ${info.messageId}`);
            const previewUrl = nodemailer.getTestMessageUrl(info);
            if (previewUrl) {
                this.logger.log(`Preview Ethereal : ${previewUrl}`);
            }
        }
        catch (error) {
            this.logger.error(`Echec envoi email a ${email} : ${error.message}`);
            throw error;
        }
    }
    buildWelcomeHtml(data) {
        return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Bienvenue chez SMODU</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f4;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <tr>
            <td style="background-color:#1a1a2e;padding:32px 40px;">
              <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:1px;">SMODU</h1>
              <p style="margin:4px 0 0;color:#a0aec0;font-size:13px;">Plateforme d'integration interne</p>
            </td>
          </tr>
          <tr>
            <td style="padding:40px;">
              <p style="margin:0 0 16px;font-size:16px;color:#2d3748;">
                Bonjour <strong>${data.firstName} ${data.lastName}</strong>,
              </p>
              <p style="margin:0 0 24px;font-size:14px;color:#4a5568;line-height:1.6;">
                Votre compte a ete cree sur la plateforme d'integration SMODU.
                Vous pouvez des maintenant vous connecter et commencer votre parcours d'integration Odoo.
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f7fafc;border:1px solid #e2e8f0;border-radius:6px;margin-bottom:24px;">
                <tr>
                  <td style="padding:24px;">
                    <p style="margin:0 0 12px;font-size:13px;font-weight:700;color:#2d3748;text-transform:uppercase;letter-spacing:0.5px;">
                      Vos identifiants de connexion
                    </p>
                    <p style="margin:0 0 8px;font-size:14px;color:#4a5568;">
                      <strong>Identifiant :</strong> ${data.username}
                    </p>
                    <p style="margin:0;font-size:14px;color:#4a5568;">
                      <strong>Mot de passe :</strong> ${data.plainPassword}
                    </p>
                  </td>
                </tr>
              </table>
              <table cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                <tr>
                  <td style="background-color:#1a1a2e;border-radius:6px;">
                    <a
                      href="${data.platformUrl}/login"
                      style="display:inline-block;padding:12px 28px;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;"
                    >
                      Acceder a la plateforme
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin:0;font-size:13px;color:#718096;line-height:1.5;">
                Pour des raisons de securite, ne partagez pas vos identifiants avec des tiers.
              </p>
            </td>
          </tr>
          <tr>
            <td style="background-color:#f7fafc;padding:24px 40px;border-top:1px solid #e2e8f0;">
              <p style="margin:0;font-size:12px;color:#a0aec0;text-align:center;">
                L'equipe SMODU — Ce message est genere automatiquement, merci de ne pas y repondre.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim();
    }
    buildWelcomeText(data) {
        return [
            `Bonjour ${data.firstName} ${data.lastName},`,
            '',
            "Votre compte a ete cree sur la plateforme d'integration SMODU.",
            'Vous pouvez des maintenant vous connecter et commencer votre parcours.',
            '',
            'Vos identifiants de connexion :',
            `  Identifiant  : ${data.username}`,
            `  Mot de passe : ${data.plainPassword}`,
            '',
            `Lien de connexion : ${data.platformUrl}/login`,
            '',
            'Ne partagez pas vos identifiants avec des tiers.',
            '',
            "L'equipe SMODU",
        ].join('\n');
    }
};
MailService = MailService_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], MailService);
export { MailService };
//# sourceMappingURL=mail.service.js.map