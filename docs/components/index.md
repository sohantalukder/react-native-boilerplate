# 🧩 Component Library

Welcome to the React Native Boilerplate Component Library! This comprehensive collection of reusable components follows atomic design principles and provides a consistent, accessible, and customizable UI foundation for your React Native applications.

## 📋 Table of Contents

- [Overview](#overview)
- [Design Principles](#design-principles)
- [Component Categories](#component-categories)
- [Getting Started](#getting-started)
- [Component Reference](#component-reference)

## 🎯 Overview

Our component library is built with the following principles:

- **🎨 Consistent Design**: All components follow a unified design system
- **♿ Accessibility First**: Built with accessibility in mind
- **📱 Responsive**: Adapts to different screen sizes and orientations
- **🌙 Theme Support**: Full dark/light mode support
- **⚡ Performance**: Optimized for React Native performance
- **🔧 Customizable**: Highly configurable with sensible defaults
- **📚 Well Documented**: Comprehensive documentation with examples

## 🏗️ Design Principles

### Atomic Design Structure

Our components are organized following atomic design principles:

```
Atoms → Molecules → Organisms → Templates
```

- **Atoms**: Basic building blocks (Button, Text, Input)
- **Molecules**: Simple combinations of atoms (SearchBar, Card)
- **Organisms**: Complex UI components (Header, Navigation)
- **Templates**: Page-level layouts (ScreenContainer)

### Component Architecture

Each component follows a consistent structure:

```typescript
// Component Props Interface
interface ComponentProps {
  // Required props
  // Optional props with defaults
  // Style overrides
  // Event handlers
}

// Component Implementation
const Component: React.FC<ComponentProps> = ({ ...props }) => {
  // Theme integration
  // State management
  // Event handlers
  // Render logic
};
```

## 📦 Component Categories

### 🔸 Atoms (Basic Components)

The fundamental building blocks of our UI system.

| Component | Description | Status |
|-----------|-------------|--------|
| [Button](./atoms/button.md) | Interactive button with multiple variants | ✅ |
| [IconButton](./atoms/icon-button.md) | Icon-only button component | ✅ |
| [Text](./atoms/text.md) | Typography component with theme integration | ✅ |
| [TextInput](./atoms/text-input.md) | Form input with validation support | ✅ |
| [Card](./atoms/card.md) | Container component with elevation | ✅ |
| [Image](./atoms/image.md) | Optimized image component | ✅ |
| [Badge](./atoms/badge.md) | Status indicator component | ✅ |
| [Checkbox](./atoms/checkbox.md) | Selection input component | ✅ |
| [Radio](./atoms/radio.md) | Single selection input | ✅ |
| [Switch](./atoms/switch.md) | Toggle switch component | ✅ |
| [Slider](./atoms/slider.md) | Range input component | ✅ |
| [Divider](./atoms/divider.md) | Visual separator component | ✅ |
| [Loader](./atoms/loader.md) | Loading indicator component | ✅ |
| [Skeleton](./atoms/skeleton.md) | Content placeholder component | ✅ |
| [StatusBar](./atoms/status-bar.md) | Status bar configuration | ✅ |
| [Toast](./atoms/toast.md) | Notification component | ✅ |
| [Dialog](./atoms/dialog.md) | Modal dialog component | ✅ |
| [BottomSheet](./atoms/bottom-sheet.md) | Bottom sheet modal | ✅ |

### 🔹 Molecules (Composite Components)

Combinations of atoms that form functional UI elements.

| Component | Description | Status |
|-----------|-------------|--------|
| [Avatar](./molecules/avatar.md) | User profile image with fallback | ✅ |
| [PasswordInput](./molecules/password-input.md) | Secure text input with toggle | ✅ |
| [PhotoCarousel](./molecules/photo-carousel.md) | Image gallery component | ✅ |
| [EmptyContent](./molecules/empty-content.md) | Empty state component | ✅ |
| [DefaultError](./molecules/default-error.md) | Error state component | ✅ |
| [ClickableText](./molecules/clickable-text.md) | Interactive text component | ✅ |
| [TopTabBar](./molecules/top-tab-bar.md) | Tab navigation component | ✅ |

### 🔶 Organisms (Complex Components)

Complex UI components that combine multiple molecules and atoms.

| Component | Description | Status |
|-----------|-------------|--------|
| [ErrorBoundary](./organisms/error-boundary.md) | Error handling wrapper | ✅ |
| [SlideModal](./organisms/slide-modal.md) | Animated modal component | ✅ |
| [WebView](./organisms/web-view.md) | Web content component | ✅ |

### 🔷 Templates (Layout Components)

Page-level layout components that define screen structure.

| Component | Description | Status |
|-----------|-------------|--------|
| [SafeScreen](./templates/safe-screen.md) | Safe area screen wrapper | ✅ |
| [SafeSplashScreen](./templates/safe-splash-screen.md) | Splash screen wrapper | ✅ |
| [ScreenContainer](./templates/screen-container.md) | Standard screen container | ✅ |

## 🚀 Getting Started

### Installation

Components are already included in the boilerplate. Import them from the shared components:

```typescript
import { Button, Text, Card } from '@/shared/components/atoms';
import { Avatar, PasswordInput } from '@/shared/components/molecules';
import { SafeScreen } from '@/shared/components/templates';
```

### Basic Usage

```typescript
import React from 'react';
import { View } from 'react-native';
import { Button, Text, Card } from '@/shared/components/atoms';

const ExampleScreen = () => {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text variant="heading1" weight="bold">
        Welcome to React Native Boilerplate
      </Text>
      
      <Card variant="elevated" padding={20} margin={10}>
        <Text variant="body1">
          This is a sample card component with elevation.
        </Text>
        
        <Button
          text="Get Started"
          variant="primary"
          onPress={() => console.log('Button pressed!')}
        />
      </Card>
    </View>
  );
};
```

### Theme Integration

All components automatically integrate with the theme system:

```typescript
import { useTheme } from '@/theme';

const ThemedComponent = () => {
  const { colors, fonts, typographies } = useTheme();
  
  return (
    <View style={{ backgroundColor: colors.background }}>
      <Text style={{ color: colors.text }}>
        This text uses theme colors
      </Text>
    </View>
  );
};
```

## 📖 Component Reference

Each component includes:

- **Props Interface**: Complete TypeScript definitions
- **Usage Examples**: Common use cases and patterns
- **Theme Integration**: How components work with the theme system
- **Accessibility**: Built-in accessibility features
- **Customization**: Styling and behavior customization options
- **Best Practices**: Recommended usage patterns

## 🎨 Styling Guidelines

### Using Theme Values

Always use theme values for consistent styling:

```typescript
// ✅ Good - Uses theme values
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    padding: gutters.medium,
    borderRadius: borders.radius.medium,
  },
});

// ❌ Avoid - Hard-coded values
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
  },
});
```

### Responsive Design

Use the responsive utilities for screen adaptation:

```typescript
import rs from '@/shared/utilities/responsiveSize';

const styles = StyleSheet.create({
  container: {
    padding: rs(16), // Responsive padding
    fontSize: rs(14), // Responsive font size
  },
});
```

## 🔧 Customization

### Creating Custom Variants

Extend existing components with custom variants:

```typescript
import { Button } from '@/shared/components/atoms';

const CustomButton = (props) => {
  return (
    <Button
      {...props}
      style={[
        props.style,
        {
          // Custom styles
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        },
      ]}
    />
  );
};
```

### Theme Customization

Customize the theme to match your brand:

```typescript
// src/theme/_config.ts
export const config = {
  colors: {
    primary: '#your-brand-color',
    secondary: '#your-secondary-color',
    // ... other colors
  },
  // ... other theme properties
};
```

## 📱 Platform Considerations

### iOS Specific Features

- Native blur effects
- Haptic feedback
- Safe area handling
- iOS-specific animations

### Android Specific Features

- Material Design elevation
- Ripple effects
- Android-specific animations
- Status bar handling

## 🧪 Testing Components

### Unit Testing

```typescript
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '@/shared/components/atoms';

test('Button calls onPress when pressed', () => {
  const onPress = jest.fn();
  const { getByText } = render(
    <Button text="Test Button" onPress={onPress} />
  );
  
  fireEvent.press(getByText('Test Button'));
  expect(onPress).toHaveBeenCalled();
});
```

### Snapshot Testing

```typescript
import { Button } from '@/shared/components/atoms';

test('Button renders correctly', () => {
  const tree = renderer.create(
    <Button text="Test Button" variant="primary" />
  ).toJSON();
  
  expect(tree).toMatchSnapshot();
});
```

## 🤝 Contributing

When contributing new components:

1. Follow the atomic design structure
2. Include comprehensive TypeScript types
3. Add theme integration
4. Include accessibility features
5. Write tests and documentation
6. Follow the existing code style

## 📚 Additional Resources

- [Theme System Documentation](../theming/index.md)
- [Design System Guidelines](../best-practices/design-system.md)
- [Accessibility Guidelines](../best-practices/accessibility.md)
- [Performance Best Practices](../best-practices/performance.md)

---

**Next Steps**: Explore individual component documentation to learn about specific components and their usage patterns.
