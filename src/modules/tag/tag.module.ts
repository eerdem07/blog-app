import { Module } from '@nestjs/common';
import { TagController } from './presentation/tag.controller';

@Module({
  controllers: [TagController],
})
export class TagModule {}
