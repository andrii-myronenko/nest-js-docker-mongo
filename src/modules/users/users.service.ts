import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

const saltRounds = 10;
@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    findOne(email: string): Promise<User | undefined> {
        return this.usersRepository.findOne({
            email,
        });
    }

    async create(user: Omit<User, 'id'>): Promise<User> {
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);

        return this.usersRepository.save({
            email: user.email,
            name: user.name,
            password: hashedPassword,
        });
    }

    async remove(id: string): Promise<void> {
        await this.usersRepository.delete(id);
    }
}
