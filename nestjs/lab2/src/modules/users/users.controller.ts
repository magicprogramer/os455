import { Controller } from '@nestjs/common';
import { Get, Put, Post, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { Body } from '@nestjs/common';
import { UserDto } from '../auth/dto/User.dto';
import { Req } from '@nestjs/common';
@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}
  @Get('/all')
  getAllUsers() {
    return this.service.getAllUsers();
  }
  @Post('/')
  addNewUser(@Body() user: UserDto) {
    return this.service.addNewUser(user);
  }
  @Get('my-profile')
  userProfile(@Req() req: Request) {
    return this.service.userProfile(req);
  }
}
