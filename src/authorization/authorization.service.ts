import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserLoginCredentialsDto, UserPasswordDto } from './dto/user.dto';
import { MyLoggerService } from '../logger/logger.service';

@Injectable()
export class AuthorizationService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private readonly logger: MyLoggerService,
  ) {}

  async getUserById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async getUserByUsername(username: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }

  async getAllUsers() {
    return this.prisma.user.findMany();
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    const hashedPassword = bcrypt.hashSync(data.password, 10);
    return this.prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        username: data.username,
      },
    });
  }

  async updateUser(username: string, data: UserPasswordDto): Promise<any> {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    return this.prisma.user.update({
      where: { username: username },
      data: { password: hashedPassword },
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }

  async validateUser(credentials: UserLoginCredentialsDto): Promise<User> {
    const user = await this.getUserByUsername(credentials.username);

    const { id, username, password, email } = user;

    const comparedPassword = await bcrypt.compare(
      credentials.password,
      password,
    );

    if (comparedPassword && user) {
      return user;
    }

    throw new UnauthorizedException(`Invalid credentials. Login Failed.`);
  }

  async loginUser(user: User) {
    const payload = {
      username: user.username,
      sub: user.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
