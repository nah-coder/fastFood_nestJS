import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/models';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User) private readonly userModel: typeof User,
    ){}

    async findByEmail(email: string) {
        return await this.userModel.findOne({ where: { email }, raw: true });
    }

    async validateUser(email: string, password: string): Promise<any> {
        const alreadyExists = await this.findByEmail(email);

        if(!alreadyExists) throw new BadRequestException('User not found');

        // const isPasswordValid = await bcrypt.compare(password, alreadyExists.password);

        // if(isPasswordValid) {
        //     const { password, ...result } = alreadyExists.toJSON();
        //     return result;
        // }
        
        return {message: 'Invalid credentials', data: alreadyExists};
    }

    async register(createUserDto: CreateUserDto) {
        const alreadyExists = await this.findByEmail(createUserDto.email);

        if(alreadyExists) throw new BadRequestException('User already exists');
        const hashedPassword = await bcrypt.hashSync(createUserDto.password, 10);

        const payload = {
            ...createUserDto,
            password: hashedPassword,
        }

        // trasaction
        await this.userModel.create(payload as any);

        return {message: 'User created successfully'};
    }
}
