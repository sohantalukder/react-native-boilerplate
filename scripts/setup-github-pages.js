#!/usr/bin/env node

/**
 * Script to set up GitHub Pages for documentation deployment
 * Run with: node scripts/setup-github-pages.js
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

function checkWorkflowExists() {
  const workflowPath = path.join(__dirname, '..', '.github', 'workflows', 'deploy-docs.yml');
  return fs.existsSync(workflowPath);
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
  console.log('🚀 Setting up GitHub Pages for documentation deployment...\n');
  
  // Get repository information
  const repoInfo = getRepositoryInfo();
  if (!repoInfo) {
    console.error('❌ Could not determine GitHub repository information');
    process.exit(1);
  }
  
  console.log(`✅ Repository: ${repoInfo.url}`);
  
  // Check if workflow exists
  const workflowExists = checkWorkflowExists();
  console.log(`📋 GitHub Actions workflow: ${workflowExists ? '✅' : '❌'}`);
  
  // Check documentation build
  const buildInfo = checkDocumentationBuild();
  console.log(`📁 Documentation build: ${buildInfo.outExists ? '✅' : '❌'}`);
  console.log(`📄 Index.html: ${buildInfo.indexExists ? '✅' : '❌'}`);
  
  if (!workflowExists) {
    console.log('\n❌ GitHub Actions workflow not found!');
    console.log('Please make sure the .github/workflows/deploy-docs.yml file exists.');
    process.exit(1);
  }
  
  if (!buildInfo.outExists || !buildInfo.indexExists) {
    console.log('\n🔨 Building documentation...');
    try {
      execSync('cd documentation && yarn build:github', { stdio: 'inherit' });
      console.log('✅ Documentation built successfully!');
    } catch (error) {
      console.error('❌ Failed to build documentation:', error.message);
      process.exit(1);
    }
  }
  
  console.log('\n🎯 NEXT STEPS:');
  console.log('');
  console.log('1. 🌐 Go to your repository settings:');
  console.log(`   ${repoInfo.url}/settings/pages`);
  console.log('');
  console.log('2. 📋 In the "Source" section:');
  console.log('   - CHANGE FROM: "Deploy from a branch" (currently showing README)');
  console.log('   - CHANGE TO: "GitHub Actions"');
  console.log('');
  console.log('3. 💾 Save the settings');
  console.log('');
  console.log('4. 🚀 Push your changes to trigger the workflow:');
  console.log('   git add .');
  console.log('   git commit -m "Add GitHub Actions workflow for documentation deployment"');
  console.log('   git push origin main');
  console.log('');
  console.log('5. ⏱️  Wait for deployment (2-3 minutes)');
  console.log('   - Check the Actions tab for deployment status');
  console.log('   - Look for the "Deploy Documentation to GitHub Pages" workflow');
  console.log('');
  console.log('🎉 RESULT:');
  console.log(`   Your documentation will be available at: https://${repoInfo.owner}.github.io/${repoInfo.repo}/`);
  console.log('   Instead of the current README content');
  console.log('');
  console.log('💡 WHAT THIS FIXES:');
  console.log('   - Currently: GitHub Pages shows your README.md file');
  console.log('   - After fix: GitHub Pages shows your beautiful documentation website');
  console.log('   - The workflow automatically builds and deploys your Next.js documentation');
}

if (require.main === module) {
  main();
}
