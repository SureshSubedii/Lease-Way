import { IsEmail, IsString } from 'class-validator';

export class UserDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;

  @IsString()
  readonly fullName: string;
}
