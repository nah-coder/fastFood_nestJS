import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

    async validateUser(email: string, password: string): Promise<any> {
        return await this.userService.validateUser(email, password);
    }

    async login({id, role}) {
        const accessToken = this.jwtService.signAsync({id, role});
        return { accessToken };
    }
}
