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
import { VoteDto } from './dto/vote.dto';
import { CommentDto } from './dto/comment.dto';

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
          error: 'ERROR',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return {
      message: 'CREATED',
    };
  }

  @Post('/vote')
  @UsePipes(new ValidationPipe({ transform: true }))
  async voteToPost(@Body() voteDto: VoteDto, @Request() req) {
    try {
      await this.postService.voteToPost(voteDto, req.user);
    } catch (e) {
      if (e instanceof Error) {
        throw new HttpException(
          {
            error: e.message,
          },
          HttpStatus.FORBIDDEN,
        );
      }
      throw new HttpException(
        {
          error: 'ERROR',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return {
      message: 'CREATED',
    };
  }

  @Post('/comment')
  @UsePipes(new ValidationPipe({ transform: true }))
  async commentToPost(@Body() commentDto: CommentDto, @Request() req) {
    try {
      await this.postService.commentToPost(commentDto, req.user);
    } catch (e) {
      if (e instanceof Error) {
        throw new HttpException(
          {
            error: e.message,
          },
          HttpStatus.FORBIDDEN,
        );
      }
      throw new HttpException(
        {
          error: 'ERROR',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return {
      message: 'CREATED',
    };
  }
}
