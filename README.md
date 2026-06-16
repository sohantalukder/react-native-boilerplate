# 🚀 React Native Boilerplate Template

![React Native Boilerplate Banner](https://user-images.githubusercontent.com/74038190/225813708-98b745f2-7d22-48cf-9150-083f1b00d6c9.gif)

[![Documentation](https://img.shields.io/badge/📖-Documentation-blue?style=for-the-badge)](https://sohantalukder.github.io/react-native-boilerplate/)
[![NPM](https://img.shields.io/badge/📦-NPM_Package-red?style=for-the-badge)](https://www.npmjs.com/package/@sohantalukder/react-native-boilerplate)
[![GitHub](https://img.shields.io/badge/⭐-Star_on_GitHub-black?style=for-the-badge)](https://github.com/sohantalukder/react-native-boilerplate)

A modern, comprehensive React Native template with best practices, modern tools, and a clean architecture. This template provides everything you need to kickstart your React Native project with TypeScript, navigation, state management, TanStack Query, and a polished UI layer powered mostly by [`@sohantalukder/rn-kit`](https://www.npmjs.com/package/@sohantalukder/rn-kit).

## 📖 Complete Documentation

🌟 **[Visit our comprehensive documentation website](https://sohantalukder.github.io/react-native-boilerplate/)** for detailed guides, examples, and best practices.

The documentation includes:

- 📚 **Setup Guides** - Step-by-step installation and configuration
- 🏗️ **Architecture Guide** - Understanding the project structure
- 🎨 **Theming System** - Customizing colors, typography, and styles
- 🔧 **Configuration** - API setup, environment variables, and more
- 📱 **RN Kit UI** - Pre-built components, providers, and usage examples
- 🎨 **Style Guide** - Design tokens, colors, typography, and best practices
- 🧪 **Testing Guide** - Unit testing and best practices
- 🚀 **Deployment** - Build and release your app

## ✨ Features

### 🏗️ **Architecture & Structure**

- **TypeScript** - Full type safety with latest TypeScript
- **Modular Architecture** - Well-organized folder structure
- **Atomic Design** - Component structure following atomic design principles
- **Barrel Exports** - Clean and organized imports

### 📱 **Navigation & UI**

- **React Navigation v7** - Stack navigation with type safety
- **@sohantalukder/rn-kit** - Shared UI kit for screens, typography, buttons, cards, images, overlays, and theming
- **React Native Screens** - Native screen optimization
- **React Native Safe Area Context** - Safe area handling
- **React Native Gesture Handler** - Smooth gesture handling
- **React Native Reanimated v3** - Performant animations

### 🔄 **State Management & Data**

- **Zustand** - Lightweight state management
- **TanStack Query (React Query)** - Server state management
- **MMKV Storage** - Fast key-value storage
- **Axios** - HTTP client with interceptors

### 🎨 **Styling & Theme**

- **RN Kit Theme System** - Centralized theming with light/dark mode through `@sohantalukder/rn-kit`
- **Responsive Design** - Screen size adaptation and responsive utilities
- **Design System** - Shared color palette, typography, spacing, and layout helpers
- **Component Library** - Pre-built, accessible UI components from `@sohantalukder/rn-kit`
- **Style Guide** - Complete design system documentation

### 🌍 **Internationalization**

- **i18next** - Multi-language support
- **React i18next** - React Native integration
- **Fallback Languages** - Graceful language fallbacks

### 🧪 **Developer Experience**

- **ESLint** - Code linting with React Native rules
- **Prettier** - Code formatting
- **Husky** - Git hooks for code quality
- **Jest** - Unit testing framework
- **React Native Testing Library** - Component testing

### 📦 **Additional Libraries**

- **React Native SVG** - SVG support
- **React Native Fast Image** - Optimized image loading
- **React Native WebView** - Web content embedding
- **React Native Device Info** - Device information
- **FlashList** - Performant lists
- **Zod** - Runtime type validation
- **React Error Boundary** - Error handling

## 🚀 Quick Start

### Create a new project

```bash
npx @react-native-community/cli@latest init MyAwesomeApp --template @sohantalukder/react-native-boilerplate
```

### Navigate to your project

```bash
cd MyAwesomeApp
```

The post-init script will automatically:

- Install all dependencies
- Set up iOS CocoaPods (if on macOS)
- Configure Git hooks
- Verify Android SDK setup

### Run your app

```bash
# iOS
npm run ios
# or
yarn ios

# Android
npm run android
# or
yarn android
```

## 🧩 UI Kit

Most reusable UI in this template comes from [`@sohantalukder/rn-kit`](https://www.npmjs.com/package/@sohantalukder/rn-kit). Prefer importing shared UI primitives from the kit, then keep feature-specific layouts inside each module.

### Common Components

- **Button** - Interactive button with multiple variants and loading states
- **IconButton** - Icon-only button component
- **Text** - Typography component with theme integration
- **TextInput** - Form input with validation and animation support
- **Card** - Container component with elevation and variants
- **Image** - Optimized image component with caching
- **Badge** - Status indicator component
- **Checkbox** - Selection input component
- **Radio** - Single selection input
- **Switch** - Toggle switch component
- **Slider** - Range input component
- **Divider** - Visual separator component
- **Loader** - Loading indicator component
- **Skeleton** - Content placeholder component
- **StatusBar** - Status bar configuration
- **Toast** - Notification component
- **Dialog** - Modal dialog component
- **BottomSheet** - Bottom sheet modal

### Composite Components

- **EmptyContent** - Empty state component
- **DefaultError** - Error state component
- **TopTabBar** - Tab navigation component
- **ErrorBoundary** - Error handling wrapper
- **WebView** - Web content component

### Layout Components

- **ScreenContainer** - Standard screen container

### 🎨 Style Guide Features

- **Color System** - Comprehensive palette with light/dark mode support
- **Typography** - Harmonious font scale with responsive sizing
- **Spacing** - Consistent 8px-based spacing system
- **Accessibility** - WCAG 2.1 AA compliant design
- **Responsive Design** - Adaptive layouts for all screen sizes

## 📁 Project Structure

```
src/
├── assets/           # Images, fonts, and other static assets
├── config/           # App configuration (API, storage, etc.)
├── modules/          # Feature modules
├── navigation/       # Navigation configuration
├── services/         # Storage, app info, and external integrations
├── shared/           # Shared hooks and utilities
│   ├── hooks/        # Reusable hooks
│   └── utilities/    # Utility functions
├── state/            # Global state management
├── translations/     # Internationalization files
└── types/            # TypeScript type definitions
```

## 🚀 Quick UI Examples

### Basic Usage

```typescript
import React from 'react';
import { View } from 'react-native';
import { Button, Card, Image, ScreenContainer, Text } from '@sohantalukder/rn-kit';

const ExampleScreen = () => {
  return (
    <ScreenContainer>
      <View style={{ flex: 1, padding: 16 }}>
        <Text variant="heading1" weight="bold">
          Welcome to React Native Boilerplate
        </Text>

        <Card variant="elevated" padding={20} margin={10}>
          <Image
            source={{ uri: 'https://example.com/avatar.jpg' }}
            style={{ width: 60, height: 60, borderRadius: 30 }}
          />
          <Text variant="body1" style={{ marginTop: 12 }}>
            This is a sample card with an image and text.
          </Text>

          <Button
            text="Get Started"
            variant="primary"
            onPress={() => console.log('Button pressed!')}
            style={{ marginTop: 16 }}
          />
        </Card>
      </View>
    </ScreenContainer>
  );
};
```

### Theme Integration

```typescript
import { useTheme } from '@sohantalukder/rn-kit';

const ThemedComponent = () => {
  const { colors, typographies } = useTheme();

  return (
    <View style={{ backgroundColor: colors.background }}>
      <Text style={[typographies.heading2, { color: colors.text }]}>
        Theme-aware heading
      </Text>
      <Text style={{ color: colors.primary }}>
        Primary colored text
      </Text>
    </View>
  );
};
```

## 🛠️ Available Scripts

```bash
# Development
npm start              # Start Metro bundler
npm run android        # Run on Android
npm run ios           # Run on iOS

# Building
npm run build:android  # Build Android APK
npm run build:ios     # Build iOS app

# Code Quality
npm run lint          # Run ESLint + Prettier + TypeScript
npm run lint:fix      # Fix linting issues
npm run test          # Run tests
```

## 🔧 Configuration

### Environment Setup

1. **Development Environment**: Follow the [React Native environment setup guide](https://reactnative.dev/docs/environment-setup)

2. **iOS Setup** (macOS only):

   ```bash
   # Install Ruby dependencies
   bundle install

   # Install CocoaPods
   cd ios && bundle exec pod install
   ```

3. **Android Setup**:
   - Set `ANDROID_HOME` environment variable
   - Install Android SDK and required build tools

### Theme Customization

Configure the `ThemeProvider` from `@sohantalukder/rn-kit` to customize:

- Colors
- Typography
- Spacing
- Component styles

### API Configuration

Update `src/config/` files for:

- API endpoints
- Environment variables
- App configuration

## 📚 Documentation

> 💡 **Tip**: For the most up-to-date and comprehensive documentation, visit our [**Documentation Website**](https://sohantalukder.github.io/react-native-boilerplate/)

### Key Concepts

- **RN Kit First**: Use `@sohantalukder/rn-kit` for shared UI primitives, theme helpers, and overlay APIs
- **Feature Components**: Keep module-specific UI inside the feature module
- **Barrel Exports**: Use index files for clean imports
- **Type Safety**: Leverage TypeScript for better development experience
- **State Management**: Use Zustand for global state, React Query for server state

### Best Practices

1. **Components**: Keep components small and focused
2. **Styling**: Use the theme system for consistent styling
3. **State**: Separate local, global, and server state appropriately
4. **Testing**: Write tests for critical business logic
5. **Performance**: Use FlashList for large lists, optimize images

### 📖 Additional Resources

- 🌐 **[Live Documentation](https://sohantalukder.github.io/react-native-boilerplate/)** - Interactive guides and examples
- 📋 **[Getting Started](https://sohantalukder.github.io/react-native-boilerplate/docs/getting-started)** - Quick setup guide
- 🏗️ **[Project Structure](https://sohantalukder.github.io/react-native-boilerplate/docs/project-structure)** - Understanding the codebase
- ⚙️ **[Configuration](https://sohantalukder.github.io/react-native-boilerplate/docs/configuration)** - Customization options
- 🛠️ **[Development](https://sohantalukder.github.io/react-native-boilerplate/docs/development)** - Development workflow
- 🧩 **[Component Library](https://sohantalukder.github.io/react-native-boilerplate/docs/components)** - Complete component reference
- 🎨 **[Style Guide](https://sohantalukder.github.io/react-native-boilerplate/docs/style-guide)** - Design system and guidelines

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React Native Community](https://github.com/react-native-community)
- [TheCodeingMachine Boilerplate](https://github.com/thecodingmachine/react-native-boilerplate) - Inspiration
- All the amazing library authors and contributors

## 📞 Support

- 🌐 **Documentation**: [https://sohantalukder.github.io/react-native-boilerplate/](https://sohantalukder.github.io/react-native-boilerplate/)
- 📧 **Email**: mdtalukder.sohan@gmail.com
- 🐛 **Issues**: [GitHub Issues](https://github.com/sohantalukder/react-native-boilerplate/issues)

---

**Happy coding! 🎉**
