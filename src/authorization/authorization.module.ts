import { Module } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { AuthorizationController } from './authorization.controller';
import { PrismaService } from '../prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../shared/constants/jwt-constants';
import { MyLoggerModule } from '../logger/logger.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../jwt/jwt.strategy';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
    MyLoggerModule,
  ],
  controllers: [AuthorizationController],
  providers: [AuthorizationService, PrismaService, JwtStrategy, ConfigService],
  exports: [AuthorizationService],
})
export class AuthorizationModule {}
