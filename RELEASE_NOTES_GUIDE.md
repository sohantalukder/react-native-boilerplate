# Release Notes System Guide

This guide explains how to use the comprehensive release notes system included in this React Native boilerplate.

## 📋 Overview

The release notes system provides:
- ✅ Automated changelog generation
- 🏷️ GitHub release creation
- 📦 NPM publishing integration
- 🔄 Semantic versioning support
- 📝 Conventional commit parsing

## 🚀 Quick Start

### View current release notes
```bash
npm run release:notes
```

### Create a new release
```bash
# Patch release (1.0.0 → 1.0.1)
npm run release:patch

# Minor release (1.0.0 → 1.1.0)
npm run release:minor

# Major release (1.0.0 → 2.0.0)
npm run release:major
```

### Update changelog only
```bash
npm run release:changelog
```

## 📁 Files Structure

```
├── CHANGELOG.md                      # Main changelog file
├── scripts/
│   └── generate-release-notes.js     # Release automation script
├── .github/
│   └── workflows/
│       └── release.yml               # GitHub release workflow
└── template/
    └── RELEASE_NOTES_TEMPLATE.md     # Template for generated projects
```

## 🔧 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run release:notes` | Display release notes for current version |
| `npm run release:changelog` | Update CHANGELOG.md with current version |
| `npm run release:create` | Create GitHub release with current version |
| `npm run release:patch` | Version bump + changelog + GitHub release |
| `npm run release:minor` | Version bump + changelog + GitHub release |
| `npm run release:major` | Version bump + changelog + GitHub release |

## 📝 Changelog Format

The system follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) format:

```markdown
# Changelog

## [Unreleased]

### Added
- New features for the next release

### Changed
- Changes in existing functionality

### Fixed
- Bug fixes

## [1.0.0] - 2024-12-31

### Added
- Initial release features
```

## 🤖 Automated Features

### Conventional Commit Parsing
The system automatically parses commit messages and categorizes them:

```bash
feat: add new component       # → ✨ Added
fix: resolve navigation bug   # → 🐛 Fixed
docs: update README          # → 📚 Documentation
style: format code           # → 💄 Style
refactor: improve structure  # → ♻️ Refactor
perf: optimize loading       # → ⚡ Performance
test: add unit tests         # → 🧪 Tests
chore: update dependencies   # → 🔧 Chore
```

### GitHub Integration
- Automatic release creation on version tags
- Release notes from changelog
- NPM publishing integration
- Pre-release detection (alpha, beta, rc)

## 🛠️ Setup Instructions

### 1. GitHub Secrets
Add these secrets to your GitHub repository:

```
NPM_TOKEN=your_npm_token_here
```

### 2. GitHub CLI (Optional)
Install GitHub CLI for enhanced functionality:
```bash
# macOS
brew install gh

# Login
gh auth login
```

### 3. Git Configuration
Ensure your git is configured:
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## 📚 Usage Examples

### Manual Release Process

1. **Update the changelog**:
   ```bash
   # Edit CHANGELOG.md manually
   vim CHANGELOG.md
   ```

2. **Bump version and create release**:
   ```bash
   npm run version:patch
   npm run release:create
   ```

### Automated Release Process

1. **Make changes and commit**:
   ```bash
   git add .
   git commit -m "feat: add new authentication flow"
   ```

2. **Create release**:
   ```bash
   npm run release:minor
   ```

### Hotfix Release

1. **Create hotfix branch**:
   ```bash
   git checkout -b hotfix/critical-bug
   ```

2. **Make fix and commit**:
   ```bash
   git commit -m "fix: resolve critical security issue"
   ```

3. **Create patch release**:
   ```bash
   npm run release:patch
   ```

## 🔄 Workflow Integration

### GitHub Actions
The included workflow (`.github/workflows/release.yml`) automatically:

1. Triggers on version tag push
2. Generates release notes
3. Creates GitHub release
4. Publishes to NPM
5. Updates changelog on main branch

### Manual Trigger
You can also manually trigger releases from GitHub:
1. Go to Actions tab
2. Select "Release" workflow
3. Click "Run workflow"
4. Enter version number

## 📋 Best Practices

### Commit Messages
Use conventional commits for better automation:
```bash
# Good
feat(auth): add OAuth login support
fix(navigation): resolve back button issue on Android
docs: update installation guide

# Avoid
Updated some stuff
Fixed bug
Changes
```

### Changelog Updates
- Update before each release
- Use clear, user-focused language
- Include breaking change notes
- Add migration instructions when needed

### Version Strategy
- **Patch**: Bug fixes, security updates
- **Minor**: New features, backward compatible
- **Major**: Breaking changes, major updates

## 🐛 Troubleshooting

### Common Issues

**Script not found**:
```bash
# Ensure script is executable
chmod +x scripts/generate-release-notes.js
```

**GitHub release fails**:
```bash
# Install GitHub CLI
brew install gh
gh auth login
```

**NPM publish fails**:
```bash
# Check authentication
npm whoami
npm login
```

### Debug Mode
Add debug logging to the release script:
```bash
DEBUG=1 npm run release:notes
```

## 🔗 Integration with Your Project

When using this boilerplate:

1. **Copy changelog format** to your project
2. **Update repository URLs** in scripts
3. **Configure GitHub secrets** for automation
4. **Customize release categories** as needed

## 📖 Additional Resources

- [Keep a Changelog](https://keepachangelog.com/)
- [Semantic Versioning](https://semver.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [GitHub Releases](https://docs.github.com/en/repositories/releasing-projects-on-github)

---

**Need help?** Check the [issues](https://github.com/sohantalukder/react-native-boilerplate/issues) or create a new one! 