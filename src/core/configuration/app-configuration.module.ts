import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { loadConfig } from './config';
import { AppConfigurationService } from './app-configuration/app-configuration.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [loadConfig],
        }),
    ],
    controllers: [],
    providers: [AppConfigurationService],
    exports: [AppConfigurationService],
})
export class AppConfigurationModule {}
