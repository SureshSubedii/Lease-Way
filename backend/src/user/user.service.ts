import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async signup(body: UserDto): Promise<Record<string, string>> {
    const user = await this.userRepo.create();
    user.full_name = body.fullName;
    user.email = body.email;
    user.password = await bcrypt.hash(body.password, 10);
    await this.userRepo.save(user);
    return { message: 'SignUp SuccessFull' };
  }

  async sendOtp() {}

  async verifyOtp() {}
}
