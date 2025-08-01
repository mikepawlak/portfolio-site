import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AnalyticsService } from 'src/app/services/analytics.service';

@Component({
  selector: 'app-social-buttons',
  imports: [MatButtonModule, MatIconModule],
  standalone: true,
  templateUrl: './social-buttons.component.html',
  styleUrl: './social-buttons.component.scss',
})
export class SocialButtonsComponent {
  constructor(private analytics: AnalyticsService) {}

  trackExternal(location: string) {
    this.analytics.logExternalLinkClick(
      location as 'github' | 'linkedin' | 'email'
    );
  }
}
