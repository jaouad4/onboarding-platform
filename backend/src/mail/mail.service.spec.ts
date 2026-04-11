import { MailService } from './mail.service.js';

async function testEmail() {
  // Génère un compte Ethereal temporaire
  const nodemailer = await import('nodemailer');
  const testAccount = await nodemailer.createTestAccount();

  process.env.SMTP_HOST = testAccount.smtp.host;
  process.env.SMTP_PORT = String(testAccount.smtp.port);
  process.env.SMTP_SECURE = String(testAccount.smtp.secure);
  process.env.SMTP_USER = testAccount.user;
  process.env.SMTP_PASS = testAccount.pass;
  process.env.SMTP_FROM_NAME = 'SMODU Platform';
  process.env.SMTP_FROM_EMAIL = 'no-reply@smodu.ma';
  process.env.PLATFORM_URL = 'http://localhost:3000';

  const service = new MailService();

  await service.sendWelcomeEmail({
    firstName: 'Jaouad',
    lastName: 'Test',
    username: 'jaouad.test',
    email: testAccount.user,
    plainPassword: 'MonMotDePasse123',
  });
}

testEmail().catch(console.error);
