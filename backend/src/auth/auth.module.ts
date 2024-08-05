import { Module } from '@nestjs/common';
import { GoogleStrategy } from 'src/strategy/google.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [GoogleStrategy],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
