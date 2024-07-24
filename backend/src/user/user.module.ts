import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { userController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService],
  controllers: [userController],
})
export class UserModule {}
