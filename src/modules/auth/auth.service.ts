import { UserDto } from './../users/interfaces/user.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(email);

        if (user && (await bcrypt.compare(pass, user.password))) {
            const { password, ...result } = user;
            return result;
        }

        return null;
    }

    async login(user: UserDto) {
        if (!(await this.validateUser(user.email, user.password))) {
            throw new UnauthorizedException();
        }

        const payload = { email: user.email };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
