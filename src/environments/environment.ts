export interface Environment {
  production: boolean;
  firebase: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    /* …other fields… */
  };
  useEmulator: boolean;
}

export const environment: Environment = {
  production: false,
  firebase: {
    apiKey: '', // fill locally or via CI secrets
    authDomain: '',
    projectId: 'portfolio-mikepawlak',
  },
  useEmulator: true,
};
