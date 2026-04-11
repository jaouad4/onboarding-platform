import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export enum Domain {
  TECHNIQUE = 'TECHNIQUE',
  COMMERCE = 'COMMERCE',
  MARKETING = 'MARKETING',
  FINANCE = 'FINANCE',
  RH = 'RH',
}

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @IsString()
  @IsNotEmpty()
  username!: string;

  @IsString()
  @MinLength(8)
  password!: string;

  @IsOptional()
  @IsEmail()
  @Matches(/^[^@]+@smodu\.ma$/, {
    message: "L'email doit se terminer par @smodu.ma",
  })
  email?: string;

  @IsEnum(Domain)
  @IsNotEmpty()
  domain!: Domain;

  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}
