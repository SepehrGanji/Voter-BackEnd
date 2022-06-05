import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async findOne(username: string): Promise<any> {
    return this.userRepository.findOneBy({ username });
  }

  async addOne(user: any): Promise<any> {
    return this.userRepository.insert(user);
  }
}
