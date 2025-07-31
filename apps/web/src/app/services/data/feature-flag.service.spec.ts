import { TestBed } from '@angular/core/testing';
import { FeatureFlagService } from './feature-flag.service';
import { RemoteConfig } from '@angular/fire/remote-config';

describe('FeatureFlagService', () => {
  let service: FeatureFlagService;

  beforeEach(() => {
    const mockRemoteConfig = {} as RemoteConfig;

    TestBed.configureTestingModule({
      providers: [
        FeatureFlagService,
        { provide: RemoteConfig, useValue: mockRemoteConfig },
      ],
    });

    service = TestBed.inject(FeatureFlagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
