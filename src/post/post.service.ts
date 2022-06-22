import { Injectable } from '@nestjs/common';
import { PostDto } from './dto/post.dto';
import { User } from '../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { VoteDto } from "./dto/vote.dto";
import { Vote } from "./entities/vote.entity";

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectRepository(Vote) private readonly voteRepository: Repository<Vote>
  ) {}

  async addPost(postInput: PostDto, user: User) {
    return this.postRepository.insert({
      ...postInput,
      user: user,
    });
  }

  async voteToPost(voteInput: VoteDto, user: User) {
    const post = await this.postRepository.findOneBy({ id: voteInput.post });
    if(!post) {
      throw new Error('Invalid Post!');
    }
    const prevRecord = await this.voteRepository.createQueryBuilder('vote')
        .where('vote.post = :post', { post: voteInput.post })
        .andWhere('vote.user = :user', { user: user.id })
        .getOne();
    if(prevRecord) {
      throw new Error('Already voted!');
    }
    return this.voteRepository.insert({
      post,
      user,
      vote: voteInput.vote
    });
  }
}
