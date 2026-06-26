import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.goalsprinta',
  appName: 'Goal Sprinta',
  webDir: 'dist',
  server: {
    // Hot-reload from the live preview during development.
    // Remove `url` before building a production binary for the App Store / Play Store.
    url: 'https://17079dd6-bc17-4b0e-998d-e06eb56733cd.lovableproject.com?forceHideBadge=true',
    cleartext: true,
  },
};

export default config;
