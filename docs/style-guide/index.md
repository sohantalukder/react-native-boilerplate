# 🎨 Style Guide

A comprehensive design system and style guide for the React Native Boilerplate. This guide provides consistent design principles, color palettes, typography, spacing, and component usage guidelines.

## 📋 Table of Contents

- [Overview](#overview)
- [Design Principles](#design-principles)
- [Color System](#color-system)
- [Typography](#typography)
- [Spacing & Layout](#spacing--layout)
- [Component Guidelines](#component-guidelines)
- [Dark Mode](#dark-mode)
- [Responsive Design](#responsive-design)
- [Accessibility](#accessibility)
- [Best Practices](#best-practices)

## 🎯 Overview

Our style guide is built on modern design principles that prioritize:

- **Consistency**: Unified visual language across all components
- **Accessibility**: WCAG 2.1 AA compliance for inclusive design
- **Scalability**: Flexible system that grows with your application
- **Performance**: Optimized for React Native rendering
- **Developer Experience**: Easy to use and maintain

## 🏗️ Design Principles

### 1. Clarity First
Every element should have a clear purpose and meaning. Avoid unnecessary complexity and focus on user needs.

### 2. Consistency
Use consistent patterns, spacing, and styling throughout the application to create a cohesive experience.

### 3. Accessibility
Design for all users, including those with disabilities. Ensure proper contrast ratios, touch targets, and screen reader support.

### 4. Performance
Optimize for React Native performance with efficient rendering and minimal re-renders.

### 5. Flexibility
Create a system that can adapt to different use cases while maintaining consistency.

## 🎨 Color System

### Primary Colors

Our color system is built around a carefully selected palette that works well in both light and dark modes.

#### Light Mode Colors
```typescript
const lightColors = {
  // Primary Brand Colors
  primary: '#4E4DD7',      // Main brand color
  secondary: '#00CCCC',    // Secondary brand color
  
  // Semantic Colors
  success: '#22C55E',      // Success states
  warning: '#FFAB00',      // Warning states
  error: '#FF5630',        // Error states
  info: '#00B8D9',         // Information states
  
  // Neutral Colors
  background: '#FAFAFB',   // Main background
  text: '#1B1D20',         // Primary text
  white: '#FFFFFF',        // Pure white
  black: '#000000',        // Pure black
  
  // Gray Scale
  gray0: '#1B1D20',        // Darkest gray
  gray1: '#323436',        // Dark gray
  gray2: '#494A4D',        // Medium dark gray
  gray3: '#5F6163',        // Medium gray
  gray4: '#767779',        // Light medium gray
  gray5: '#98999B',        // Light gray
  gray6: '#AFB0B1',        // Very light gray
  gray7: '#DDDDDE',        // Border gray
  gray8: '#E8E8E9',        // Light border gray
  gray9: '#F4F4F4',        // Background gray
  gray10: '#FAFAFA',       // Lightest gray
};
```

#### Dark Mode Colors
```typescript
const darkColors = {
  // Primary Brand Colors (same as light mode)
  primary: '#4E4DD7',
  secondary: '#00CCCC',
  
  // Semantic Colors (same as light mode)
  success: '#22C55E',
  warning: '#FFAB00',
  error: '#FF5630',
  info: '#00B8D9',
  
  // Neutral Colors (inverted for dark mode)
  background: '#080402',   // Dark background
  text: '#FFFFFF',         // Light text
  white: '#FFFFFF',
  black: '#000000',
  
  // Gray Scale (inverted for dark mode)
  gray0: '#F4F4F4',        // Lightest gray
  gray1: '#DDDDDE',        // Light gray
  gray2: '#B0B1B2',        // Medium light gray
  gray3: '#9A9B9D',        // Medium gray
  gray4: '#7C7D7F',        // Medium dark gray
  gray5: '#616263',        // Dark gray
  gray6: '#4A4B4D',        // Very dark gray
  gray7: '#373839',        // Border gray
  gray8: '#2C2D2F',        // Dark border gray
  gray9: '#131415',        // Background gray
  gray10: '#1F222A',       // Darkest gray
};
```

### Color Usage Guidelines

#### Primary Colors
- **Primary (#4E4DD7)**: Use for main actions, links, and brand elements
- **Secondary (#00CCCC)**: Use for secondary actions and accents

#### Semantic Colors
- **Success (#22C55E)**: Success messages, positive states, confirmations
- **Warning (#FFAB00)**: Warnings, caution states, pending actions
- **Error (#FF5630)**: Errors, destructive actions, critical states
- **Info (#00B8D9)**: Information, neutral states, help text

#### Neutral Colors
- **Background**: Main app background color
- **Text**: Primary text color for readability
- **Gray Scale**: Use for borders, dividers, and secondary text

### Color Contrast

All color combinations meet WCAG 2.1 AA standards:

- **Normal Text**: Minimum 4.5:1 contrast ratio
- **Large Text**: Minimum 3:1 contrast ratio
- **UI Components**: Minimum 3:1 contrast ratio

## 📝 Typography

### Font System

Our typography system uses a single font family with multiple weights for consistency and performance.

#### Font Weights
```typescript
const fontWeight = {
  regular: '400',    // Regular text
  medium: '500',     // Medium emphasis
  semibold: '600',   // Semi-bold emphasis
  bold: '700',       // Bold emphasis
};
```

#### Typography Scale
```typescript
const typography = {
  heading1: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 38.4,
  },
  heading2: {
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 28.8,
  },
  heading3: {
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 21.6,
  },
  body1: {
    fontSize: 16,
    fontWeight: 'regular',
    lineHeight: 19.2,
  },
  body2: {
    fontSize: 14,
    fontWeight: 'regular',
    lineHeight: 16.8,
  },
  body3: {
    fontSize: 12,
    fontWeight: 'regular',
    lineHeight: 14.4,
  },
};
```

### Typography Usage

#### Headings
- **Heading 1**: Page titles, major sections
- **Heading 2**: Section titles, card headers
- **Heading 3**: Subsection titles, component headers

#### Body Text
- **Body 1**: Primary content, paragraphs
- **Body 2**: Secondary content, captions
- **Body 3**: Small text, labels, metadata

### Typography Best Practices

1. **Hierarchy**: Use consistent heading hierarchy
2. **Readability**: Ensure sufficient line height and spacing
3. **Contrast**: Maintain proper color contrast
4. **Responsive**: Use responsive font sizing for different screens

## 📏 Spacing & Layout

### Spacing Scale

Our spacing system uses a consistent 8px base unit for all measurements.

```typescript
const spacing = {
  0: 0,      // No spacing
  2: 2,      // Extra small
  3: 3,      // Very small
  4: 4,      // Small
  6: 6,      // Small medium
  8: 8,      // Medium (base unit)
  10: 10,    // Medium large
  12: 12,    // Large
  14: 14,    // Large medium
  16: 16,    // Extra large
  18: 18,    // Very large
  20: 20,    // Huge
  24: 24,    // Extra huge
  32: 32,    // Massive
  40: 40,    // Gigantic
  48: 48,    // Colossal
  80: 80,    // Monumental
};
```

### Layout Guidelines

#### Container Spacing
- **Screen Padding**: 16px on mobile, 24px on tablet
- **Section Spacing**: 24px between major sections
- **Component Spacing**: 16px between related components
- **Element Spacing**: 8px between related elements

#### Grid System
- **Mobile**: Single column layout
- **Tablet**: Two-column layout with 16px gutters
- **Desktop**: Multi-column layout with 24px gutters

### Responsive Spacing

Use responsive spacing utilities for different screen sizes:

```typescript
import rs from '@/shared/utilities/responsiveSize';

const styles = StyleSheet.create({
  container: {
    padding: rs(16),        // Responsive padding
    marginVertical: rs(8),  // Responsive margin
    gap: rs(12),           // Responsive gap
  },
});
```

## 🧩 Component Guidelines

### Component Hierarchy

Follow atomic design principles:

1. **Atoms**: Basic building blocks (Button, Text, Input)
2. **Molecules**: Simple combinations (SearchBar, Card)
3. **Organisms**: Complex components (Header, Navigation)
4. **Templates**: Page layouts (ScreenContainer)

### Component Styling

#### Consistent Props
- Use consistent prop names across components
- Provide sensible defaults
- Support theme integration
- Include accessibility props

#### Style Composition
```typescript
// Good: Compose styles with theme
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    padding: gutters.medium,
    borderRadius: borders.radius.medium,
  },
});

// Avoid: Hard-coded values
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
  },
});
```

### Component States

Every interactive component should support:

- **Default**: Normal state
- **Hover**: Hover state (web)
- **Pressed**: Active/pressed state
- **Disabled**: Disabled state
- **Loading**: Loading state (where applicable)

## 🌙 Dark Mode

### Dark Mode Principles

1. **Consistency**: Maintain visual hierarchy in both modes
2. **Accessibility**: Ensure proper contrast ratios
3. **User Preference**: Respect system preferences
4. **Smooth Transitions**: Provide smooth theme switching

### Dark Mode Implementation

```typescript
// Theme provider automatically handles dark mode
const { colors, variant } = useTheme();

// Colors automatically adapt to theme
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,  // Adapts to theme
    borderColor: colors.gray7,          // Adapts to theme
  },
});
```

### Dark Mode Best Practices

1. **Test Both Modes**: Always test in both light and dark modes
2. **Avoid Pure Black**: Use dark grays instead of pure black
3. **Maintain Contrast**: Ensure sufficient contrast in both modes
4. **Consider Images**: Adjust image brightness for dark mode

## 📱 Responsive Design

### Breakpoints

```typescript
const breakpoints = {
  mobile: 0,      // 0-767px
  tablet: 768,    // 768-1023px
  desktop: 1024,  // 1024px+
};
```

### Responsive Utilities

```typescript
import rs from '@/shared/utilities/responsiveSize';

// Responsive font size
const fontSize = rs(16);

// Responsive spacing
const padding = rs(20);

// Responsive dimensions
const width = rs(300);
```

### Responsive Best Practices

1. **Mobile First**: Design for mobile first, then scale up
2. **Touch Targets**: Minimum 44px touch targets
3. **Readable Text**: Ensure text is readable on all screen sizes
4. **Flexible Layouts**: Use flexible layouts that adapt to content

## ♿ Accessibility

### Accessibility Standards

Follow WCAG 2.1 AA guidelines:

- **Perceivable**: Information must be presentable in ways users can perceive
- **Operable**: Interface components must be operable
- **Understandable**: Information and UI operation must be understandable
- **Robust**: Content must be robust enough for various assistive technologies

### Accessibility Implementation

#### Color Contrast
- Minimum 4.5:1 for normal text
- Minimum 3:1 for large text and UI components

#### Touch Targets
- Minimum 44px touch targets
- Adequate spacing between interactive elements

#### Screen Reader Support
```typescript
<Button
  accessibilityLabel="Save document"
  accessibilityHint="Double tap to save your changes"
  accessibilityRole="button"
>
  Save
</Button>
```

#### Dynamic Type Support
```typescript
// Respect system font size preferences
const styles = StyleSheet.create({
  text: {
    fontSize: responsiveFontSize(16),
  },
});
```

## 🎯 Best Practices

### Design System

1. **Consistency**: Use design system tokens consistently
2. **Documentation**: Document all design decisions
3. **Versioning**: Version your design system
4. **Testing**: Test across different devices and scenarios

### Performance

1. **Optimize Images**: Use appropriate image formats and sizes
2. **Minimize Re-renders**: Use React.memo and useMemo appropriately
3. **Lazy Loading**: Implement lazy loading for large lists
4. **Bundle Size**: Keep bundle size optimized

### Code Quality

1. **TypeScript**: Use TypeScript for type safety
2. **Linting**: Use ESLint and Prettier for code quality
3. **Testing**: Write comprehensive tests
4. **Documentation**: Document components and APIs

### User Experience

1. **Loading States**: Provide feedback for async operations
2. **Error Handling**: Handle errors gracefully
3. **Offline Support**: Consider offline functionality
4. **Performance**: Optimize for smooth interactions

## 🔧 Customization

### Theme Customization

Customize the theme to match your brand:

```typescript
// src/theme/_config.ts
export const config = {
  colors: {
    primary: '#your-brand-color',
    secondary: '#your-secondary-color',
    // ... other customizations
  },
  fonts: {
    sizes: [12, 14, 16, 18, 20, 24, 32], // Custom font sizes
  },
  gutters: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48], // Custom spacing
};
```

### Component Customization

Extend components with custom variants:

```typescript
// Custom button variant
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

## 📚 Resources

### Design Tools
- [Figma Design System](https://figma.com) - Design system management
- [Color Contrast Checker](https://webaim.org/resources/contrastchecker/) - Accessibility testing
- [Responsive Design Testing](https://responsivedesignchecker.com/) - Multi-device testing

### Documentation
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [React Native Performance](https://reactnative.dev/docs/performance)
- [Material Design Guidelines](https://material.io/design)

### Tools
- [React Native Debugger](https://github.com/jhen0409/react-native-debugger)
- [Flipper](https://fbflipper.com/) - Mobile development platform
- [React Native Performance Monitor](https://github.com/facebook/react-native/tree/main/packages/react-native-performance)

---

**Next Steps**: Explore individual component documentation to learn about specific components and their usage patterns.
