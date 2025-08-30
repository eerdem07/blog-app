// src/modules/post/domain/post.repository.ts
import { Post } from './post.entity';

export const POST_REPOSITORY = Symbol('POST_REPOSITORY');

export interface IPostRepository {
  findMany(params?: {
    authorId?: string;
    tag?: string;
    categoryId?: string;
    q?: string;
    page?: number; // default 1
    limit?: number; // default 10
    sort?: 'new' | 'old';
  }): Promise<{ items: Post[]; total: number; page: number; limit: number }>;

  findById(id: string): Promise<Post | null>;

  create(post: Post): Promise<Post>;

  update(id: string, post: Post): Promise<Post>; // veya patch tipi kullanabilirsin

  delete(id: string): Promise<boolean>;
}
