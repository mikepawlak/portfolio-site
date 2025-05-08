import { Environment } from './environment';

export const environment: Environment = {
  production: true,
  firebase: {
    apiKey: '', // injected at CI/deploy time
    authDomain: '',
    projectId: '',
  },
  useEmulator: false,
};
