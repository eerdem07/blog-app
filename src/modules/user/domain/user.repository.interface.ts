import { User } from './user.entity';

export const USER_REPOSITORY = 'IUserRepository';

export interface IUserRepository {
  findOneByEmail(email: string): Promise<User | null>;
  findUserById(id: string): Promise<User | null>;
  create(user: User): Promise<User>;
}
