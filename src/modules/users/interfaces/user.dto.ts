import { IsEmail, IsString } from 'class-validator';

export class UserDto {
    @IsEmail()
    @IsString()
    email: string;

    @IsString()
    name: string;

    @IsString()
    password: string;
}
