import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Model } from 'mongoose';
import { User } from 'src/schemas/users.schema';
import { SignInDto, SignUpDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly configService: ConfigService,
  ) {}

  async signUp(dto: SignUpDto) {
    const { email, password, age, fullName, mobileNumber } = dto;

    let user = await this.userModel.findOne({ email });

    if (user) {
      throw new ConflictException('Username is not available for usage');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await this.userModel.create({
      password: hashedPassword,
      email,
      age,
      fullName,
      mobileNumber,
    });

    const { password: _password, ...result } = user.toJSON();

    return result;
  }

  async signIn(dto: SignInDto) {
    const user = await this.userModel.findOne({ email: dto.email });

    if (!user) {
      throw new UnauthorizedException('Credentials provided are incorrect');
    }

    const isPasswordMatching = await bcrypt.compare(
      dto.password,
      user.password,
    );

    if (!isPasswordMatching) {
      throw new UnauthorizedException('Credentials provided are incorrect');
    }

    const { email } = user.toJSON();

    const payload = { email };

    const token = jwt.sign(payload, '1234');

    return {
      token,
    };
  }
}
