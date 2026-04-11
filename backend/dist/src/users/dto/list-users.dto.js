var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsEnum, IsInt, IsOptional, IsPositive, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { Domain, Role } from './create-user.dto.js';
export var UserStatus;
(function (UserStatus) {
    UserStatus["PENDING_CERTIFICATION"] = "PENDING_CERTIFICATION";
    UserStatus["CERTIFICATION_SUBMITTED"] = "CERTIFICATION_SUBMITTED";
    UserStatus["CERTIFICATION_VERIFIED"] = "CERTIFICATION_VERIFIED";
    UserStatus["READY"] = "READY";
})(UserStatus || (UserStatus = {}));
export class ListUsersDto {
    page = 1;
    limit = 20;
    status;
    domain;
    role;
}
__decorate([
    IsOptional(),
    Type(() => Number),
    IsInt(),
    IsPositive(),
    __metadata("design:type", Number)
], ListUsersDto.prototype, "page", void 0);
__decorate([
    IsOptional(),
    Type(() => Number),
    IsInt(),
    IsPositive(),
    Max(100),
    __metadata("design:type", Number)
], ListUsersDto.prototype, "limit", void 0);
__decorate([
    IsOptional(),
    IsEnum(UserStatus),
    __metadata("design:type", String)
], ListUsersDto.prototype, "status", void 0);
__decorate([
    IsOptional(),
    IsEnum(Domain),
    __metadata("design:type", String)
], ListUsersDto.prototype, "domain", void 0);
__decorate([
    IsOptional(),
    IsEnum(Role),
    __metadata("design:type", String)
], ListUsersDto.prototype, "role", void 0);
//# sourceMappingURL=list-users.dto.js.map