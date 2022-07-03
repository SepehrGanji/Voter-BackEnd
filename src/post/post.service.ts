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

    switch (voteInput.vote) {
      case 'NEG':
        await this.postRepository.update(
          { id: voteInput.post },
          { neg: post.neg + 1 },
        );
        break;
      case 'NAT':
        await this.postRepository.update(
          { id: voteInput.post },
          { nat: post.nat + 1 },
        );
        break;
      case 'POS':
        await this.postRepository.update(
          { id: voteInput.post },
          { pos: post.pos + 1 },
        );
        break;
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
    return this.postRepository.find({ order: { id: -1 } });
  }

  async getSinglePost(id: number) {
    return this.postRepository.findOneBy({ id });
  }

  async getCommentsOfPost(id: number) {
    return this.commentRepository.find({
      where: { post: { id } },
      relations: {
        post: true,
        user: true,
      },
      select: {
        post: {
          id: true,
        },
        user: {
          username: true,
          email: true,
        },
      },
      order: { id: -1 },
    });
  }

  async searchPost(q: string) {
    return this.postRepository
      .createQueryBuilder('post')
      .where('post.title LIKE :q', { q: `%${q}%` })
      .orWhere('post.desc LIKE :q', { q: `%${q}%` })
      .orderBy({ id: 'DESC' })
      .getMany();
  }

  async getMyVote(post_id: number, user_id: number) {
    return await this.voteRepository.findOne({
      where: {
        post: {
          id: post_id,
        },
        user: {
          id: user_id,
        },
      },
    });
  }
}
