import { IsEnum, IsInt, IsOptional, IsPositive, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { Domain, Role } from './create-user.dto.js';

export enum UserStatus {
  PENDING_CERTIFICATION = 'PENDING_CERTIFICATION',
  CERTIFICATION_SUBMITTED = 'CERTIFICATION_SUBMITTED',
  CERTIFICATION_VERIFIED = 'CERTIFICATION_VERIFIED',
  READY = 'READY',
}

export class ListUsersDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @Max(100)
  limit?: number = 20;

  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus;

  @IsOptional()
  @IsEnum(Domain)
  domain?: Domain;

  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}
