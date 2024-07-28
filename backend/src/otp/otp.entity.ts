import { User } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@Unique(['user_id'])
export class Otp {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.otps)
  @JoinColumn({ name: 'user_id' })
  user_id: User;

  @Column()
  otp_secret: string;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}
