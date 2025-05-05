import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';

const routes = [
  {
    path: '',
    loadComponent: () =>
      import('./app/components/landing.page/landing.page.component').then(
        m => m.LandingPageComponent
      ),
  },
];

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)],
});
