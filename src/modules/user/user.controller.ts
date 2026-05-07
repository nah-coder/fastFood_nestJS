import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // async validateUser(email: string, password: string) {
  //   return await this.userService.validateUser(email, password);
  // }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.userService.register(createUserDto);
  }
}
