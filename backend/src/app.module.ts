import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/typeorm.config';
import { MailModule } from './mail/mail.module';
import { OtpModule } from './otp/otp.module';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot(dataSourceOptions),
    MailModule,
    OtpModule,
    AuthModule,
  ],
  controllers: [AuthController],
  providers: [AppService, AuthService],
})
export class AppModule {}
