# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed
- **BREAKING CHANGE**: Replaced `expo-image` with `@d11/react-native-fast-image` for better performance and React Native compatibility
- Updated Image component API to use FastImage props instead of ExpoImage props
- Changed `cacheControl` prop to `cache` to match FastImage API
- Updated image loading and caching behavior to use FastImage's priority and cache control systems

### Migration Guide
- Replace any direct usage of `expo-image` with `@d11/react-native-fast-image`
- Update `cacheControl` prop usage to `cache` in Image components
- Review image loading behavior as FastImage has different performance characteristics than expo-image

## [1.0.5] - 2025-09-04

### Fixed
- Add missing post-init.js script to template/scripts/ directory
- Replace react-native-fast-image with expo-image for React 19 compatibility
- Update Image component to use expo-image instead of react-native-fast-image
- Fix TypeScript errors and ESLint warnings in Image and PhotoCarousel components
- Ensure template works correctly with React Native CLI initialization

### Changed
- Updated Image component to use expo-image for better React 19 support
- Improved template initialization process with proper cleanup

## [1.0.3] - 2025-07-07



## [1.0.1] - 2025-07-01

- 2025-07-01

### Added
- Release notes automation system
- Comprehensive changelog generation
- GitHub workflow for automated releases
- NPM publishing integration

## [1.0.1] - 2025-07-01

### Added
- Release notes automation system
- Comprehensive changelog generation
- GitHub workflow for automated releases
- NPM publishing integration

## [1.0.0] - 2024-12-31

### Added
- Initial release of @sohantalukder/react-native-boilerplate
- Comprehensive React Native template with modern tooling
- TypeScript configuration with strict type checking
- Navigation setup with React Navigation v6
- State management with Zustand
- Data fetching with React Query (TanStack Query)
- UI component library with consistent theming
- Development tools (ESLint, Prettier, Husky)
- Testing framework with Jest
- Build automation scripts
- Documentation and deployment guides

[Unreleased]: https://github.com/sohantalukder/react-native-boilerplate/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/sohantalukder/react-native-boilerplate/releases/tag/v1.0.0 