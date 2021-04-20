import { AppConfigurationService } from './core/configuration/app-configuration/app-configuration.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { AppConfigurationModule } from './core/configuration/app-configuration.module';

@Module({
    imports: [
        UsersModule,
        AuthModule,
        AppConfigurationModule,
        TypeOrmModule.forRootAsync({
            imports: [AppConfigurationModule],
            useFactory: (configService: AppConfigurationService) => {
                const {
                    host,
                    database,
                    entites,
                    synchronize,
                    logging,
                } = configService.database;

                return {
                    type: 'mongodb',
                    host: host,
                    database: database,
                    entities: [__dirname + entites],
                    synchronize: synchronize,
                    logging: logging,
                };
            },
            inject: [AppConfigurationService],
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
