import { IsEnum, IsOptional, IsString } from 'class-validator';

export enum VerificationDecision {
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export class VerifyCertificationDto {
  @IsEnum(VerificationDecision)
  decision!: VerificationDecision;

  @IsOptional()
  @IsString()
  note?: string;
}
