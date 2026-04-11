import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
interface JwtRefreshPayload {
    sub: string;
    username: string;
}
declare const JwtRefreshStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtRefreshStrategy extends JwtRefreshStrategy_base {
    private configService;
    constructor(configService: ConfigService);
    validate(payload: JwtRefreshPayload): JwtRefreshPayload;
}
export {};
