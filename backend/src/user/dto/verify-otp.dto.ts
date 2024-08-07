import { IsNumber, IsString } from 'class-validator';
import { UserRole } from '../user.entity';

export class VerifyOtpDto {
  @IsString()
  readonly address: string;

  @IsString()
  readonly contact: string;

  @IsString()
  readonly otp: string;

  @IsNumber()
  readonly uid: number;

  @IsString()
  readonly role: UserRole;
}
