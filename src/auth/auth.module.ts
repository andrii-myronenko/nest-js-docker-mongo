import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
            //@Todo: replace me with env in the future
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '120s' },
        }),
    ],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService, JwtModule],
})
export class AuthModule {}
