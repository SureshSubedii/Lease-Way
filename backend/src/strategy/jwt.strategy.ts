import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJwtFromCookies,
      ]),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  private static extractJwtFromCookies(req: Request): string | null {
    return req.cookies['jwt'] || null;
  }

  async validate(payload: any) {
    return {
      userId: payload.id,
      username: payload.full_name,
      email: payload.email,
    };
  }
}
