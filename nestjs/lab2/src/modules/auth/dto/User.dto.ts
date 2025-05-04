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
  
  export class UserDto {
    @IsNumber()
    @Min(16)
    @Max(30)
    age: number;
  
    @IsString()
    @Matches(/^01\d{9}$/, {
      message: 'Mobile number must be 11 digits starting with 01'
    })
    mobileNumber: string;
  
    @IsEmail()
    email: string;
  
    @IsString()
    @MinLength(8)
    @Matches(/^[a-zA-Z0-9]+$/, { 
      message: 'Password must be alphanumeric' 
    })
    password: string;
  }