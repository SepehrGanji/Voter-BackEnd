import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from './entities/create-user.dto';
import {Public} from "../auth/decorators/public-decorator";

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.userService.getHello();
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Public()
  @Post('/signup')
  @UsePipes(new ValidationPipe({ transform: true }))
  async signup(@Body() createUserDto: CreateUserDto) {
    createUserDto.password = this.authService.hashString(
      createUserDto.password,
    );
    try {
      await this.userService.addOne(createUserDto);
    } catch (e) {
      throw new HttpException(
        {
          message: 'DUPLICATE-KEY',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    return {
      message: 'CREATED',
    };
  }
}
