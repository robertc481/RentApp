import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  Validate,
} from 'class-validator';
import { IsAtLeastOne } from '../../shared/decorators/is-at-least-one';

export class GetUserByIDDto {
  @IsString()
  @IsNotEmpty()
  readonly id: string;
}

export class GetUserByUsernameDto {
  @IsString()
  @IsNotEmpty()
  readonly username: string;
}

export class RegisterUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UserLoginCredentialsDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  username?: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @Validate(IsAtLeastOne, [['email', 'username']])
  static atLeastOne: any;
}

export class UserPasswordDto {
  @IsString()
  @IsNotEmpty()
  password: string;
}
