#!/usr/bin/env node

/**
 * Script to check GitHub Pages status and provide setup instructions
 * Run with: node scripts/enable-github-pages.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function getRepositoryInfo() {
  try {
    const remoteUrl = execSync('git remote get-url origin', { encoding: 'utf-8' }).trim();
    const match = remoteUrl.match(/github\.com[:/]([^/]+)\/([^/.]+)/);
    
    if (!match) {
      throw new Error('Could not parse GitHub repository from remote URL');
    }
    
    return {
      owner: match[1],
      repo: match[2].replace('.git', ''),
      url: `https://github.com/${match[1]}/${match[2].replace('.git', '')}`
    };
  } catch (error) {
    console.error('Error getting repository info:', error.message);
    return null;
  }
}

function checkDocumentationExists() {
  const docPath = path.join(__dirname, '..', 'documentation');
  const packageJsonPath = path.join(docPath, 'package.json');
  
  return fs.existsSync(docPath) && fs.existsSync(packageJsonPath);
}

function main() {
  console.log('🔍 Checking GitHub Pages setup for documentation deployment...\n');
  
  // Check if documentation exists
  if (!checkDocumentationExists()) {
    console.error('❌ Documentation directory or package.json not found');
    console.log('Make sure you have a documentation/ directory with a Next.js project');
    process.exit(1);
  }
  
  console.log('✅ Documentation directory found');
  
  // Get repository information
  const repoInfo = getRepositoryInfo();
  if (!repoInfo) {
    console.error('❌ Could not determine GitHub repository information');
    process.exit(1);
  }
  
  console.log(`✅ Repository: ${repoInfo.url}`);
  
  console.log('\n📋 To enable GitHub Pages for your documentation:');
  console.log('\n1. Go to your repository settings:');
  console.log(`   ${repoInfo.url}/settings/pages`);
  
  console.log('\n2. In the "Source" section, select "GitHub Actions"');
  
  console.log('\n3. Save the settings');
  
  console.log('\n4. Push changes to trigger the workflow:');
  console.log('   git add .');
  console.log('   git commit -m "Enable GitHub Pages deployment"');
  console.log('   git push origin main');
  
  console.log('\n5. Your documentation will be available at:');
  console.log(`   https://${repoInfo.owner}.github.io/${repoInfo.repo}/`);
  
  console.log('\n📝 Note: The first deployment may take a few minutes to become available.');
  console.log('Check the Actions tab for deployment status.');
}

if (require.main === module) {
  main();
} 