import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/guards/auth.guard';

@Controller('user')
export class userController {
  constructor(private readonly userService: UserService) {}
  @Post('signup')
  signup(@Body() body: UserDto) {
    return this.userService.signup(body);
  }

  @Post('verify-otp')
  verifyOtp(@Body() req: VerifyOtpDto) {
    console.log(req);
    return this.userService.verifyOtp(req);
  }

  @Post('login')
  async login(@Body() req: LoginDto, @Res() res: Response) {
    const user = await this.userService.login(req);
    console.log(user);
    const { jwt, ...data } = user;

    res.cookie('jwt', jwt, { secure: true, httpOnly: true }).json(data);

    return data;
  }

  @Post('auto-login')
  @UseGuards(JwtAuthGuard)
  autoLogin(@Req() req: Request) {
    return this.userService.autoLogin(req);
  }
}
