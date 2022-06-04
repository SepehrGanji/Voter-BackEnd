import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getHello(): string {
    return 'Hello World!';
  }

  async findOne(username: string): Promise<any> {

  }
}
