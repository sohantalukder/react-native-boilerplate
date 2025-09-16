# 📝 Typography System

A comprehensive guide to the typography system used in the React Native Boilerplate. This document covers font scales, weights, usage guidelines, and accessibility considerations.

## 📋 Overview

Our typography system provides consistent, accessible, and scalable text styling across all components and screens. It's designed to create clear visual hierarchy while maintaining excellent readability on all device sizes.

## 🎯 Design Principles

### 1. Hierarchy First
Clear typographic hierarchy helps users understand content structure and importance.

### 2. Readability
All text sizes and styles prioritize readability across different devices and screen sizes.

### 3. Accessibility
Typography supports accessibility features like dynamic type and high contrast modes.

### 4. Consistency
Consistent typography creates a cohesive user experience across the application.

## 🔤 Font System

### Font Family
We use the system font family for optimal performance and native feel:

```typescript
// System font family (default)
const fontFamily = {
  regular: 'System',    // iOS: San Francisco, Android: Roboto
  medium: 'System',
  semibold: 'System',
  bold: 'System',
};
```

### Font Weights
Our system uses four font weights for clear hierarchy:

```typescript
const fontWeight = {
  regular: '400',    // Regular text
  medium: '500',     // Medium emphasis
  semibold: '600',   // Semi-bold emphasis
  bold: '700',       // Bold emphasis
};
```

## 📏 Typography Scale

Our typography scale follows a harmonious progression that ensures readability and visual hierarchy:

### Scale Overview
```typescript
const typographyScale = {
  heading1: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 38.4,
    letterSpacing: -0.5,
  },
  heading2: {
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 28.8,
    letterSpacing: -0.25,
  },
  heading3: {
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 21.6,
    letterSpacing: 0,
  },
  body1: {
    fontSize: 16,
    fontWeight: 'regular',
    lineHeight: 19.2,
    letterSpacing: 0.15,
  },
  body2: {
    fontSize: 14,
    fontWeight: 'regular',
    lineHeight: 16.8,
    letterSpacing: 0.25,
  },
  body3: {
    fontSize: 12,
    fontWeight: 'regular',
    lineHeight: 14.4,
    letterSpacing: 0.4,
  },
};
```

### Detailed Typography Variants

#### Heading 1 (32px)
```typescript
heading1: {
  fontSize: 32,
  fontWeight: 'bold',
  lineHeight: 38.4,
  letterSpacing: -0.5,
}
```
- **Usage**: Main page titles, hero sections
- **Context**: Landing pages, major section headers
- **Accessibility**: Large text with high contrast

#### Heading 2 (24px)
```typescript
heading2: {
  fontSize: 24,
  fontWeight: 'bold',
  lineHeight: 28.8,
  letterSpacing: -0.25,
}
```
- **Usage**: Section titles, card headers
- **Context**: Content sections, feature headers
- **Accessibility**: Clear hierarchy below heading1

#### Heading 3 (18px)
```typescript
heading3: {
  fontSize: 18,
  fontWeight: 'bold',
  lineHeight: 21.6,
  letterSpacing: 0,
}
```
- **Usage**: Subsection titles, component headers
- **Context**: Form sections, list headers
- **Accessibility**: Medium emphasis for subsections

#### Body 1 (16px)
```typescript
body1: {
  fontSize: 16,
  fontWeight: 'regular',
  lineHeight: 19.2,
  letterSpacing: 0.15,
}
```
- **Usage**: Primary content, paragraphs
- **Context**: Main content, descriptions
- **Accessibility**: Standard reading size

#### Body 2 (14px)
```typescript
body2: {
  fontSize: 14,
  fontWeight: 'regular',
  lineHeight: 16.8,
  letterSpacing: 0.25,
}
```
- **Usage**: Secondary content, captions
- **Context**: Supporting text, metadata
- **Accessibility**: Smaller but still readable

#### Body 3 (12px)
```typescript
body3: {
  fontSize: 12,
  fontWeight: 'regular',
  lineHeight: 14.4,
  letterSpacing: 0.4,
}
```
- **Usage**: Small text, labels, metadata
- **Context**: Timestamps, fine print
- **Accessibility**: Minimum readable size

## 🎨 Typography Usage Guidelines

### Hierarchy Best Practices

#### Page Structure
```typescript
// ✅ Good - Clear hierarchy
<Text variant="heading1">Page Title</Text>
<Text variant="heading2">Section Title</Text>
<Text variant="heading3">Subsection Title</Text>
<Text variant="body1">Main content paragraph</Text>
<Text variant="body2">Secondary information</Text>
<Text variant="body3">Metadata and labels</Text>

// ❌ Avoid - Inconsistent hierarchy
<Text variant="body1">Page Title</Text>
<Text variant="heading1">Section Title</Text>
<Text variant="body2">Subsection Title</Text>
```

