import { Component } from '@angular/core';
import { TitleComponent } from '../title/title.component';
import { SocialButtonsComponent } from '../social-buttons/social-buttons.component';

@Component({
  selector: 'app-landing-page',
  imports: [TitleComponent, SocialButtonsComponent],
  templateUrl: './landing.page.component.html',
  styleUrl: './landing.page.component.scss',
})
export class LandingPageComponent {}
