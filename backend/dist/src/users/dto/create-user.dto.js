var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Matches, MinLength, } from 'class-validator';
import { Domain, Role } from '@prisma/client';
export class CreateUserDto {
    firstName;
    lastName;
    username;
    password;
    email;
    domain;
    role;
}
__decorate([
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "firstName", void 0);
__decorate([
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "lastName", void 0);
__decorate([
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "username", void 0);
__decorate([
    IsString(),
    MinLength(8),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    IsOptional(),
    IsEmail(),
    Matches(/^[^@]+@smodu\.ma$/, {
        message: 'L\'email doit se terminer par @smodu.ma',
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    IsEnum(Domain),
    IsNotEmpty(),
    __metadata("design:type", typeof (_a = typeof Domain !== "undefined" && Domain) === "function" ? _a : Object)
], CreateUserDto.prototype, "domain", void 0);
__decorate([
    IsOptional(),
    IsEnum(Role),
    __metadata("design:type", typeof (_b = typeof Role !== "undefined" && Role) === "function" ? _b : Object)
], CreateUserDto.prototype, "role", void 0);
//# sourceMappingURL=create-user.dto.js.map