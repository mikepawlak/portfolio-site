import { inject, Inject, Injectable } from '@angular/core';
import { Analytics, logEvent } from '@angular/fire/analytics';
import { ENVIRONMENT } from 'src/app/tokens/environment.token';
import { Environment } from 'src/environments/environment.model';

/**
 * Service for logging Firebase Analytics events.
 */
@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private readonly analytics = inject(Analytics, { optional: true });

  constructor(
    @Inject(ENVIRONMENT)
    private environment: Environment
  ) {}

  /**
   * Logs a resume download event to Firebase Analytics.
   * Skips logging if using emulator.
   */
  logResumeDownload(): void {
    if (this.environment.useEmulator) return;

    logEvent(this.analytics as Analytics, 'resume_download', {
      source: 'hero_card',
    });
  }

  /**
   * Logs an external link click (GitHub, LinkedIn, Email).
   * Skips logging if using emulator.
   *
   * @param linkType - The type of link clicked
   */
  logExternalLinkClick(linkType: 'github' | 'linkedin' | 'email'): void {
    if (this.environment.useEmulator) return;

    logEvent(this.analytics as Analytics, 'external_link_click', {
      type: linkType,
      location: 'hero_card',
    });
  }
}
