import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/models';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

  
  async findByEmail(email: string) {
    return await this.userModel.findOne({ where: { email } });
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.findByEmail(email);

    if (!user) throw new BadRequestException('User not found');

    const isPasswordValid = user.comparePassword(password);

    if (!isPasswordValid) throw new BadRequestException('Invalid credentials');

    // trả token

    const plainUser = user.toJSON();
    return {id: plainUser.id, email: plainUser.email, role: plainUser.role};
  }

  async register(createUserDto: CreateUserDto) {
    const alreadyExists = await this.findByEmail(createUserDto.email);

    if (alreadyExists) throw new BadRequestException('User already exists');

    // trasaction
    await this.userModel.create(createUserDto as any);

    return { message: 'User created successfully' };
  }
}
