import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as fs from 'fs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    fs.appendFileSync(
      process.cwd() + '/log/auth.log',
      `Authenticating user ${username} at ${Date.now().toString()}`,
    );
    const user = await this.userService.findOne(username);
    if (user && bcrypt.compareSync(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      sub: user.id,
      un: user.username,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  hashString(str: string): string {
    return bcrypt.hashSync(str, bcrypt.genSaltSync());
  }
}
