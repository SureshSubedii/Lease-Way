import { IsNumber, IsString } from 'class-validator';

export class VerifyOtpDto {
  @IsString()
  readonly address: string;

  @IsString()
  readonly contact: string;

  @IsString()
  readonly otp: string;

  @IsNumber()
  readonly uid: number;
}
