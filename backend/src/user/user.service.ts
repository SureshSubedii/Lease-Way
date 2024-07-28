import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { MailService } from 'src/mail/mail.service';
import { OtpService } from 'src/otp/otp.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly mailservice: MailService,
    private readonly otpService: OtpService,
  ) {}

  async signup(body: UserDto): Promise<Record<string, string>> {
    const user =
      (await this.userRepo.findOne({ where: { email: body.email } })) ||
      this.userRepo.create();

    user.full_name = body.fullName;
    user.email = body.email;
    user.password = await bcrypt.hash(body.password, 10);
    await this.userRepo.save(user);
    const otp = await this.otpService.generateOtp(user);
    this.mailservice.sendMail(user.email, otp);
    return {
      message: `OTP sent to the mail address. Enter OTP  to verify at the  given url`,
      url: 'http://localhost:5000/api/verify_otp',
    };
  }

  verifyOtp(token: string, uid: number) {
    this.otpService.verifyOtp(token, uid);
  }
}
