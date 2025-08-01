import { Environment } from './environment.model';

export const environment: Environment = {
  production: true,
  firebase: {
    apiKey: 'fake-api-key',
    authDomain: 'localhost',
    projectId: 'portfolio-mikepawlak',
    storageBucket: 'portfolio-mikepawlak.appspot.com',
    messagingSenderId: '1234567890',
    appId: '1:1234567890:web:abcdef123456',
    measurementId: 'G-FAKEID1234',
  },
  useEmulator: false,
};
