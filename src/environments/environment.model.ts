export interface Environment {
  production: boolean;
  firebase: {
    apiKey: string;
    authDomain: string;
    storageBucket: string;
    messagingSenderId: string;
    projectId: string;
    appId: string;
    measurementId: string;
    /* …other fields… */
  };
  useEmulator: boolean;
}
