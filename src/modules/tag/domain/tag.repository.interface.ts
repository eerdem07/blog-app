import { Tag } from './tag.entity';

export interface ITagRepository {
  create(tag: Tag): Promise<string>;
  update(id: string, tag: Tag): Promise<Tag>;
  delete(ig: string): Promise<boolean>;
}
