import { Module, OnModuleInit } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        secure: false, // true for 465, false for other ports

        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      },
    }),
  ],
  controllers: [],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule implements OnModuleInit {
  onModuleInit() {
    console.log(
      process.env.EMAIL_HOST,
      process.env.EMAIL_USERNAME,
      process.env.EMAIL_PASSWORD,
    );
  }
}
