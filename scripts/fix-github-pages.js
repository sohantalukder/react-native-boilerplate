#!/usr/bin/env node

/**
 * Script to fix GitHub Pages configuration and ensure documentation deployment
 * Run with: node scripts/fix-github-pages.js
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

function checkDocumentationBuild() {
  const outPath = path.join(__dirname, '..', 'documentation', 'out');
  const indexPath = path.join(outPath, 'index.html');
  
  return {
    outExists: fs.existsSync(outPath),
    indexExists: fs.existsSync(indexPath),
    outPath,
    indexPath
  };
}

function main() {
  console.log('🔧 Fixing GitHub Pages to deploy documentation instead of README...\n');
  
  // Get repository information
  const repoInfo = getRepositoryInfo();
  if (!repoInfo) {
    console.error('❌ Could not determine GitHub repository information');
    process.exit(1);
  }
  
  console.log(`✅ Repository: ${repoInfo.url}`);
  
  // Check documentation build
  const buildInfo = checkDocumentationBuild();
  
  console.log('\n📋 Current Status:');
  console.log(`📁 Documentation build folder exists: ${buildInfo.outExists ? '✅' : '❌'}`);
  console.log(`📄 Index.html exists: ${buildInfo.indexExists ? '✅' : '❌'}`);
  
  if (!buildInfo.outExists || !buildInfo.indexExists) {
    console.log('\n🔨 Building documentation first...');
    console.log('📝 Run this command:');
    console.log('   cd documentation && yarn build:github');
    console.log('');
  }
  
  console.log('🚨 ISSUE IDENTIFIED:');
  console.log('Your GitHub Pages is currently deploying the README.md file instead of the documentation.');
  console.log('');
  
  console.log('🔧 TO FIX THIS:');
  console.log('');
  console.log('1. 🌐 Go to your repository settings:');
  console.log(`   ${repoInfo.url}/settings/pages`);
  console.log('');
  console.log('2. 📋 Change the source:');
  console.log('   - CURRENTLY: "Deploy from a branch" (main/root or main/docs)');
  console.log('   - CHANGE TO: "GitHub Actions"');
  console.log('');
  console.log('3. 💾 Save the settings');
  console.log('');
  console.log('4. 🚀 Trigger the workflow:');
  console.log('   git add .');
  console.log('   git commit -m "Fix GitHub Pages to deploy documentation"');
  console.log('   git push origin main');
  console.log('');
  console.log('5. ⏱️  Wait for deployment (2-3 minutes)');
  console.log('');
  console.log('🎯 RESULT:');
  console.log(`   Your documentation will be available at: https://${repoInfo.owner}.github.io/${repoInfo.repo}/`);
  console.log('   Instead of the current README content');
  console.log('');
  console.log('💡 WHY THIS HAPPENS:');
  console.log('   - GitHub Pages defaults to deploying from a branch (showing README)');
  console.log('   - We need to use "GitHub Actions" source to deploy our built documentation');
  console.log('   - The workflow builds the Next.js documentation and deploys it properly');
}

if (require.main === module) {
  main();
} 