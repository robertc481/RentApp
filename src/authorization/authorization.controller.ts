import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import {
  RegisterUserDto,
  UserLoginCredentialsDto,
  UserPasswordDto,
} from './dto/user.dto';
import { Public } from '../shared/decorators/is-public';

@UseGuards()
@Controller('authorization')
export class AuthorizationController {
  constructor(private readonly authorizationService: AuthorizationService) {}

  @Get()
  sayHi() {
    return `Hi!`;
  }

  @Get('/users')
  getAllUsers() {
    return this.authorizationService.getAllUsers();
    // return 'works fine123';
  }

  @Get('/users/:id')
  getUser(@Param('id') id: string) {
    console.log(`findUser ID given within url: ${id}`);
    return this.authorizationService.getUserById(id);
    // return '123 ';
  }

  @Get('/users/:username')
  getUserByUsername(@Param('username') username: string) {
    console.log(`findUser username given within url: ${username}`);
    return this.authorizationService.getUserByUsername(username);
    // return '123 ';
  }

  @Public()
  @Post('/register')
  registerUser(@Body() credentials: RegisterUserDto) {
    console.log(`registerUser:  ${JSON.stringify(credentials)}`);
    return this.authorizationService.createUser(credentials);
  }

  @Public()
  @Post('/login')
  async login(@Body() credentials: UserLoginCredentialsDto) {
    console.log(`loginUser:  ${JSON.stringify(credentials)}`);
    const user = await this.authorizationService.validateUser(credentials);
    return this.authorizationService.loginUser(user);
    // return '123';
  }

  @Delete('/users/:id')
  deleteUser(@Param('id') id: string) {
    console.log(`deleteUser:  ${id}`);
    return this.authorizationService.deleteUser({ id });
  }

  @Patch('/users/:username')
  updateUser(
    @Param('username') username: string,
    @Body() password: UserPasswordDto,
  ) {
    console.log(`updateUser:  ${JSON.stringify(username)}`);
    return this.authorizationService.updateUser(username, password);
  }
}
