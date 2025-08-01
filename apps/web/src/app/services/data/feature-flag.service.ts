import { Inject, Injectable } from '@angular/core';
import { RemoteConfig } from '@angular/fire/remote-config';
import { fetchAndActivate, getValue } from 'firebase/remote-config';
import { from, map, of, shareReplay } from 'rxjs';
import { ENVIRONMENT } from 'src/app/tokens/environment.token';
import { Environment } from 'src/environments/environment.model';

@Injectable({ providedIn: 'root' })
export class FeatureFlagService {
  /**
   * Observable that ensures Remote Config values are fetched and activated once.
   * Falls back to a stubbed observable if using the emulator.
   */
  private readonly ready$ = this.environment.useEmulator
    ? of(true)
    : from(fetchAndActivate(this.remoteConfig)).pipe(shareReplay(1));

  /**
   * Creates a new FeatureFlagService.
   *
   * @param remoteConfig - Firebase Remote Config instance
   * @param environment - Environment configuration (injected via token)
   */
  constructor(
    private remoteConfig: RemoteConfig,
    @Inject(ENVIRONMENT)
    private environment: Environment
  ) {}

  /**
   * Retrieves a boolean remote config flag.
   *
   * @param flagName - The key of the remote config parameter
   * @returns Observable emitting the boolean value of the flag
   */
  getFlag(flagName: string) {
    if (this.environment.useEmulator) {
      return of(false);
    }

    return this.ready$.pipe(
      map(() => getValue(this.remoteConfig, flagName).asBoolean())
    );
  }

  /**
   * Retrieves a string remote config value.
   *
   * @param flagName - The key of the remote config parameter
   * @returns Observable emitting the string value of the parameter
   */
  getString(flagName: string) {
    if (this.environment.useEmulator) {
      return of('');
    }

    return this.ready$.pipe(
      map(() => getValue(this.remoteConfig, flagName).asString())
    );
  }
}
