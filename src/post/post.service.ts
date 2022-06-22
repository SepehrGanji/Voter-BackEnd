import { Injectable } from '@nestjs/common';
import { PostDto } from './dto/post.dto';
import { User } from '../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { VoteDto } from './dto/vote.dto';
import { Vote } from './entities/vote.entity';
import { CommentDto } from './dto/comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectRepository(Vote) private readonly voteRepository: Repository<Vote>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async addPost(postInput: PostDto, user: User) {
    return this.postRepository.insert({
      ...postInput,
      user: user,
    });
  }

  async voteToPost(voteInput: VoteDto, user: User) {
    const post = await this.postRepository.findOneBy({ id: voteInput.post });
    if (!post) {
      throw new Error('Invalid Post!');
    }
    const prevRecord = await this.voteRepository
      .createQueryBuilder('vote')
      .where('vote.post = :post', { post: voteInput.post })
      .andWhere('vote.user = :user', { user: user.id })
      .getOne();
    if (prevRecord) {
      throw new Error('Already voted!');
    }
    return this.voteRepository.insert({
      post,
      user,
      vote: voteInput.vote,
    });
  }

  async commentToPost(commentInput: CommentDto, user: User) {
    const post = await this.postRepository.findOneBy({ id: commentInput.post });
    if (!post) {
      throw new Error('Invalid Post!');
    }
    return this.commentRepository.insert({
      post,
      user,
      text: commentInput.text,
    });
  }

  async getAllPosts() {
    return this.postRepository.find();
  }

  async getSinglePost(id: number) {
    return this.postRepository.findOneBy({ id });
  }
}