#### Content Structure
```typescript
// ✅ Good - Proper content hierarchy
<View>
  <Text variant="heading2" weight="bold">Article Title</Text>
  <Text variant="body2" color="secondary">Published on March 15, 2024</Text>
  <Text variant="body1" style={{ marginTop: 16 }}>
    Article content goes here...
  </Text>
</View>

// ❌ Avoid - Poor content hierarchy
<View>
  <Text variant="body1">Article Title</Text>
  <Text variant="heading1">Published on March 15, 2024</Text>
  <Text variant="body3">Article content goes here...</Text>
</View>
```

### Weight Usage Guidelines

#### Bold Weight
```typescript
// ✅ Good - Emphasis and hierarchy
<Text variant="heading1" weight="bold">Main Title</Text>
<Text variant="body1" weight="bold">Important information</Text>

// ❌ Avoid - Overuse of bold
<Text variant="body1" weight="bold">Regular text</Text>
<Text variant="body2" weight="bold">Secondary text</Text>
```

#### Medium Weight
```typescript
// ✅ Good - Subtle emphasis
<Text variant="body1" weight="medium">Button text</Text>
<Text variant="body2" weight="medium">Navigation labels</Text>

// ❌ Avoid - Inconsistent usage
<Text variant="heading1" weight="medium">Main title</Text>
```

#### Regular Weight
```typescript
// ✅ Good - Default text
<Text variant="body1">Body text</Text>
<Text variant="body2">Secondary text</Text>

// ❌ Avoid - Underuse of regular
<Text variant="body1" weight="bold">All text</Text>
```

## 📱 Responsive Typography

### Responsive Font Sizing

Our typography system automatically adapts to different screen sizes:

```typescript
import rs from '@/shared/utilities/responsiveSize';

// Responsive font sizes
const responsiveFontSizes = {
  heading1: rs(32),  // Adapts to screen size
  heading2: rs(24),  // Adapts to screen size
  body1: rs(16),     // Adapts to screen size
  body2: rs(14),     // Adapts to screen size
};
```

### Screen Size Adaptations

#### Mobile (0-767px)
- **Base font size**: 16px
- **Line height**: 1.2x font size
- **Letter spacing**: Standard

#### Tablet (768-1023px)
- **Base font size**: 18px
- **Line height**: 1.3x font size
- **Letter spacing**: Slightly increased

#### Desktop (1024px+)
- **Base font size**: 20px
- **Line height**: 1.4x font size
- **Letter spacing**: Increased for readability

### Responsive Implementation

```typescript
import { Dimensions } from 'react-native';
import rs from '@/shared/utilities/responsiveSize';

const { width } = Dimensions.get('window');

const getResponsiveFontSize = (baseSize) => {
  if (width < 768) return rs(baseSize);
  if (width < 1024) return rs(baseSize * 1.125);
  return rs(baseSize * 1.25);
};

// Usage
const styles = StyleSheet.create({
  title: {
    fontSize: getResponsiveFontSize(32),
    lineHeight: getResponsiveFontSize(32) * 1.2,
  },
});
```

## ♿ Accessibility

### Dynamic Type Support

Our typography system respects system font size preferences:

```typescript
import { PixelRatio } from 'react-native';

const getAccessibleFontSize = (baseSize) => {
  const fontScale = PixelRatio.getFontScale();
  return baseSize * fontScale;
};

// Usage in components
const styles = StyleSheet.create({
  text: {
    fontSize: getAccessibleFontSize(16),
    lineHeight: getAccessibleFontSize(16) * 1.2,
  },
});
```

### High Contrast Support

Typography automatically adapts to high contrast mode:

```typescript
import { useColorScheme } from 'react-native';

const MyComponent = () => {
  const colorScheme = useColorScheme();
  const isHighContrast = colorScheme === 'dark';
  
  return (
    <Text
      style={{
        color: isHighContrast ? '#FFFFFF' : colors.text,
        fontWeight: isHighContrast ? 'bold' : 'regular',
      }}
    >
      Accessible text
    </Text>
  );
};
```

### Screen Reader Support

Provide proper accessibility labels for dynamic content:

```typescript
<Text
  variant="body1"
  accessibilityLabel={`User ${userName} has ${messageCount} messages`}
  accessibilityRole="text"
>
  {userName} ({messageCount})
</Text>
```

## 🎨 Color Integration

### Text Color Variants

Typography integrates with our color system:

```typescript
const textColors = {
  default: colors.text,        // Primary text color
  primary: colors.primary,     // Brand color
  secondary: colors.gray1,     // Secondary text
  success: colors.success,     // Success states
  warning: colors.warning,     // Warning states
  error: colors.error,         // Error states
  disabled: withOpacity(colors.text, 0.5), // Disabled state
  black: colors.black,         // Pure black
  white: colors.white,         // Pure white
};
```

