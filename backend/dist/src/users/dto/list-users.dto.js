var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
import { IsEnum, IsInt, IsOptional, IsPositive, Max } from 'class-validator';
import { Transform } from 'class-transformer';
import { Domain, Role, UserStatus } from '@prisma/client';
export class ListUsersDto {
    page = 1;
    limit = 20;
    status;
    domain;
    role;
}
__decorate([
    IsOptional(),
    Transform(({ value }) => parseInt(value, 10)),
    IsInt(),
    IsPositive(),
    __metadata("design:type", Number)
], ListUsersDto.prototype, "page", void 0);
__decorate([
    IsOptional(),
    Transform(({ value }) => parseInt(value, 10)),
    IsInt(),
    IsPositive(),
    Max(100),
    __metadata("design:type", Number)
], ListUsersDto.prototype, "limit", void 0);
__decorate([
    IsOptional(),
    IsEnum(UserStatus),
    __metadata("design:type", typeof (_a = typeof UserStatus !== "undefined" && UserStatus) === "function" ? _a : Object)
], ListUsersDto.prototype, "status", void 0);
__decorate([
    IsOptional(),
    IsEnum(Domain),
    __metadata("design:type", typeof (_b = typeof Domain !== "undefined" && Domain) === "function" ? _b : Object)
], ListUsersDto.prototype, "domain", void 0);
__decorate([
    IsOptional(),
    IsEnum(Role),
    __metadata("design:type", typeof (_c = typeof Role !== "undefined" && Role) === "function" ? _c : Object)
], ListUsersDto.prototype, "role", void 0);
//# sourceMappingURL=list-users.dto.js.map