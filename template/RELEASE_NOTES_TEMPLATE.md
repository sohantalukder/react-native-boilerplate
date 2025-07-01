# Release Notes Template

This template provides a structured approach to managing release notes for your React Native application.

## Quick Start

1. **Copy the changelog format**: Use the `CHANGELOG.md` format from the boilerplate root
2. **Update before releases**: Always update the changelog before creating a new release
3. **Follow semantic versioning**: Use patch, minor, or major version updates appropriately

## Changelog Format

Follow the [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) format:

```markdown
# Changelog

## [Unreleased]

### Added
- New features

### Changed
- Changes in existing functionality

### Deprecated
- Soon-to-be removed features

### Removed
- Removed features

### Fixed
- Bug fixes

### Security
- Security improvements

## [1.0.0] - 2024-01-15

### Added
- Initial release
```

## Version Types

- **Patch (1.0.x)**: Bug fixes, small improvements
- **Minor (1.x.0)**: New features, backwards compatible
- **Major (x.0.0)**: Breaking changes, major updates

## Release Process

### Manual Release
```bash
# Update version and create changelog
npm run version:patch  # or minor/major
npm run release:create
```

### Automated Release
```bash
# Just update version, CI handles the rest
git tag v1.0.1
git push origin v1.0.1
```

## Best Practices

### Commit Messages
Use conventional commits for automatic release note generation:

```
feat: add new authentication flow
fix: resolve navigation issue on Android
docs: update API documentation
chore: update dependencies
```

### Release Notes Content

**Good Release Notes:**
- Clear, user-focused language
- Grouped by category (Added, Fixed, etc.)
- Include migration notes for breaking changes
- Link to relevant documentation

**Example:**
```markdown
## [2.1.0] - 2024-01-15

### Added
- 🎉 **New Dark Mode**: Toggle between light and dark themes in settings
- 📱 **Offline Support**: App now works without internet connection
- 🔔 **Push Notifications**: Real-time notifications for important updates

### Fixed
- 🐛 **Android Navigation**: Fixed back button behavior on Android 14
- 🔧 **Memory Leak**: Resolved memory leak in image carousel component

### Changed
- ⚡ **Performance**: 40% faster app startup time
- 🎨 **UI Updates**: Refreshed design system with new colors and typography

### Migration Notes
- Update your theme configuration to support dark mode
- Check custom navigation components for Android compatibility
```

## Release Checklist

### Before Release
- [ ] Update CHANGELOG.md with new version
- [ ] Test on both iOS and Android
- [ ] Update version in `package.json`
- [ ] Create and test release builds
- [ ] Update documentation if needed

### During Release
- [ ] Create git tag: `git tag v1.0.0`
- [ ] Push tag: `git push origin v1.0.0`
- [ ] Verify GitHub release creation
- [ ] Check app store deployment (if applicable)

### After Release
- [ ] Update main branch with changelog
- [ ] Notify team and users
- [ ] Monitor for issues
- [ ] Plan next release cycle

## Tools Integration

### GitHub Releases
Automatic release creation when pushing version tags.

### App Store Connect / Google Play Console
Link your CI/CD pipeline to automatically deploy to app stores.

### Analytics
Track adoption of new features and identify issues:

```javascript
// Track feature usage
Analytics.track('feature_used', {
  feature: 'dark_mode',
  version: '2.1.0'
});
```

## Sample Workflow

1. **Development**: Work on features, write tests
2. **Pre-release**: Update changelog, bump version
3. **Release**: Push tag, automated deployment
4. **Post-release**: Monitor, gather feedback
5. **Hotfix**: If needed, create patch release

Remember: Good release notes help users understand what's new and how to use your app effectively! 