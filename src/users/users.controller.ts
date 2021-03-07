import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UserDto } from './interfaces/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post()
    async create(@Body() userDto: UserDto) {
        await this.usersService.create(userDto);
        return 'Success';
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    check() {
        return `yay, you've got it baby`;
    }
}
