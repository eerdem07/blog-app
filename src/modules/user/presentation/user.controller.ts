import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from '../application/user.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('me')
  me(@CurrentUser('userId') userId: string) {
    return this.userService.getUserById(userId);
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }
}
