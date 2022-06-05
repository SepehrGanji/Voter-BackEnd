import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { GenderEnum } from './gender.enum';

@Entity({
  name: 'user',
  schema: 'public',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true})
  username: string;

  @Column()
  password: string;

  @Column({ unique: true})
  email: string;

  @Column()
  sex: GenderEnum;
}
