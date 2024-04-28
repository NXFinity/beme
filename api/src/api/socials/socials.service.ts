import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Social } from './entities/social.entity';
import { Posts } from './entities/post.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class SocialsService {
  constructor(
    @InjectRepository(Social) private socialRepository: Repository<Social>,
    @InjectRepository(Posts) private postRepository: Repository<Posts>,
  ) {}

  async create(user: User): Promise<Social> {
    const social = new Social();
    social.user = user;
    return this.socialRepository.save(social);
  }

  async createPost(createPostDto: CreatePostDto, user: User): Promise<Posts> {
    console.log(`userId: ${user.social.id}`); // Log the userId

    const social = await this.socialRepository.findOne({
      where: { id: user.social.id },
    });

    if (!social) {
      throw new Error('Social entity not found for the provided user id');
    }

    const post = new Posts();
    post.title = createPostDto.title;
    post.content = createPostDto.content;
    post.social = social;

    return this.postRepository.save(post);
  }

  async findOne(socialId: string) {
    return this.socialRepository.findOne({
      where: { id: socialId },
    });
  }

  async deletePost(postId: string): Promise<void> {
    await this.postRepository.delete(postId);
  }
}
