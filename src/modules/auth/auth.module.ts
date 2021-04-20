import { AppConfigurationService } from './../../core/configuration/app-configuration/app-configuration.service';
import { JwtStrategy } from './jwt.strategy';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/modules/users/users.module';
import { AuthService } from './auth.service';
import { AppConfigurationModule } from 'src/core/configuration/app-configuration.module';

@Module({
    imports: [
        UsersModule,
        AppConfigurationModule,
        PassportModule,
        JwtModule.registerAsync({
            imports: [AppConfigurationModule],
            useFactory: (configService: AppConfigurationService) => ({
                secret: configService.secret,
                signOptions: { expiresIn: '120s' },
            }),
            inject: [AppConfigurationService],
        }),
    ],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService, JwtModule],
})
export class AuthModule {}
