#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const TEST_PROJECT_NAME = 'TestTemplate';
const TEST_DIR = path.join(__dirname, '..', 'test-template');

console.log('🧪 Testing React Native Template...\n');

// Clean up previous test
if (fs.existsSync(TEST_DIR)) {
  console.log('🧹 Cleaning up previous test...');
  execSync(`rm -rf ${TEST_DIR}`, { stdio: 'inherit' });
}

// Create test directory
fs.mkdirSync(TEST_DIR, { recursive: true });

try {
  // Test template creation
  console.log('📦 Creating test project...');
  execSync(`npx @react-native-community/cli@latest init ${TEST_PROJECT_NAME} --template file://${process.cwd()}`, {
    cwd: TEST_DIR,
    stdio: 'inherit'
  });

  const projectPath = path.join(TEST_DIR, TEST_PROJECT_NAME);
  
  // Verify project structure
  console.log('\n✅ Verifying project structure...');
  const requiredFiles = [
    'package.json',
    'src/index.tsx',
    'src/navigation/index.tsx',
    'src/theme',
    'src/config',
    'src/shared/components',
    'ios',
    'android'
  ];

  for (const file of requiredFiles) {
    const filePath = path.join(projectPath, file);
    if (!fs.existsSync(filePath)) {
      throw new Error(`Missing required file/directory: ${file}`);
    }
  }

  // Test TypeScript compilation
  console.log('🔍 Testing TypeScript compilation...');
  execSync('npx tsc --noEmit', {
    cwd: projectPath,
    stdio: 'inherit'
  });

  // Test linting
  console.log('🔍 Testing ESLint...');
  execSync('npm run lint:rules', {
    cwd: projectPath,
    stdio: 'inherit'
  });

  console.log('\n🎉 Template test completed successfully!');
  console.log(`✅ Test project created at: ${projectPath}`);

} catch (error) {
  console.error('\n❌ Template test failed:', error.message);
  process.exit(1);
} finally {
  // Clean up
  console.log('\n🧹 Cleaning up test files...');
  if (fs.existsSync(TEST_DIR)) {
    execSync(`rm -rf ${TEST_DIR}`, { stdio: 'inherit' });
  }
} 