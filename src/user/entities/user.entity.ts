import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { GenderEnum } from './gender.enum';

@Entity({
  name: 'user',
  schema: 'public',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  sex: GenderEnum;
}