### Color Usage Examples

```typescript
// ✅ Good - Semantic color usage
<Text variant="body1" color="success">✓ Success message</Text>
<Text variant="body1" color="error">✗ Error message</Text>
<Text variant="body1" color="warning">⚠ Warning message</Text>

// ❌ Avoid - Inconsistent color usage
<Text variant="body1" color="primary">Regular text</Text>
<Text variant="body1" color="error">Success message</Text>
```

## 🔧 Implementation

### Theme Integration

Typography automatically integrates with the theme system:

```typescript
import { useTheme } from '@/theme';

const MyComponent = () => {
  const { fonts, typographies } = useTheme();
  
  return (
    <Text
      style={[
        typographies.heading1,
        { color: fonts.text.color }
      ]}
    >
      Theme-aware text
    </Text>
  );
};
```

### Custom Typography

Create custom typography styles when needed:

```typescript
const customTypography = StyleSheet.create({
  customHeading: {
    fontSize: 28,
    fontWeight: '600',
    lineHeight: 34,
    letterSpacing: -0.3,
    color: colors.primary,
  },
  customBody: {
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 22,
    letterSpacing: 0.2,
    color: colors.text,
  },
});
```

### Typography Utilities

Use typography utilities for consistent styling:

```typescript
import { typography } from '@/theme';

// Get typography style
const headingStyle = typography.heading1;

// Apply typography with custom color
const customStyle = {
  ...typography.body1,
  color: colors.primary,
};
```

## 🧪 Testing Typography

### Readability Testing

Test typography for readability:

```typescript
// Test different text sizes
const testReadability = () => {
  const testTexts = [
    { variant: 'heading1', text: 'Main Title' },
    { variant: 'body1', text: 'Body text content' },
    { variant: 'body3', text: 'Small text' },
  ];
  
  testTexts.forEach(({ variant, text }) => {
    // Test rendering and accessibility
    expect(render(<Text variant={variant}>{text}</Text>)).toBeTruthy();
  });
};
```

### Accessibility Testing

Test typography accessibility:

```typescript
// Test dynamic type support
const testDynamicType = () => {
  const baseSize = 16;
  const fontScale = 1.5; // 150% font size
  
  const accessibleSize = baseSize * fontScale;
  expect(accessibleSize).toBe(24);
};

// Test contrast ratios
const testContrast = () => {
  const textColor = colors.text;
  const backgroundColor = colors.background;
  
  const contrast = calculateContrast(textColor, backgroundColor);
  expect(contrast).toBeGreaterThan(4.5); // WCAG AA
};
```

## 🎯 Best Practices

### Do's ✅

1. **Use Semantic Variants**: Choose variants based on content hierarchy
2. **Maintain Consistency**: Use consistent typography throughout the app
3. **Test Readability**: Ensure text is readable on all devices
4. **Support Accessibility**: Implement dynamic type and high contrast
5. **Use Appropriate Weights**: Choose weights that enhance hierarchy
6. **Consider Context**: Adapt typography to content context
7. **Test on Devices**: Test typography on actual devices

### Don'ts ❌

1. **Don't Overuse Bold**: Avoid making everything bold
2. **Don't Ignore Hierarchy**: Maintain clear visual hierarchy
3. **Don't Use Tiny Text**: Avoid text smaller than 12px
4. **Don't Ignore Accessibility**: Always consider accessibility needs
5. **Don't Mix Too Many Sizes**: Limit the number of different text sizes
6. **Don't Ignore Line Height**: Ensure proper line spacing
7. **Don't Use Poor Contrast**: Maintain sufficient color contrast

## 🔄 Migration Guide

### From Custom Typography

```typescript
// Before
const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
  },
  body: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#333333',
  },
});

// After
<Text variant="heading1" weight="bold">Title</Text>
<Text variant="body1">Body text</Text>
```

### From Hard-coded Styles

```typescript
// Before
<Text style={{ fontSize: 18, fontWeight: 'bold' }}>
  Custom Text
</Text>

// After
<Text variant="heading3" weight="bold">
  Custom Text
</Text>
```

## 📚 Resources

### Typography Tools
- [Type Scale](https://type-scale.com/) - Typography scale generator
- [Modular Scale](https://www.modularscale.com/) - Harmonious typography scales
- [Font Pair](https://www.fontpair.co/) - Font combination suggestions

### Accessibility Resources
- [WCAG Typography Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Dynamic Type Support](https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/typography/)
- [Material Design Typography](https://material.io/design/typography/)

### Testing Tools
- [Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Font Size Calculator](https://www.fontsize.com/)
- [Readability Test](https://www.readabilityformulas.com/)

---

**Next**: Learn about [Spacing & Layout](./spacing.md) for consistent spacing and layout patterns.
