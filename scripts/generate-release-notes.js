#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Generate release notes script
 * This script helps automate the release process by:
 * 1. Reading the current version from package.json
 * 2. Extracting release notes from CHANGELOG.md
 * 3. Creating formatted release notes
 * 4. Optionally creating GitHub releases
 */

const CHANGELOG_PATH = path.join(__dirname, '..', 'CHANGELOG.md');
const PACKAGE_JSON_PATH = path.join(__dirname, '..', 'package.json');

function getCurrentVersion() {
  const packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf8'));
  return packageJson.version;
}

function getGitCommitsSinceLastTag() {
  try {
    const lastTag = execSync('git describe --tags --abbrev=0', { encoding: 'utf8' }).trim();
    const commits = execSync(`git log ${lastTag}..HEAD --oneline`, { encoding: 'utf8' }).trim();
    return commits ? commits.split('\n') : [];
  } catch (error) {
    // If no tags exist, get all commits
    try {
      const commits = execSync('git log --oneline', { encoding: 'utf8' }).trim();
      return commits ? commits.split('\n') : [];
    } catch (e) {
      return [];
    }
  }
}

function extractReleaseNotes(version) {
  if (!fs.existsSync(CHANGELOG_PATH)) {
    console.warn('CHANGELOG.md not found. Creating basic release notes from git commits.');
    return generateReleaseNotesFromGit(version);
  }

  const changelogContent = fs.readFileSync(CHANGELOG_PATH, 'utf8');
  
  // Extract the section for the specific version
  const versionRegex = new RegExp(`## \\[${version}\\]([\\s\\S]*?)(?=## \\[|$)`, 'i');
  const match = changelogContent.match(versionRegex);
  
  if (match) {
    return match[1].trim();
  }
  
  // If specific version not found, try to extract from Unreleased section
  const unreleasedRegex = /## \[Unreleased\]([\s\S]*?)(?=## \[|$)/i;
  const unreleasedMatch = changelogContent.match(unreleasedRegex);
  
  if (unreleasedMatch) {
    console.log('Using unreleased changes for release notes.');
    return unreleasedMatch[1].trim();
  }
  
  return generateReleaseNotesFromGit(version);
}

function generateReleaseNotesFromGit(version) {
  const commits = getGitCommitsSinceLastTag();
  
  if (commits.length === 0) {
    return `### Changes\n\n- Initial release of version ${version}`;
  }
  
  const releaseNotes = ['### Changes\n'];
  
  commits.forEach(commit => {
    // Parse conventional commit format
    const conventionalRegex = /^(\w+)(\(.+\))?: (.+)$/;
    const match = commit.match(conventionalRegex);
    
    if (match) {
      const [, type, scope, description] = match;
      const scopeText = scope ? ` ${scope}` : '';
      
      switch (type.toLowerCase()) {
        case 'feat':
          releaseNotes.push(`- ✨ **Added${scopeText}:** ${description}`);
          break;
        case 'fix':
          releaseNotes.push(`- 🐛 **Fixed${scopeText}:** ${description}`);
          break;
        case 'docs':
          releaseNotes.push(`- 📚 **Documentation${scopeText}:** ${description}`);
          break;
        case 'style':
          releaseNotes.push(`- 💄 **Style${scopeText}:** ${description}`);
          break;
        case 'refactor':
          releaseNotes.push(`- ♻️ **Refactor${scopeText}:** ${description}`);
          break;
        case 'perf':
          releaseNotes.push(`- ⚡ **Performance${scopeText}:** ${description}`);
          break;
        case 'test':
          releaseNotes.push(`- 🧪 **Tests${scopeText}:** ${description}`);
          break;
        case 'chore':
          releaseNotes.push(`- 🔧 **Chore${scopeText}:** ${description}`);
          break;
        default:
          releaseNotes.push(`- ${description}`);
      }
    } else {
      // Handle non-conventional commits
      releaseNotes.push(`- ${commit}`);
    }
  });
  
  return releaseNotes.join('\n');
}

function updateChangelog(version, releaseNotes) {
  if (!fs.existsSync(CHANGELOG_PATH)) {
    console.log('Creating new CHANGELOG.md');
    const initialChangelog = `# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [${version}] - ${new Date().toISOString().split('T')[0]}

${releaseNotes}
`;
    fs.writeFileSync(CHANGELOG_PATH, initialChangelog);
    return;
  }

  const changelogContent = fs.readFileSync(CHANGELOG_PATH, 'utf8');
  const today = new Date().toISOString().split('T')[0];
  
  // Replace [Unreleased] section with the new version
  const updatedChangelog = changelogContent.replace(
    /## \[Unreleased\]([\s\S]*?)(?=## \[|$)/,
    `## [Unreleased]

## [${version}] - ${today}

${releaseNotes}

`
  );
  
  fs.writeFileSync(CHANGELOG_PATH, updatedChangelog);
  console.log(`✅ Updated CHANGELOG.md with version ${version}`);
}

function createGitHubRelease(version, releaseNotes) {
  try {
    // Create a temporary file with release notes
    const tempFile = path.join(__dirname, 'temp-release-notes.md');
    fs.writeFileSync(tempFile, releaseNotes);
    
    // Create git tag
    execSync(`git tag -a v${version} -m "Release v${version}"`, { stdio: 'inherit' });
    
    // Push tag
    execSync(`git push origin v${version}`, { stdio: 'inherit' });
    
    console.log(`✅ Created and pushed git tag v${version}`);
    
    // Try to create GitHub release using gh CLI if available
    try {
      execSync(`gh release create v${version} --title "Release v${version}" --notes-file "${tempFile}"`, { stdio: 'inherit' });
      console.log(`✅ Created GitHub release v${version}`);
    } catch (error) {
      console.log(`ℹ️  Git tag created. Create GitHub release manually at: https://github.com/sohantalukder/react-native-boilerplate/releases/new?tag=v${version}`);
    }
    
    // Clean up temp file
    fs.unlinkSync(tempFile);
    
  } catch (error) {
    console.error('❌ Error creating GitHub release:', error.message);
  }
}

function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  
  switch (command) {
    case 'generate':
      {
        const version = getCurrentVersion();
        const releaseNotes = extractReleaseNotes(version);
        console.log(`\n📋 Release Notes for v${version}:\n`);
        console.log('=' + '='.repeat(50));
        console.log(releaseNotes);
        console.log('=' + '='.repeat(50));
      }
      break;
      
    case 'update-changelog':
      {
        const version = args[1] || getCurrentVersion();
        const releaseNotes = extractReleaseNotes(version);
        updateChangelog(version, releaseNotes);
      }
      break;
      
    case 'create-release':
      {
        const version = getCurrentVersion();
        const releaseNotes = extractReleaseNotes(version);
        updateChangelog(version, releaseNotes);
        createGitHubRelease(version, releaseNotes);
      }
      break;
      
    default:
      console.log(`
📝 Release Notes Generator

Usage:
  node scripts/generate-release-notes.js [command]

Commands:
  generate          - Display release notes for current version
  update-changelog  - Update CHANGELOG.md with current version
  create-release    - Create GitHub release with current version
  
Examples:
  npm run release:notes
  npm run release:changelog
  npm run release:create
      `);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  getCurrentVersion,
  extractReleaseNotes,
  updateChangelog,
  createGitHubRelease
}; 