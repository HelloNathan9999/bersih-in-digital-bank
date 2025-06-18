
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'RubixStudio',
  appName: 'BERSIH.IN - Bank Sampah Digital',
  webDir: 'dist',
  server: {
    url: 'https://711102dc-8c91-4cd6-8e45-f6eb5a0080a9.rubixstudio_project.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    Camera: {
      permissions: ['camera']
    },
    Geolocation: {
      permissions: ['location']
    }
  }
};

export default config;
