import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/users.schema';
import { Body } from '@nestjs/common';
import { UserDto } from '../auth/dto/User.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
  getAllUsers(): any {
    return this.userModel.find({});
  }
  async addNewUser(@Body() user: UserDto) {
    return null;
  }
  async userProfile(req) {
    const $user = this.userModel.find({email : req.user.email});
    return $user;
  }
}
