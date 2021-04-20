import { Test, TestingModule } from '@nestjs/testing';
import { AppConfigurationService } from './app-configuration.service';

describe('AppConfigurationService', () => {
    let service: AppConfigurationService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AppConfigurationService],
        }).compile();

        service = module.get<AppConfigurationService>(AppConfigurationService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
