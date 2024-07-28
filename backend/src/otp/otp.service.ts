import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Otp } from './otp.entity';
import { Repository } from 'typeorm';
import { totp, authenticator } from 'otplib';
import { User } from 'src/user/user.entity';

@Injectable()
export class OtpService {
  constructor(
    @InjectRepository(Otp) private readonly otpRepo: Repository<Otp>,
  ) {
    totp.options = {
      step: 120,
      window: 1,
    };
  }

  async generateOtp(user_id: User): Promise<string> {
    const secret = authenticator.generateSecret();
    const otp = totp.generate(secret);
    const newOtp =
      (await this.otpRepo.findOneBy({ user_id: { id: user_id.id } })) ||
      this.otpRepo.create();
    newOtp.user_id = user_id;
    newOtp.otp_secret = secret;
    await this.otpRepo.save(newOtp);

    return otp;
  }
  async verifyOtp(token: string, uid: User): Promise<boolean> {
    const secret = await this.otpRepo.findOneBy({ user_id: uid });
    return totp.check(token, secret.otp_secret);
  }
}
