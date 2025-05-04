import { MaxFileSizeValidator } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  Min,
  Max,
  IsEmail,
  Matches,
  MinLength,
  IsAlphanumeric,
} from 'class-validator';
export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  fullName: string;

  @Min(16)
  @Max(60)
  @Prop({ required: true })
  age: number;

  @Matches(/^01\d{9}$/)
  @Prop({ required: true })
  mobileNumber: string;

  @IsEmail()
  @Prop({ required: true, unique: true })
  email: string;

  @IsAlphanumeric()
  @MinLength(8)
  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
