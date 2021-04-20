import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { assertNotNil } from 'src/utils/typeUtils';
import { Config } from '../config';

@Injectable()
export class AppConfigurationService {
    constructor(private configService: ConfigService) {}

    private getUnwrappedConfigServiceValue<Key extends keyof Config>(key: Key) {
        const value = this.configService.get<Config[Key]>(key);
        assertNotNil(
            value,
            'BUG: configService should store valid application configuration',
        );

        return value;
    }

    get port(): number {
        return this.getUnwrappedConfigServiceValue('port');
    }

    get secret(): string {
        return this.getUnwrappedConfigServiceValue('secret');
    }

    get database(): Config['database'] {
        return this.getUnwrappedConfigServiceValue('database');
    }
}
