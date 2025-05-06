# EcoFarmCast - Sustainable Farming App

This is an [Expo](https://expo.dev) project for the EcoFarmCast application, a platform designed to help farmers implement sustainable practices through data-driven insights and recommendations.

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   # Standard start
   npm start
   
   # Start in development mode (bypasses authentication)
   npm run start:dev
   
   # Start in production mode (uses real authentication)
   npm run start:prod
   
   # Start web version in development mode
   npm run web:dev
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Development Mode

EcoFarmCast includes a development mode feature that makes testing and development easier by:

- Bypassing Firebase authentication
- Using mock user data
- Allowing access to all app features without requiring login
- Displaying a visual indicator when active

### Using Development Mode

You can run the app in development mode using:

```bash
npm run start:dev    # For native development
npm run web:dev      # For web development
```

Or switch to production mode with:

```bash
npm run start:prod   # For native development
npm run web:prod     # For web development
```

### Configuring Development Mode

You can customize development mode settings in `src/config/devConfig.js`:

```javascript
// Toggle development mode on/off
export const USE_DEV_MODE = true; // Set to false for production

// Customize the mock user
export const MOCK_USER = {
  uid: 'test-user-id',
  email: 'test@example.com',
  displayName: 'Test Farmer',
  // ...
};
```

For more details, see [DEV_MODE_README.md](./DEV_MODE_README.md).

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
