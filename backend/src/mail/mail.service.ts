import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { SentMessageInfo } from 'nodemailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(email: string, content: string): Promise<SentMessageInfo> {
    const mailOptions: ISendMailOptions = {
      from: 'Lease Way',
      to: email,
      subject: 'OTP for verification',
      text: `Your OTP for verification is ${content}. Please use this OTP within 2 minutes.`,
    };

    return this.mailerService.sendMail(mailOptions);
  }
}
