import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  EmploymentStatus,
  EmploymentStatusService,
} from 'src/app/services/data/employment-status.service';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { AnalyticsService } from 'src/app/services/analytics.service';
import { SocialButtonsComponent } from '../social-buttons/social-buttons.component';

@Component({
  selector: 'app-title',
  standalone: true,
  imports: [
    SocialButtonsComponent,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    NgxSkeletonLoaderModule,
  ],
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
})
export class TitleComponent implements OnInit {
  employmentStatus?: EmploymentStatus;
  loaded = false;

  constructor(
    private employmentStatusService: EmploymentStatusService,
    private analytics: AnalyticsService
  ) {}

  async ngOnInit() {
    this.employmentStatus =
      await this.employmentStatusService.getFirstActiveStatus();
    this.loaded = true;
  }

  trackResumeDownload() {
    this.analytics.logResumeDownload();
  }
}
