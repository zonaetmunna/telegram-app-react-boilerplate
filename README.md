# Telegram Mini App React Boilerplate

A comprehensive React TypeScript boilerplate for building Telegram Mini Apps with modern tooling and best practices.

## 🎉 **DEPLOYMENT ISSUES RESOLVED!**

**✅ The "Too Old Telegram Client" error has been FIXED!**

This boilerplate now works correctly in production environments. All critical deployment issues have been resolved:

- ✅ Fixed SDK compatibility issues
- ✅ Resolved import errors causing build failures
- ✅ Added proper error handling for unmounted components
- ✅ Eliminated React Router warnings
- ✅ Production build works without TypeScript errors
- ✅ Ready for immediate Vercel deployment

**Status**: 🟢 **PRODUCTION READY**

## 🚀 Features

### ✨ Enhanced Routing System

- **Environment-aware routing** - Different routes for development and production
- **Categorized navigation** - Organized routes by categories (main, debug, profile, settings)
- **Dynamic route filtering** - Automatically shows/hides routes based on environment
- **Route metadata** - Icons, descriptions, and permissions for better organization

### 🎨 Modern UI/UX

- **Smooth animations** with Framer Motion
- **Loading states** with custom loading screens
- **Error boundaries** with environment-specific error handling
- **Responsive design** optimized for mobile devices
- **Haptic feedback** integration for better user experience

### 👤 User Management

- **User Profile Page** - Comprehensive user information display
- **Settings Page** - App preferences and configuration
- **Session management** - Display and manage user sessions
- **Environment detection** - Show different features based on environment

### 🛠️ Developer Experience

- **TypeScript** with strict type checking
- **Environment configuration** for development and production
- **Debug tools** (only in development mode)
- **Comprehensive error handling** with detailed error messages
- **Modern build tools** with Vite

### 📱 Telegram Integration

- **Telegram Apps SDK** v3.0+ integration
- **Theme synchronization** with Telegram themes
- **TON Connect** integration for blockchain features
- **Haptic feedback** for native app feel
- **Viewport management** for optimal display

## 🔧 Production Fixes

### ✅ "Too Old Telegram Client" Error Fixed

The boilerplate now includes comprehensive fixes for the common "Too old Telegram client" error:

- **Updated SDK**: Using latest `@telegram-apps/sdk-react` v3.0+
- **Proper initialization**: Graceful error handling and component mounting
- **Direct WebApp script**: Includes Telegram WebApp script in HTML head
- **Production compatibility**: Works correctly in both development and production
- **Vercel deployment**: Optimized for Vercel deployment with proper configuration

### 🛡️ Better Error Handling

- **Graceful degradation**: App continues to work even if some components fail
- **Environment-specific**: Different error handling for development vs production
- **Console logging**: Comprehensive logging for debugging
- **Fallback components**: Proper error boundaries and fallback UI

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- Telegram Bot Token (for testing)

## 🚀 Quick Start

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/telegram-mini-app-boilerplate.git
   cd telegram-mini-app-boilerplate
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure your app**
   Edit `src/config/app.ts` with your information:

   ```typescript
   export const APP_CONFIG = {
     name: "Your Name",
     title: "Your App Title",
     description: "Your app description",
     version: "1.0.0",
     telegramUrl: "https://t.me/YourBot",
     telegramUsername: "@YourBot",
     // ... your custom features
   };
   ```

4. **Start development server**

   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── App.tsx          # Main app component with routing
