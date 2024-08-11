import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(AuthGuard('google'))
  @Get('google')
  async googleLogin() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    let error = false;
    try {
      const token = await this.authService.googleSignup(req.user);
      const expirationDate = new Date();
      expirationDate.setTime(
        expirationDate.getTime() + 30 * 24 * 60 * 60 * 1000,
      );
      res.cookie('jwt', token, {
        httpOnly: true,
        secure: false,
        path: '/',
        expires: expirationDate,
      });
    } catch (err) {
      error = true;
    }

    res.redirect(`http://localhost:5173/?error=${error}`);
  }
}
