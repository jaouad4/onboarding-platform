import { IsOptional } from 'class-validator';

export class SubmitCertificationDto {
  @IsOptional()
  note?: string;
}
