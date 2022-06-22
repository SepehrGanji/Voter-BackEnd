import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity({
  name: 'post',
  schema: 'public',
})
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  desc: string;

  @ManyToOne(() => User)
  user: User;

  @Column({ default: 0 })
  pos: number = 0;

  @Column({ default: 0 })
  nat: number = 0;

  @Column({ default: 0 })
  neg: number = 0;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
