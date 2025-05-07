import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideNativeDateAdapter } from '@angular/material/core';
import { LandingPageComponent } from './app/pages/landing.page/landing.page.component';

bootstrapApplication(LandingPageComponent, {
  providers: [
    provideAnimations(),
    provideHttpClient(),
    provideNativeDateAdapter(),
  ],
}).catch(err => console.error(err));
