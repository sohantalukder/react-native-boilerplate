#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Create GitHub Release Script
 * This script helps create a GitHub release with proper release notes
 */

const CHANGELOG_PATH = path.join(__dirname, '..', 'CHANGELOG.md');
const PACKAGE_JSON_PATH = path.join(__dirname, '..', 'package.json');

function getCurrentVersion() {
  const packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf8'));
  return packageJson.version;
}

function extractReleaseNotes(version) {
  if (!fs.existsSync(CHANGELOG_PATH)) {
    return `## Release v${version}\n\nInitial release of React Native Boilerplate.`;
  }

  const changelogContent = fs.readFileSync(CHANGELOG_PATH, 'utf8');
  
  // Extract the section for the specific version
  const versionRegex = new RegExp(`## \\[${version}\\]([\\s\\S]*?)(?=## \\[|\\[Unreleased\\]:|$)`, 'i');
  const match = changelogContent.match(versionRegex);
  
  if (match) {
    let notes = match[1].trim();
    
    // Clean up the notes - remove the date line and link references
    notes = notes.replace(/^- \d{4}-\d{2}-\d{2}\s*$/m, '');
    notes = notes.replace(/^\[.*?\]:.*$/gm, '');
    notes = notes.trim();
    
    return `## Release v${version}\n\n${notes}`;
  }
  
  return `## Release v${version}\n\nRelease notes not found in changelog.`;
}

function generateReleaseCommand() {
  const version = getCurrentVersion();
  const releaseNotes = extractReleaseNotes(version);
  
  // Create a temporary file with release notes
  const tempFile = path.join(__dirname, 'release-notes-temp.md');
  fs.writeFileSync(tempFile, releaseNotes);
  
  console.log(`\n🎯 GitHub Release Creation Guide for v${version}\n`);
  console.log('📋 Release Notes (saved to release-notes-temp.md):');
  console.log('=' + '='.repeat(60));
  console.log(releaseNotes);
  console.log('=' + '='.repeat(60));
  
  console.log('\n🚀 Ways to create the GitHub release:\n');
  
  console.log('📱 Option 1: Manual (Recommended)');
  console.log(`   1. Go to: https://github.com/sohantalukder/react-native-boilerplate/releases/new?tag=v${version}`);
  console.log(`   2. Set title: "Release v${version}"`);
  console.log(`   3. Copy the release notes above into the description`);
  console.log(`   4. Click "Publish release"`);
  
  console.log('\n💻 Option 2: Using GitHub CLI (if installed)');
  console.log(`   gh release create v${version} --title "Release v${version}" --notes-file "${tempFile}"`);
  
  console.log('\n🤖 Option 3: Using curl (API)');
  console.log(`   curl -X POST \\`);
  console.log(`     -H "Authorization: token YOUR_GITHUB_TOKEN" \\`);
  console.log(`     -H "Content-Type: application/json" \\`);
  console.log(`     -d '{"tag_name":"v${version}","name":"Release v${version}","body":"$(cat ${tempFile} | sed 's/"/\\\\"/g' | tr '\\n' ' ')"}' \\`);
  console.log(`     https://api.github.com/repos/sohantalukder/react-native-boilerplate/releases`);
  
  console.log(`\n📄 Release notes have been saved to: ${tempFile}`);
  console.log('\n✨ After creating the release, you can delete the temp file.');
  
  return tempFile;
}

if (require.main === module) {
  generateReleaseCommand();
}

module.exports = { generateReleaseCommand, extractReleaseNotes }; 