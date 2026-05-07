import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from 'src/models/user.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [SequelizeModule.forFeature([User])],
})
export class AuthModule {}
