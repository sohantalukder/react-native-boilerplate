#!/usr/bin/env node

/**
 * GitHub Pages Setup Helper
 * 
 * This script helps set up GitHub Pages for your repository.
 * It provides instructions and checks for common issues.
 */

const https = require('https');

function makeRequest(options) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve({ statusCode: res.statusCode, data });
        }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

async function checkGitHubPages() {
  console.log('🔍 GitHub Pages Setup Helper\n');
  
  // Instructions for manual setup
  console.log('📋 Manual Setup Instructions:');
  console.log('1. Go to your repository on GitHub');
  console.log('2. Click on "Settings" tab');
  console.log('3. Scroll down to "Pages" section');
  console.log('4. Under "Source", select "GitHub Actions"');
  console.log('5. Save the settings');
  console.log('6. Push any changes to trigger the workflow\n');
  
  console.log('🌐 Your documentation will be available at:');
  console.log('https://sohantalukder.github.io/react-native-boilerplate/\n');
  
  console.log('🚀 Common Issues & Solutions:');
  console.log('• If you see the README instead of the docs:');
  console.log('  - Make sure GitHub Pages source is set to "GitHub Actions"');
  console.log('  - Wait for the workflow to complete successfully');
  console.log('  - Clear your browser cache');
  console.log('');
  console.log('• If the workflow fails:');
  console.log('  - Check the Actions tab for error details');
  console.log('  - Ensure all dependencies are properly installed');
  console.log('  - Try triggering a manual workflow dispatch');
  console.log('');
  console.log('• If pages are not updating:');
  console.log('  - GitHub Pages can take 5-10 minutes to update');
  console.log('  - Try hard refresh (Ctrl+F5 or Cmd+Shift+R)');
  console.log('  - Check if the latest workflow completed successfully');
}

if (require.main === module) {
  checkGitHubPages().catch(console.error);
}

module.exports = { checkGitHubPages }; 