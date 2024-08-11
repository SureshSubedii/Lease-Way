import { Module } from '@nestjs/common';
import { GoogleStrategy } from 'src/strategy/google.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { HttpModule } from '@nestjs/axios';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'google' }),
    HttpModule,
    UserModule,
    TypeOrmModule.forFeature([User]),
  ],
  providers: [AuthService, GoogleStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
