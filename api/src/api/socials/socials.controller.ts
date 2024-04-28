import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { SocialsService } from './socials.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Posts } from './entities/post.entity';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '../../security/decorators/roles.decorator';
import { Role } from '../../security/permit/roles/roles.enum';

@ApiTags('Social Management')
@Controller('socials')
export class SocialsController {
  constructor(private readonly socialsService: SocialsService) {}

  @Post('posts')
  async createPost(
    @Req() request,
    @Body() createPostDto: CreatePostDto,
  ): Promise<Posts> {
    return this.socialsService.createPost(createPostDto, request.user);
  }

  @Delete(':socialId/posts/:postId')
  @Roles(Role.Administrator)
  async deletePost(@Param('postId') postId: string): Promise<void> {
    return this.socialsService.deletePost(postId);
  }
}
