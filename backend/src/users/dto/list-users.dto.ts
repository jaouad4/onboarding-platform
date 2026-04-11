import { IsEnum, IsInt, IsOptional, IsPositive, Max } from 'class-validator';
import { Transform } from 'class-transformer';
import { Domain, Role, UserStatus } from '@prisma/client';

export class ListUsersDto {
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @IsPositive()
  page?: number = 1;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
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
