import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}

    async validateUser(username: string, password: string): Promise<any> {
        if(username === 'sepehr') return { user: 'sep' };
        return null;
    }
}
