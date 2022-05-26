import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
  name: 'user',
  schema: 'public',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;
}
