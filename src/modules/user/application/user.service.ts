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

  async findOneByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneByEmail(email);
  }

  async create(createUser: CreateUser) {
    const user = User.create(
      createUser.username,
      createUser.email,
      createUser.password,
      Role.user(),
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
