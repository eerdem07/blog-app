import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserDocument, UserSchema } from './infrastructure/user.schema';
import { USER_REPOSITORY } from './domain/user.repository.interface';
import { MongoUserRepository } from './infrastructure/mongo-user.repository';
import { UserService } from './application/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserDocument.name, schema: UserSchema },
    ]),
  ],
  controllers: [],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: MongoUserRepository,
    },
    UserService,
  ],
  exports: [UserService],
})
export class UserModule {}
