import { UserDto } from './../users/interfaces/user.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: UserDto) {
        if (!this.validateUser(user.username, user.password)) {
            throw new UnauthorizedException();
        }

        const payload = { username: user.username };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
