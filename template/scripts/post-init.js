#!/usr/bin/env node

/**
 * Post-initialization script for React Native Boilerplate Template
 * This script runs after the template is initialized and performs cleanup tasks
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Running post-initialization script...');

// Get the project root directory (where the template was initialized)
const projectRoot = process.cwd();

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
