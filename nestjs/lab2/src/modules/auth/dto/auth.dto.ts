import { ApiProperty } from '@nestjs/swagger';
import {
  Min,
  Max,
  IsEmail,
  Matches,
  MinLength,
  IsAlphanumeric,
  IsString,
  IsNumber,
} from 'class-validator';

class BaseAuthDto {
  @ApiProperty({
    example: 'ahmed@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '12345678',
  })
  @IsString()
  @MinLength(8)
  @IsAlphanumeric()
  password: string;
}

export class SignInDto extends BaseAuthDto {}

export class SignUpDto extends BaseAuthDto {
  @ApiProperty({
    example: 25,
  })
  @IsNumber()
  @Min(16)
  @Max(60)
  age: number;

  @ApiProperty({
    example: 'ahmed',
  })
  @IsString()
  fullName: string;

  @ApiProperty({
    example: '01123456789',
  })
  @Matches(/^01\d{9}$/)
  mobileNumber: string;
}
