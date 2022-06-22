import { Injectable } from '@nestjs/common';
import { PostDto } from './dto/post.dto';
import { User } from '../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
  ) {}

  async addPost(postInput: PostDto, user: User) {
    return this.postRepository.insert({
      ...postInput,
      user: user,
    });
  }
}