│   ├── ErrorBoundary.tsx # Error handling component
│   ├── LoadingScreen/    # Loading states
│   └── ...
├── pages/               # Page components
│   ├── IndexPage/       # Main dashboard
│   ├── UserProfilePage/ # User profile and info
│   ├── SettingsPage/    # App settings
│   └── ...
├── navigation/          # Routing configuration
│   └── routes.tsx       # Route definitions and utilities
├── config/             # App configuration
│   └── app.ts          # App settings and features
├── types/              # TypeScript type definitions
│   └── telegram.d.ts   # Telegram WebApp types
├── helpers/            # Utility functions
└── init.ts             # App initialization
```

## 🚀 Deployment

### Vercel Deployment (Recommended)

This boilerplate is optimized for Vercel deployment with automatic GitHub integration:

1. **Connect to Vercel**

   - Go to [Vercel](https://vercel.com/)
   - Connect your GitHub repository
   - Vercel will automatically detect it's a React app

2. **Environment Variables** (Optional)

   - Set `NODE_ENV=production` (usually automatic)
   - Add any custom environment variables you need

3. **Deploy**
   - Push to your main branch
   - Vercel will automatically build and deploy
   - You'll get a production URL immediately

### Manual Deployment

1. **Build the app**

   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting provider

### GitHub Pages

1. Update the `homepage` field in `package.json`
2. Build and deploy:
   ```bash
   npm run build
   npm run deploy
   ```

## 🔧 Configuration

### Route Configuration

Routes are defined in `src/navigation/routes.tsx` with enhanced metadata:

```typescript
export interface Route {
  path: string;
  Component: ComponentType;
  title?: string;
  icon?: JSX.Element;
  showInNavigation?: boolean;
  requiresAuth?: boolean;
  showInDev?: boolean;
  showInProd?: boolean;
  description?: string;
  category?: "main" | "debug" | "profile" | "settings";
}
```

### Environment-Specific Features

The app automatically adjusts features based on the environment:

**Development Mode:**

- Shows all routes including debug tools
- Detailed error messages
- Debug information in UI
- Developer settings panel

**Production Mode:**

- Only essential routes visible
- Simplified error messages
- Optimized performance
- User-focused features only

## 📱 Pages Overview

### 🏠 Home Page (`/`)

- App overview and navigation
- Categorized feature access
- Environment-specific tools
- Quick actions for common tasks

### 👤 User Profile (`/profile`)

- User information display
- Session details
- Account status
- Profile management

### ⚙️ Settings (`/settings`)

- App preferences
- Theme configuration
- Notification settings
- Developer options (dev mode only)

### 🔗 TON Connect (`/ton-connect`)

- Blockchain wallet connection
- Transaction management
- Wallet information display

### 🛠️ Debug Tools (Development Only)

- Init Data (`/init-data`)
- Theme Parameters (`/theme-params`)
- Launch Parameters (`/launch-params`)

## 🎨 Customization

### Adding New Routes

1. Create your page component
2. Add route definition in `src/navigation/routes.tsx`
3. Configure route metadata (category, visibility, etc.)

```typescript
{
  path: "/your-page",
  Component: YourPageComponent,
  title: "Your Page",
  showInNavigation: true,
  showInDev: true,
  showInProd: true,
  category: 'main',
  description: "Your page description"
}
```

### Customizing Themes

The app automatically syncs with Telegram themes. You can customize additional styling in your components using CSS variables:

```css
/* Telegram theme variables are automatically available */
.your-component {
  background-color: var(--tg-theme-bg-color);
  color: var(--tg-theme-text-color);
}
```

## 🔐 Security Considerations

- Debug routes are automatically hidden in production
- Error messages are sanitized for production
- Environment-specific configurations
- Secure handling of user data
- CSP headers configured for Vercel deployment

## 🧪 Testing

- Test in both development and production environments
- Verify proper route filtering
- Test error boundaries
- Validate user profile functionality
- Check settings persistence

## 📚 Documentation

- **TypeScript** - Full type safety
- **Component documentation** - Inline JSDoc comments
- **Route metadata** - Comprehensive route descriptions
- **Environment guides** - Development and production setup

## 🐛 Troubleshooting

### "Too Old Telegram Client" Error

This error has been fixed in the latest version. If you still encounter it:

1. Make sure you're using the latest SDK version
2. Check that the Telegram WebApp script is loaded in the HTML head
3. Verify that your Mini App URL is correct in BotFather
4. Test in both development and production environments

### Development Issues

1. **App not loading in development**

   - Check that `npm run dev` is running
   - Verify the port (default: 5173) is accessible
   - Check browser console for errors

2. **Telegram features not working**
   - Ensure you're testing in the Telegram environment
   - Check that the WebApp script is loaded
   - Verify BotFather configuration

### Production Issues

1. **App not loading on Vercel**

   - Check the build logs in Vercel dashboard
   - Verify all dependencies are installed
   - Check for TypeScript errors

2. **Telegram integration not working**
   - Verify the production URL is set correctly in BotFather
   - Check that HTTPS is enabled
   - Ensure CSP headers allow Telegram scripts

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Telegram Apps SDK](https://github.com/Telegram-Mini-Apps/telegram-apps) - Official Telegram Mini Apps SDK
- [Telegram UI](https://github.com/Telegram-Mini-Apps/telegram-ui) - UI components for Telegram Mini Apps
- [React Router](https://reactrouter.com/) - Routing library
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Vite](https://vitejs.dev/) - Build tool

## 📞 Support

- Create an issue for bug reports
- Join our Telegram community: [Your Telegram Link]
- Check the documentation for common questions

---

Built with ❤️ for the Telegram Mini Apps ecosystem
