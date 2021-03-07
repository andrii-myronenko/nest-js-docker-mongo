import { UserDto } from './users/interfaces/user.dto';
import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private authService: AuthService,
    ) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Post('auth/login')
    async login(@Body() user: UserDto) {
        return this.authService.login(user);
    }
}
