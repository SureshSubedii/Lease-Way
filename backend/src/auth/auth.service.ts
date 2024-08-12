import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async googleSignup(user: Record<string, string>): Promise<string> {
    const newUser =
      (await this.userRepo.findOneBy({ email: user.email })) ||
      this.userRepo.create();
    const userPassword = Array.from(
      { length: 12 },
      () => Math.random().toString(36)[2],
    ).join('');
    if (newUser.id && !newUser.google) {
      throw new ConflictException({ message: 'User Already exists' });
    }
    newUser.email = user.email;
    newUser.full_name = user.fullName;
    newUser.password = await bcrypt.hash(userPassword, 10);
    newUser.google = true;
    newUser.is_active = true;

    await this.userRepo.save(newUser);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...details } = newUser;
    return jwt.sign(details, process.env.JWT_SECRET);
  }
}
