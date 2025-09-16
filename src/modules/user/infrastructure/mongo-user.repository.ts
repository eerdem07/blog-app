import { User } from '../domain/user.entity';
import { IUserRepository } from '../domain/user.repository.interface';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from './user.schema';
import { Model } from 'mongoose';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

export class MongoUserRepository implements IUserRepository {
  constructor(
    @InjectModel(UserDocument.name)
    private readonly userDocument: Model<UserDocument>,
  ) {}

  async findOneByEmail(email: string): Promise<User | null> {
    const user = await this.userDocument.findOne({ email }).exec();
    if (!user) return null;

    return User.fromPresistence(
      user.username,
      user.email,
      user.password,
      user.role,
      user.id,
    );
  }

  async findUserById(id: string): Promise<User | null> {
    const user = await this.userDocument.findById(id);
    if (!user) return null;

    return User.fromPresistence(
      user.username,
      user.email,
      user.password,
      user.role,
      user.id,
    );
  }

  async create(user: User): Promise<User> {
    try {
      const newUser = new this.userDocument({
        username: user.username,
        email: user.email,
        password: user.password,
      });

      const savedUser = await newUser.save();

      return User.fromPresistence(
        savedUser.username,
        savedUser.email,
        savedUser.password,
        savedUser.role,
        savedUser.id,
      );
    } catch (err) {
      if (err?.code === 11000) {
        // MongoDB Duplicate Key Error Code: 11000
        throw new ConflictException(
          `This ${Object.keys(err?.keyValue)[0]} is taken`,
        );
      }
      // Eğer Duplicate Key Error değile ve hata varsa
      throw new InternalServerErrorException('Failed to create user');
    }
  }
}
