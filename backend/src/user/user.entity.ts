import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

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

  @Column()
  otp: number;
}
