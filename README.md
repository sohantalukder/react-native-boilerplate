# 🚀 React Native Boilerplate Template

![React Native Boilerplate Banner](https://user-images.githubusercontent.com/74038190/225813708-98b745f2-7d22-48cf-9150-083f1b00d6c9.gif)

A modern, comprehensive React Native template with best practices, modern tools, and a clean architecture. This template provides everything you need to kickstart your React Native project with TypeScript, navigation, state management, and more.

## ✨ Features

### 🏗️ **Architecture & Structure**
- **TypeScript** - Full type safety with latest TypeScript
- **Modular Architecture** - Well-organized folder structure
- **Atomic Design** - Component structure following atomic design principles
- **Barrel Exports** - Clean and organized imports

### 📱 **Navigation & UI**
- **React Navigation v7** - Stack navigation with type safety
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
- **Custom Theme System** - Centralized theming
- **Responsive Design** - Screen size adaptation
- **Dark/Light Mode** - Theme switching support
- **Custom Components** - Pre-built UI components

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

## 📁 Project Structure

```
src/
├── assets/           # Images, fonts, and other static assets
├── config/           # App configuration (API, storage, etc.)
├── modules/          # Feature modules
├── navigation/       # Navigation configuration
├── services/         # API services and external integrations
├── shared/           # Shared components and utilities
│   ├── components/   # Reusable UI components
│   │   ├── atoms/    # Basic components (Button, Input, etc.)
│   │   ├── molecules/# Composite components
│   │   └── templates/# Layout components
│   ├── contexts/     # React contexts
│   ├── hooks/        # Custom hooks
│   └── utils/        # Utility functions
├── state/            # Global state management
├── theme/            # Theme configuration and styles
├── translations/     # Internationalization files
└── types/            # TypeScript type definitions
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

Edit `src/theme/` files to customize:
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

### Key Concepts

- **Atomic Design**: Components are organized as atoms → molecules → organisms → templates
- **Barrel Exports**: Use index files for clean imports
- **Type Safety**: Leverage TypeScript for better development experience
- **State Management**: Use Zustand for global state, React Query for server state

### Best Practices

1. **Components**: Keep components small and focused
2. **Styling**: Use the theme system for consistent styling
3. **State**: Separate local, global, and server state appropriately
4. **Testing**: Write tests for critical business logic
5. **Performance**: Use FlashList for large lists, optimize images

## 📚 Documentation Deployment

This template includes automated documentation deployment to GitHub Pages. To enable it:

### Setup GitHub Pages

1. **Run the setup helper**:
   ```bash
   npm run setup-pages
   ```

2. **Enable GitHub Pages**:
   - Go to your repository Settings → Pages
   - Under "Source", select "GitHub Actions"
   - Save the settings

3. **Deploy**:
   ```bash
   git add .
   git commit -m "Enable GitHub Pages deployment"
   git push origin main
   ```

4. **Access your docs**: `https://yourusername.github.io/your-repo-name/`

The workflow automatically builds and deploys documentation when you push changes to the `documentation/` folder.

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

- 📧 Email: mdtalukder.sohan@gmail.com
- 🐛 Issues: [GitHub Issues](https://github.com/sohantalukder/react-native-boilerplate/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/sohantalukder/react-native-boilerplate/discussions)

---

**Happy coding! 🎉** 