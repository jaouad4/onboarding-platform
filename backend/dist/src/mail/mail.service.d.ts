export interface WelcomeEmailPayload {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    plainPassword: string;
}
export declare class MailService {
    private readonly logger;
    private readonly transporter;
    constructor();
    sendWelcomeEmail(payload: WelcomeEmailPayload): Promise<void>;
    private buildWelcomeHtml;
    private buildWelcomeText;
}
