import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class userController {
  constructor(private readonly userService: UserService) {}
  @Post('signup')
  signup(@Body() body: UserDto) {
    // this.mailservice.sendMail();
    return this.userService.signup(body);
  }

  @Post('verify_otp')
  verifyOtp(@Body() req) {
    console.log(req.token);
    return this.userService.verifyOtp(req.token, req.uid);
  }
}
