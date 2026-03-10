import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthUsersService } from './auth-users.service';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [ConfigModule, PassportModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, AuthUsersService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
