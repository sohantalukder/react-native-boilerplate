#!/usr/bin/env node

/**
 * Post-initialization script for React Native Boilerplate Template
 * This script runs after the template is initialized and performs cleanup tasks
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Running post-initialization script...');

// Get the project root directory (where the template was initialized)
const projectRoot = process.cwd();

// Ensure .gitignore exists
const gitignorePath = path.join(projectRoot, '.gitignore');
if (!fs.existsSync(gitignorePath)) {
  console.log('⚠️  .gitignore file not found, creating one...');
  const defaultGitignore = `# OSX
#
.DS_Store

# Xcode
#
build/
*.pbxuser
!default.pbxuser
*.mode1v3
!default.mode1v3
*.mode2v3
!default.mode2v3
*.perspectivev3
!default.perspectivev3
xcuserdata
*.xccheckout
*.moved-aside
DerivedData
*.hmap
*.ipa
*.xcuserstate
**/.xcode.env.local

# Android/IntelliJ
#
build/
.idea
.gradle
local.properties
*.iml
*.hprof
.cxx/
*.keystore
!debug.keystore
.kotlin/

# fastlane
#
**/fastlane/report.xml
**/fastlane/Preview.html
**/fastlane/screenshots
**/fastlane/test_output

# Bundle artifact
*.jsbundle

# Ruby / CocoaPods
**/Pods/
/vendor/bundle/

# Temporary files created by Metro to check the health of the file watcher
.metro-health-check*

# testing
/coverage

# Yarn
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/sdks
!.yarn/versions

# eslint
.eslintcache

