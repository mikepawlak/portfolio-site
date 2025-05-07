import { Component } from '@angular/core';
import { TitleComponent } from '../../components/title/title.component';
import { SocialButtonsComponent } from '../../components/social-buttons/social-buttons.component';
import { WorkHistoryListComponent } from '../../components/work-history-list/work-history-list.component';
import { ProjectListComponent } from '../../components/project-list/project-list.component';
import { ContactFormComponent } from '../../components/contact-form/contact-form.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-landing-page',
  imports: [
    TitleComponent,
    SocialButtonsComponent,
    WorkHistoryListComponent,
    ProjectListComponent,
    ContactFormComponent,
    FooterComponent,
  ],
  templateUrl: './landing.page.component.html',
  styleUrl: './landing.page.component.scss',
})
export class LandingPageComponent {}
