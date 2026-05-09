import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtGuard } from './guards/jwt.guard';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalAuthGuard, LocalStrategy, JwtStrategy, JwtGuard],
  imports: [
    UserModule
  ],
  exports: [AuthService, LocalAuthGuard, JwtGuard],
})
export class AuthModule {}