# vscode
.vscode/*

# node.js
#
node_modules/
npm-debug.log
yarn-error.log
yarn.lock

# testing
/coverage
Gemfile.lock
Podfile.lock
debug.keystore

# react-native-config codegen
ios/Config.xcconfig
android/app/src/main/assets/env.txt
ios/tmp.xcconfig

# Build logs
build-logs/
`;
  fs.writeFileSync(gitignorePath, defaultGitignore);
  console.log('✅ Created .gitignore file');
} else {
  console.log('✅ .gitignore file already exists');
}

// Clean up any template-specific files that shouldn't be in the final project
const filesToRemove = [
  'template.config.js',
  'RELEASE_NOTES_TEMPLATE.md',
  'scripts/post-init.js'
];

// Remove template-specific files
filesToRemove.forEach(file => {
  const filePath = path.join(projectRoot, file);
  if (fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(filePath);
      console.log(`✅ Removed: ${file}`);
    } catch (error) {
      console.warn(`⚠️  Could not remove ${file}: ${error.message}`);
    }
  }
});

// Remove the scripts directory if it's empty
const scriptsDir = path.join(projectRoot, 'scripts');
if (fs.existsSync(scriptsDir)) {
  try {
    const files = fs.readdirSync(scriptsDir);
    if (files.length === 0) {
      fs.rmdirSync(scriptsDir);
      console.log('✅ Removed empty scripts directory');
    }
  } catch (error) {
    console.warn(`⚠️  Could not remove scripts directory: ${error.message}`);
  }
}

// Ensure Android debug.keystore exists to prevent :app:validateSigningDebug failures
try {
  const androidAppPath = path.join(projectRoot, 'android', 'app');
  const debugKeystorePath = path.join(androidAppPath, 'debug.keystore');
  const homeDir = process.env.HOME || require('os').homedir();
  const globalDebugKeystorePath = path.join(homeDir, '.android', 'debug.keystore');

  if (fs.existsSync(androidAppPath)) {
    const hasGlobal = fs.existsSync(globalDebugKeystorePath);
    const hasLocal = fs.existsSync(debugKeystorePath);

    if (!hasGlobal && !hasLocal) {
      console.log('🔐 Generating Android debug.keystore...');
      // Generate a PKCS12 debug keystore compatible with AGP 8+
      execSync(
        'keytool -genkeypair -v -storetype PKCS12 -keystore debug.keystore -alias androiddebugkey -storepass android -keypass android -validity 10000 -keyalg RSA -keysize 2048 -dname "CN=Android Debug,O=Android,C=US"',
        { stdio: 'ignore', cwd: androidAppPath }
      );
      console.log('✅ Created android/app/debug.keystore');
    } else if (hasGlobal) {
      console.log('✅ Using global ~/.android/debug.keystore; local generation not required');
    } else if (hasLocal) {
      console.log('✅ android/app/debug.keystore already exists');
    }
  } else {
    console.log('ℹ️  Android project not found; skipping keystore generation');
  }
} catch (error) {
  console.warn(`⚠️  Could not generate debug.keystore automatically: ${error.message}`);
  console.warn('   You can create it manually by running:');
  console.warn('   cd android/app && keytool -genkeypair -v -storetype PKCS12 -keystore debug.keystore -alias androiddebugkey -storepass android -keypass android -validity 10000 -keyalg RSA -keysize 2048 -dname "CN=Android Debug,O=Android,C=US"');
}

// Update package.json to remove template-specific scripts
const packageJsonPath = path.join(projectRoot, 'package.json');
if (fs.existsSync(packageJsonPath)) {
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    // Remove template-specific scripts
    const scriptsToRemove = [
      'test:template',
      'setup-pages',
      'fix-pages',
      'release:notes',
      'release:changelog',
      'release:create',
      'release:patch',
      'release:minor',
      'release:major'
    ];
    
    scriptsToRemove.forEach(script => {
      if (packageJson.scripts && packageJson.scripts[script]) {
        delete packageJson.scripts[script];
        console.log(`✅ Removed script: ${script}`);
      }
    });
    
    // Update the package name and description
    if (packageJson.name === 'ReactNativeTemplate') {
      packageJson.name = 'MyReactNativeApp';
      console.log('✅ Updated package name');
    }
    
    if (packageJson.description && packageJson.description.includes('React Native Template')) {
      packageJson.description = 'A React Native application built with modern tools and best practices';
      console.log('✅ Updated package description');
    }
    
    // Remove template-specific fields
    delete packageJson.publishConfig;
    delete packageJson.homepage;
    delete packageJson.repository;
    delete packageJson.keywords;
    delete packageJson.files;
    delete packageJson.peerDependencies;
    
    // Write the updated package.json
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
    console.log('✅ Updated package.json');
    
  } catch (error) {
    console.warn(`⚠️  Could not update package.json: ${error.message}`);
  }
}

// Update README.md to remove template-specific content
const readmePath = path.join(projectRoot, 'README.md');
if (fs.existsSync(readmePath)) {
  try {
    let readmeContent = fs.readFileSync(readmePath, 'utf8');
    
    // Replace template-specific content
    readmeContent = readmeContent
      .replace(/React Native Template/g, 'My React Native App')
      .replace(/react-native-boilerplate/g, 'my-react-native-app')
      .replace(/@sohantalukder\/react-native-boilerplate/g, 'my-react-native-app');
    
    // Add a simple project description
    const projectDescription = `# My React Native App

A React Native application built with modern tools and best practices.

## Getting Started

1. Install dependencies:
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

2. For iOS, install pods:
   \`\`\`bash
   cd ios && pod install && cd ..
   \`\`\`

3. Run the app:
   \`\`\`bash
   # iOS
   npx react-native run-ios
   
   # Android
   npx react-native run-android
   \`\`\`

## Features

- TypeScript support
- Navigation with React Navigation
- State management with Zustand
- HTTP client with React Query
- UI components and theming
- Internationalization support
- Modern development tools

## Project Structure

- \`src/\` - Source code
- \`src/navigation/\` - Navigation configuration
- \`src/modules/\` - Feature modules
- \`src/shared/\` - Shared components and utilities
- \`src/theme/\` - Theme configuration
- \`src/translations/\` - Internationalization files

Happy coding! 🚀
`;
    
    fs.writeFileSync(readmePath, projectDescription);
    console.log('✅ Updated README.md');
    
  } catch (error) {
    console.warn(`⚠️  Could not update README.md: ${error.message}`);
  }
}

console.log('🎉 Post-initialization script completed successfully!');
console.log('📝 Next steps:');
console.log('   1. Run "npm install" or "yarn install" to install dependencies');
console.log('   2. For iOS: cd ios && pod install && cd ..');
console.log('   3. Run "npx react-native run-ios" or "npx react-native run-android"');
console.log('   4. Start building your amazing app! 🚀');
