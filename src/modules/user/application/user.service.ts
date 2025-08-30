import { Inject, Injectable } from '@nestjs/common';
import { User } from '../domain/user.entity';
import { USER_REPOSITORY } from '../domain/user.repository.interface';
import type { IUserRepository } from '../domain/user.repository.interface';
import { CreateUser } from './dtos/create-user.dto';
import { Role } from '../domain/role.vo';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOneByEmail(email);
  }

  async create(createUser: CreateUser) {
    const user = new User(
      createUser.username,
      createUser.email,
      createUser.password,
      new Role('USER'),
    );

    const newUser = this.userRepository.create(user);

    return newUser;
  }

  async me() {}

  async getUserById(userId: string) {
    const user = await this.userRepository.findUserById(userId);
    return user;
  }
}
