import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.delo',
  appName: 'delo',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
