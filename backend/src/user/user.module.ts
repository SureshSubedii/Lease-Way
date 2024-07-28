import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { userController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { MailModule } from 'src/mail/mail.module';
import { OtpModule } from 'src/otp/otp.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), MailModule, OtpModule],
  providers: [UserService],
  controllers: [userController],
})
export class UserModule {}
