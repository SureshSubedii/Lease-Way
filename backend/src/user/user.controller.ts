import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
import { JwtAuthGuard } from '../guards/jwtAuth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('signup')
  async signup(@Body() body: UserDto) {
    return this.userService.signup(body);
  }

  @Post('verify-otp')
  verifyOtp(@Body() req: VerifyOtpDto) {
    return this.userService.verifyOtp(req);
  }

  @Post('login')
  async login(@Body() req: LoginDto, @Res() res: Response) {
    const user = await this.userService.login(req);
    console.log(user);
    const { jwt, ...data } = user;
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + 30 * 24 * 60 * 60 * 1000);

    res
      .cookie('jwt', jwt, {
        httpOnly: true,
        secure: false,
        path: '/',
        expires: expirationDate,
      })
      .json(data);

    return data;
  }

  @Post('auto-login')
  @UseGuards(JwtAuthGuard)
  autoLogin(): void {}

  @Post('logout')
  logout(@Res() res: Response) {
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() - 10000);

    res.cookie('jwt', '', {
      httpOnly: true,
      secure: false,
      path: '/',
      expires: expirationDate,
    });
    res.status(200).json({ message: 'Logout Successfull', status: true });
  }
}
