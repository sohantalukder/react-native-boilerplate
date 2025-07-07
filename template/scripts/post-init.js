#!/usr/bin/env node
/* eslint-disable no-console */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('\n🚀 Setting up your React Native project...\n');

const projectRoot = process.cwd();

// Function to execute commands
function execCommand(command, options = {}) {
  try {
    console.warn(`📦 Running: ${command}`);
    execSync(command, {
      stdio: 'inherit',
      cwd: projectRoot,
      ...options,
    });
  } catch (error) {
    console.error(`❌ Error running command: ${command}`);
    console.error(error.message);
  }
}

// Function to check if iOS platform is available
function isIOSAvailable() {
  try {
    execSync('which xcodebuild', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

// Function to check if Android SDK is available
function isAndroidAvailable() {
  const androidHome = process.env.ANDROID_HOME || process.env.ANDROID_SDK_ROOT;
  return androidHome && fs.existsSync(androidHome);
}

console.warn('✅ Project initialized successfully!');
console.warn('\n📋 Next steps:');

// Install dependencies
console.warn('\n1️⃣ Installing dependencies...');
if (fs.existsSync(path.join(projectRoot, 'yarn.lock'))) {
  execCommand('yarn install');
} else {
  execCommand('npm install');
}

// iOS setup
if (isIOSAvailable()) {
  console.warn('\n2️⃣ Setting up iOS...');
  try {
    // Install Ruby gems
    if (fs.existsSync(path.join(projectRoot, 'Gemfile'))) {
      execCommand('bundle install');
    }

    // Install CocoaPods
    execCommand('cd ios && bundle exec pod install');
    console.warn('✅ iOS setup completed');
  } catch (error) {
    console.warn('⚠️  iOS setup skipped - run "cd ios && bundle exec pod install" manually', error);
  }
} else {
  console.warn('\n⚠️  Xcode not found - iOS setup skipped');
}

// Android setup check
if (isAndroidAvailable()) {
  console.warn('\n✅ Android SDK detected');
} else {
  console.warn('\n⚠️  Android SDK not found - please set ANDROID_HOME environment variable');
}

// Husky setup
console.warn('\n3️⃣ Setting up Git hooks...');
try {
  if (fs.existsSync(path.join(projectRoot, '.git'))) {
    execCommand('npx husky init');
    console.warn('✅ Git hooks setup completed');
  } else {
    console.warn('⚠️  Git repository not found - initialize git first with "git init"');
  }
} catch (error) {
  console.warn('⚠️  Git hooks setup skipped', error);
}

console.warn('\n🎉 Setup completed! Your React Native project is ready.');
console.warn('\n📱 To run your app:');
console.warn('   iOS:     yarn ios     or  npm run ios');
console.warn('   Android: yarn android or  npm run android');
console.warn('\n📖 For more information, check the README.md file.');
console.warn('\n🐛 Happy coding! 🚀');
