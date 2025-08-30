import { User } from '../domain/user.entity';
import { IUserRepository } from '../domain/user.repository.interface';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from './user.schema';
import { Model } from 'mongoose';

export class MongoUserRepository implements IUserRepository {
  constructor(
    @InjectModel(UserDocument.name)
    private readonly userDocument: Model<UserDocument>,
  ) {}

  async findOneByEmail(email: string): Promise<User | undefined> {
    const user = await this.userDocument.findOne({ email }).exec();
    if (!user) return undefined;

    return new User(user.username, user.email, user.password, user.id);
  }

  async create(user: User): Promise<User | undefined> {
    const newUser = new this.userDocument({
      username: user.username,
      email: user.email,
      password: user.password,
    });
    const savedUser = await newUser.save();

    return new User(
      savedUser.username,
      savedUser.email,
      savedUser.password,
      savedUser.id,
    );
  }

  async findUserById(id: string): Promise<User | undefined> {
    const user = await this.userDocument.findById(id);
    if (!user) return undefined;
    return new User(user.username, user.email, user.password, user.id);
  }
}
