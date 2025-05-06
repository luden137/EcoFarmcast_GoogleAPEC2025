# Setting Up Run Configuration in Android Studio

When you open the EcoFarmCast project in Android Studio, you may need to create a run configuration. Here's how to set it up:

## Creating a Run Configuration

1. Click on the "Add Configuration" button near the top-right corner of Android Studio.

2. In the "Run/Debug Configurations" dialog that appears, click the "+" button in the top-left corner.

3. Select "Android App" from the dropdown menu.

4. Configure the following settings:
   - **Name**: EcoFarmCast
   - **Module**: app
   - **Deploy**: Default APK
   - **Launch Options**: Default Activity
   - **Before Launch**: Gradle-aware Make

5. Click "Apply" and then "OK" to save the configuration.

## Alternative Method

If the above method doesn't work, try this alternative approach:

1. Open the `android` directory in Android Studio:
   - Close the current project if open
   - Select "Open an Existing Project" from the welcome screen
   - Navigate to `EcoFarmCastExpo/android` directory and select it

2. Wait for the project to sync with Gradle.

3. Once synced, you should see a dropdown menu in the toolbar with "app" selected.

4. Click the green "Run" button (triangle) next to it.

5. Select a device or emulator when prompted.

## Using Command Line Instead

If you continue to have issues with Android Studio's run configuration, you can use the command line approach:

1. Open a terminal/command prompt

2. Navigate to the EcoFarmCastExpo directory:
   ```bash
   cd path/to/EcoFarmCastExpo
   ```

3. Run one of the following commands:
   ```bash
   # Run in development mode (bypasses authentication)
   npm run start:dev
   # Then press 'a' when prompted to run on Android

   # OR run directly on Android
   npm run android
   ```

This will build and launch the app on your connected Android device or emulator.

## Troubleshooting

If you encounter issues with the run configuration:

1. **Gradle Sync Issues**:
   - Go to File > Sync Project with Gradle Files
   - Check the Gradle console for specific error messages

2. **Missing Android SDK**:
   - Go to File > Project Structure > SDK Location
   - Ensure the Android SDK path is correctly set

3. **Device Not Detected**:
   - Ensure USB debugging is enabled on your device
   - Check that your device is connected and recognized (run `adb devices` in terminal)

4. **Build Errors**:
   - Check the "Build" tab in Android Studio for specific error messages
   - Try "Clean Project" and then "Rebuild Project" from the Build menu
