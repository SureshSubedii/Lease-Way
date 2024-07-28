import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  sendMail(email, content) {
    this.mailerService.sendMail({
      from: 'Lease Way',
      to: email,
      subject: `OTP for verification `,
      text: `Your otp for verification is ${content}. Please use this OTP with 2 minutes`,
    });
  }
}
