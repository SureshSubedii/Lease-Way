import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/typeorm.config';
import { MailModule } from './mail/mail.module';
import { OtpModule } from './otp/otp.module';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot(dataSourceOptions),
    MailModule,
    OtpModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
