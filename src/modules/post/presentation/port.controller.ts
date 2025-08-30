import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { PostService } from '../application/post.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(AuthGuard)
  @Post()
  addPost(createPostDto: CreatePostDto, @CurrentUser('userId') userId: string) {
    return this.postService.create(createPostDto, userId);
  }

  @Get()
  getAllPost() {
    return this.postService.getPost();
  }

  @Get(':id')
  getPostById(@Param('id') postId: string) {
    return this.postService.getPostById(postId);
  }

  @Patch()
  updatePost(@Param('id') postId: string, updatePosTDto: UpdatePostDto) {
    return this.postService.update(postId, updatePosTDto);
  }

  @Delete(':id')
  deletePost(@Param('id') postId: string) {
    return this.postService.delete(postId);
  }

  @Post(':id')
  publishPost(@Param('id') postId: string) {}
}
