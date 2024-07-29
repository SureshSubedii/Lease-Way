import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';

@Controller('user')
export class userController {
  constructor(private readonly userService: UserService) {}
  @Post('signup')
  signup(@Body() body: UserDto) {
    return this.userService.signup(body);
  }

  @Post('verify_otp')
  verifyOtp(@Body() req: VerifyOtpDto) {
    return this.userService.verifyOtp(req);
  }
}
