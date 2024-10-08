import { Otp } from '../otp/otp.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  TENANT = 'tenant',
  OWNER = 'owner',
}
@Entity({ name: 'app_user' })
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  full_name: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column({ default: false })
  is_active: boolean;

  @OneToOne(() => Otp, (otp) => otp.user_id)
  otps: Otp;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @Column()
  contact: string;

  @Column()
  address: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.TENANT })
  role: UserRole;

  @Column({ default: false })
  google: boolean;
}
