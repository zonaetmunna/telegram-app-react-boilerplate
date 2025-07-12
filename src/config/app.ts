/**
 * App Configuration
 * Contains all app-related settings and URLs
 */

export const APP_CONFIG = {
  // Your personal info
  name: 'Your Name',
  title: 'Your App Title',
  description: 'Your app description here',
  version: '1.0.0',
  
  // Telegram configuration
  telegramUrl: 'https://t.me/your_bot_name',
  telegramUsername: '@your_bot_username',
  
  // Your custom listings
  listings: [
    {
      id: 1,
      title: 'Feature 1',
      description: 'Description for your first feature',
      icon: '🚀',
      telegramUrl: 'https://t.me/your_bot_name?start=feature1',
    },
    {
      id: 2,
      title: 'Feature 2', 
      description: 'Description for your second feature',
      icon: '✨',
      telegramUrl: 'https://t.me/your_bot_name?start=feature2',
    },
    {
      id: 3,
      title: 'Feature 3',
      description: 'Description for your third feature',
      icon: '🎯',
      telegramUrl: 'https://t.me/your_bot_name?start=feature3',
    },
    {
      id: 4,
      title: 'Support',
      description: 'Get help and support',
      icon: '💬',
      telegramUrl: 'https://t.me/your_bot_name?start=support',
    },
  ],
} as const;
