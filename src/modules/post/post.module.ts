import { Module } from '@nestjs/common';
import { PostController } from './presentation/port.controller';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { Post, PostSchema } from './infrastructure/post.schema';
import { PostService } from './application/post.service';
import { POST_REPOSITORY } from './domain/post.repository.interface';
import { MongoPostRepository } from './infrastructure/mongo-post.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Post.name,
        schema: PostSchema,
      },
    ]),
  ],
  controllers: [PostController],
  providers: [
    {
      provide: POST_REPOSITORY,
      useClass: MongoPostRepository,
    },
    PostService,
  ],
})
export class PostModule {}
