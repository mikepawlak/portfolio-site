import { TestBed } from '@angular/core/testing';
import { AnalyticsService } from './analytics.service';
import { Analytics } from '@angular/fire/analytics';
import { ENVIRONMENT } from 'src/app/tokens/environment.token';
import { Environment } from 'src/environments/environment.model';

describe('AnalyticsService', () => {
  let service: AnalyticsService;

  const mockAnalytics = {} as Analytics;
  const mockEnvironment: Environment = {
    production: false,
    useEmulator: false,
    firebase: {
      apiKey: '',
      authDomain: '',
      projectId: '',
      storageBucket: '',
      messagingSenderId: '',
      appId: '',
      measurementId: '',
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AnalyticsService,
        { provide: Analytics, useValue: mockAnalytics },
        { provide: ENVIRONMENT, useValue: mockEnvironment },
      ],
    });

    service = TestBed.inject(AnalyticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
