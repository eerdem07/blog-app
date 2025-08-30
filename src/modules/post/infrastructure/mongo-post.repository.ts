import { Model } from 'mongoose';
import { Post } from '../domain/post.entity';
import { IPostRepository } from '../domain/post.repository.interface';
import { PostDocument, PostSchema } from './post.schema';
import { InjectModel } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';

export class MongoPostRepository implements IPostRepository {
  constructor(
    @InjectModel(Post.name)
    private readonly postDocument: Model<PostDocument>,
  ) {}
  create(post: Post): Promise<Post> {
    throw new Error('Method not implemented.');
  }

  findMany(params?: {
    authorId?: string;
    tag?: string;
    categoryId?: string;
    q?: string;
    page?: number;
    limit?: number;
    sort?: 'new' | 'old';
  }): Promise<{ items: Post[]; total: number; page: number; limit: number }> {
    throw new Error('Method not implemented.');
  }

  async findById(id: string): Promise<Post | null> {
    const post = await this.postDocument.findById(id);
    if (!post) {
      return null;
    }

    return new Post(post.title, post.content, post.authorId, post.id);
  }

  async update(id: string, post: Post): Promise<Post> {
    const updated = await this.postDocument.findByIdAndUpdate(
      id,
      {
        title: post.title,
        content: post.content,
        updatedAt: new Date(),
      },
      { new: true },
    );

    if (!updated) {
      throw new NotFoundException('Post not found');
    }

    return new Post(updated.title, updated.content, updated.authorId);
  }

  async delete(id: string): Promise<boolean> {
    const res = await this.postDocument.findByIdAndDelete(id);
    return !!res;
  }
}
