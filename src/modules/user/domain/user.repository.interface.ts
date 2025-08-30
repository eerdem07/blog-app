import { User } from './user.entity';

export const USER_REPOSITORY = 'IUserRepository';

export interface IUserRepository {
  findOneByEmail(email: string): Promise<User | undefined>;
  findUserById(id:string):Promise<User | undefined>;
  create(user: User): Promise<User | undefined>;
}
