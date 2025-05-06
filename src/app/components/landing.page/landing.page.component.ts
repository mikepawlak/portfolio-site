import { Component } from '@angular/core';
import { TitleComponent } from '../title/title.component';
import { SocialButtonsComponent } from '../social-buttons/social-buttons.component';
import { WorkHistoryListComponent } from '../work-history-list/work-history-list.component';
import { ProjectListComponent } from '../project-list/project-list.component';

@Component({
  selector: 'app-landing-page',
  imports: [
    TitleComponent,
    SocialButtonsComponent,
    WorkHistoryListComponent,
    ProjectListComponent,
  ],
  templateUrl: './landing.page.component.html',
  styleUrl: './landing.page.component.scss',
})
export class LandingPageComponent {}
