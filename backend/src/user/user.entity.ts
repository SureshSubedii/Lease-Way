import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'app_user' }) // Specify a custom table name
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  full_name: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  is_active: boolean;
}
