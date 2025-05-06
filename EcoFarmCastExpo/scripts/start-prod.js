/**
 * Production Mode Startup Script
 * 
 * This script ensures development mode is disabled before starting the app.
 * It modifies the devConfig.js file to set USE_DEV_MODE to false.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Path to the devConfig.js file
const devConfigPath = path.join(__dirname, '..', 'src', 'config', 'devConfig.js');

// Function to ensure production mode is enabled
function ensureProdMode() {
  try {
    console.log('Checking development mode configuration...');
    
    // Read the current content of devConfig.js
    let content = fs.readFileSync(devConfigPath, 'utf8');
    
    // Check if USE_DEV_MODE is set to true
    if (content.includes('export const USE_DEV_MODE = true')) {
      console.log('Setting development mode to disabled...');
      
      // Replace true with false
      content = content.replace('export const USE_DEV_MODE = true', 'export const USE_DEV_MODE = false');
      
      // Write the updated content back to the file
      fs.writeFileSync(devConfigPath, content, 'utf8');
      
      console.log('Production mode enabled successfully!');
    } else {
      console.log('Production mode is already enabled.');
    }
    
    return true;
  } catch (error) {
    console.error('Error ensuring production mode:', error);
    return false;
  }
}

// Function to start the app
function startApp() {
  try {
    console.log('\nStarting EcoFarmCast in production mode...\n');
    
    // Get any additional arguments passed to the script
    const args = process.argv.slice(2);
    
    // Check if there are additional arguments after "--"
    const dashIndex = args.indexOf('--');
    const expoArgs = dashIndex >= 0 ? args.slice(dashIndex + 1).join(' ') : '';
    
    // Execute the expo start command with any additional arguments
    const command = `npx expo start ${expoArgs}`;
    console.log(`Running: ${command}`);
    execSync(command, { stdio: 'inherit' });
    
    return true;
  } catch (error) {
    console.error('Error starting the app:', error);
    return false;
  }
}

// Main function
function main() {
  console.log('\n=== EcoFarmCast Production Mode Startup ===\n');
  
  // Ensure production mode is enabled
  const prodModeEnabled = ensureProdMode();
  
  if (prodModeEnabled) {
    // Start the app
    startApp();
  } else {
    console.error('\nFailed to ensure production mode. Please check the configuration manually.\n');
    process.exit(1);
  }
}

// Run the main function
main();
