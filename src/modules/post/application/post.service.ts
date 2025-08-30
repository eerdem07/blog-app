import { Injectable } from '@nestjs/common';
import { MongoPostRepository } from '../infrastructure/mongo-post.repository';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';

@Injectable()
export class PostService {
  constructor(private readonly mongoPostRepository: MongoPostRepository) {}

  async getPost() {}
  async getPostById(postId: string) {}
  async create(createPostDto: CreatePostDto, userId: string) {}
  async update(postId: string, updatePostDto: UpdatePostDto) {}
  async delete(postId: string) {}
}
