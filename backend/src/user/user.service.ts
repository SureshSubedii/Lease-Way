import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { MailService } from '../mail/mail.service';
import { OtpService } from '../otp/otp.service';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { LoginDto } from './dto/login.dto';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly mailservice: MailService,
    private readonly otpService: OtpService,
  ) {}

  async signup(body: UserDto): Promise<Record<any, any>> {
    const user =
      (await this.userRepo.findOne({ where: { email: body.email } })) ||
      this.userRepo.create();
    if (!user.id) {
      user.full_name = body.fullName;
      user.email = body.email;
      user.password = await bcrypt.hash(body.password, 10);
    }

    await this.userRepo.save(user);
    const otp = await this.otpService.generateOtp(user);
    this.mailservice.sendMail(user.email, otp);
    return {
      message: `OTP sent to the mail address. Enter OTP  to verify User`,
      uid: user.id,
    };
  }

  async verifyOtp(verifyOtp: VerifyOtpDto) {
    const isValidOtp = await this.otpService.verifyOtp(
      verifyOtp.otp,
      verifyOtp.uid,
    );
    if (isValidOtp) {
      const user = await this.userRepo.findOneBy({ id: verifyOtp.uid });
      user.is_active = true;
      user.contact = verifyOtp.contact;
      user.address = verifyOtp.address;

      await this.userRepo.save(user);
    }
    return isValidOtp;
  }

  async login(user: LoginDto) {
    const checkUser = await this.userRepo.findOneBy({ email: user.email });

    if (
      checkUser &&
      (await bcrypt.compare(user.password, checkUser.password))
    ) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, otps, ...details } = checkUser;
      return {
        jwt: jwt.sign(details, process.env.JWT_SECRET),
        username: details.full_name,
        email: details.email,
        role: details.role,
        status: true,
      };
    }

    throw new UnauthorizedException('Username or Password Incorrect');
  }
}
