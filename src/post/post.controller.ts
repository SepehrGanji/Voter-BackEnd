import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PostService } from './post.service';
import { PostDto } from './dto/post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('/add')
  @UsePipes(new ValidationPipe({ transform: true }))
  async addPost(@Body() postDto: PostDto, @Request() req) {
    try {
      await this.postService.addPost(postDto, req.user);
    } catch (e) {
      console.error(e);
      throw new HttpException(
        {
          message: 'Error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return {
      message: 'CREATED',
    };
  }
}
