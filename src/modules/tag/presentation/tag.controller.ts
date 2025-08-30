import { Controller, Param, Get, Post, Patch, Delete } from '@nestjs/common';
import { CreateTagDto } from './dtos/create-tag.dto';
import { UpdateTagDto } from './dtos/update-tag.dto';

@Controller('tag')
export class TagController {
  @Get(':id')
  getTagById() {}

  @Post()
  create(tag: CreateTagDto) {}

  @Patch(':id')
  update(tag: UpdateTagDto) {}

  @Delete(':id')
  delete(@Param('id') tagId: string) {}
}
