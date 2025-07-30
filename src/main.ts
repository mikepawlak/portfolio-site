import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideNativeDateAdapter } from '@angular/material/core';
import { LandingPageComponent } from './app/pages/landing.page/landing.page.component';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import {
  provideRemoteConfig,
  getRemoteConfig,
} from '@angular/fire/remote-config';
import {
  provideFirestore,
  getFirestore,
  connectFirestoreEmulator,
} from '@angular/fire/firestore';
import { environment } from './environments/environment';

bootstrapApplication(LandingPageComponent, {
  providers: [
    // Angular Material + HttpClient
    provideAnimations(),
    provideHttpClient(),
    provideNativeDateAdapter(),

    // Initialize Firebase
    provideFirebaseApp(() => initializeApp(environment.firebase)),

    // Provide Firestore and (if dev) connect to emulator
    provideFirestore(() => {
      const firestore = getFirestore();
      if (!environment.production && environment.useEmulator) {
        console.info('Connecting to firestore emulator...');
        connectFirestoreEmulator(firestore, 'localhost', 8080);
      }
      return firestore;
    }),

    // Provide Remote Config for feature flags
    provideRemoteConfig(() => {
      const remoteConfig = getRemoteConfig();
      remoteConfig.settings = {
        minimumFetchIntervalMillis: environment.production ? 3600000 : 1000,
        fetchTimeoutMillis: 1000,
      };
      remoteConfig.defaultConfig = {
        show_projects: false,
      };
      return remoteConfig;
    }),
  ],
}).catch(err => console.error(err));
