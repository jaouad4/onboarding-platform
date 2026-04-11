import { AuthService, UserRecord } from './auth.service.js';
import { LoginDto } from './dto/login.dto.js';
interface JwtRefreshUser {
    sub: string;
    username: string;
}
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(dto: LoginDto): Promise<{
        success: boolean;
        data: {
            accessToken: string;
            refreshToken: string;
            user: Omit<UserRecord, "password">;
        };
        message: string;
    }>;
    refresh(user: JwtRefreshUser): Promise<{
        success: boolean;
        data: {
            accessToken: string;
            refreshToken: string;
        };
        message: string;
    }>;
    logout(): {
        success: boolean;
        data: null;
        message: string;
    };
    getMe(user: UserRecord): {
        success: boolean;
        data: Omit<UserRecord, "password">;
        message: null;
    };
}
export {};
