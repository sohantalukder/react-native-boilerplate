# 📝 Text Component

A comprehensive typography component with theme integration, multiple variants, and responsive design support.

## 📋 Overview

The Text component provides consistent typography across your application with built-in theme integration, responsive sizing, and accessibility features. It supports various text styles, weights, and colors that automatically adapt to your theme system.

## 🎯 Features

- **Typography Variants**: Predefined text styles (heading1, heading2, body1, etc.)
- **Font Weights**: Regular, medium, semibold, and bold options
- **Color Variants**: Theme-integrated color options
- **Responsive Sizing**: Automatic size adaptation for different screen sizes
- **Theme Integration**: Automatic dark/light mode support
- **Accessibility**: Built-in accessibility features
- **Customizable**: Extensive styling customization options

## 📖 API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `TypographySize` | `'body1'` | Typography style variant |
| `color` | `TextColor` | `'default'` | Text color variant |
| `weight` | `TextWeight` | `'regular'` | Font weight |
| `style` | `StyleProp<TextStyle>` | `undefined` | Custom text styles |
| `children` | `React.ReactNode` | **Required** | Text content |
| `numberOfLines` | `number` | `undefined` | Maximum number of lines |
| `ellipsizeMode` | `'head' \| 'middle' \| 'tail' \| 'clip'` | `undefined` | Text truncation mode |

### TypographySize Type

```typescript
type TypographySize = 
  | 'heading1'  // 32px, bold
  | 'heading2'  // 24px, bold
  | 'heading3'  // 18px, bold
  | 'body1'     // 16px, regular
  | 'body2'     // 14px, regular
  | 'body3';    // 12px, regular
```

### TextColor Type

```typescript
type TextColor = 
  | 'default'   // Theme text color
  | 'primary'   // Theme primary color
  | 'secondary' // Theme secondary color
  | 'success'   // Success color
  | 'warning'   // Warning color
  | 'error'     // Error color
  | 'disabled'  // Disabled state color
  | 'black'     // Pure black
  | 'white';    // Pure white
```

### TextWeight Type

```typescript
type TextWeight = 
  | 'regular'   // 400
  | 'medium'    // 500
  | 'semibold'  // 600
  | 'bold';     // 700
```

## 🎨 Typography Variants

### Headings

#### Heading 1
```typescript
<Text variant="heading1" weight="bold">
  Main Page Title
</Text>
```

#### Heading 2
```typescript
<Text variant="heading2" weight="bold">
  Section Title
</Text>
```

#### Heading 3
```typescript
<Text variant="heading3" weight="semibold">
  Subsection Title
</Text>
```

### Body Text

#### Body 1 (Default)
```typescript
<Text variant="body1">
  This is the default body text size.
</Text>
```

#### Body 2
```typescript
<Text variant="body2">
  Smaller body text for secondary content.
</Text>
```

#### Body 3
```typescript
<Text variant="body3">
  Smallest text for captions and labels.
</Text>
```

## 🎨 Color Variants

### Theme Colors
```typescript
<Text color="primary">Primary colored text</Text>
<Text color="secondary">Secondary colored text</Text>
<Text color="success">Success message text</Text>
<Text color="warning">Warning message text</Text>
<Text color="error">Error message text</Text>
```

### Utility Colors
```typescript
<Text color="black">Black text</Text>
<Text color="white">White text</Text>
<Text color="disabled">Disabled text</Text>
```

## 🔧 Advanced Usage

### Custom Styling
```typescript
<Text
  variant="body1"
  weight="medium"
  color="primary"
  style={{
    textAlign: 'center',
    marginVertical: 10,
    lineHeight: 24,
  }}
>
  Custom styled text
</Text>
```

### Text Truncation
```typescript
<Text
  variant="body1"
  numberOfLines={2}
  ellipsizeMode="tail"
>
  This is a long text that will be truncated after two lines with ellipsis at the end.
</Text>
```

### Responsive Text
```typescript
import rs from '@/shared/utilities/responsiveSize';

<Text
  variant="body1"
  style={{
    fontSize: rs(16), // Responsive font size
    lineHeight: rs(24), // Responsive line height
  }}
>
  Responsive text that adapts to screen size
</Text>
```

### Multi-line Text with Custom Spacing
```typescript
<Text
  variant="body1"
  style={{
    lineHeight: 28,
    letterSpacing: 0.5,
  }}
>
  This is a multi-line text with custom line height and letter spacing for better readability.
</Text>
```

## 🎨 Theme Integration

The Text component automatically integrates with your theme system:

```typescript
// Theme colors are automatically applied
const { fonts, typographies } = useTheme();

// Color mapping
const colorMap = {
  default: fonts.text.color,      // Theme text color
  primary: fonts.primary.color,   // Theme primary color
  secondary: fonts.gray1.color,   // Theme secondary color
  success: fonts.success.color,   // Success color
  warning: fonts.warning.color,   // Warning color
  error: fonts.error.color,       // Error color
  disabled: withOpacity(fonts.text.color, 0.5), // Disabled with opacity
  black: fonts.black.color,       // Pure black
  white: fonts.white.color,       // Pure white
};
```

### Custom Theme Colors
```typescript
// In your theme configuration
const theme = {
  fonts: {
    colors: {
      text: '#1B1D20',        // Default text color
      primary: '#4E4DD7',     // Primary color
      secondary: '#323436',   // Secondary color
      success: '#22C55E',     // Success color
      warning: '#FFAB00',     // Warning color
      error: '#FF5630',       // Error color
      black: '#000000',       // Pure black
      white: '#FFFFFF',       // Pure white
    },
  },
};
```

## 📱 Responsive Design

### Automatic Responsive Sizing
```typescript
// Font sizes automatically adapt to screen size
const fontSizes = {
  heading1: responsiveFontSize(32), // Adapts to screen
  heading2: responsiveFontSize(24), // Adapts to screen
  body1: responsiveFontSize(16),    // Adapts to screen
  body2: responsiveFontSize(14),    // Adapts to screen
  body3: responsiveFontSize(12),    // Adapts to screen
};
```

### Manual Responsive Sizing
```typescript
import rs from '@/shared/utilities/responsiveSize';

<Text
  style={{
    fontSize: rs(18),        // Responsive font size
    lineHeight: rs(26),      // Responsive line height
    marginVertical: rs(8),   // Responsive margin
  }}
>
  Manually responsive text
</Text>
```

## ♿ Accessibility

The Text component includes built-in accessibility features:

- **Dynamic Type Support**: Respects system font size preferences
- **High Contrast**: Adapts to high contrast mode
- **Screen Reader**: Proper text announcements
- **Color Contrast**: Ensures sufficient color contrast

### Accessibility Best Practices
```typescript
// Use semantic variants for proper hierarchy
<Text variant="heading1" accessibilityRole="header">
  Page Title
</Text>

<Text variant="body1" accessibilityRole="text">
  Body content
</Text>

// Provide accessibility labels for dynamic content
<Text
  variant="body1"
  accessibilityLabel={`User ${userName} has ${messageCount} messages`}
>
  {userName} ({messageCount})
</Text>
```

## 🌙 Dark Mode Support

Text colors automatically adapt to dark/light mode:

```typescript
// Light mode
const lightColors = {
  text: '#1B1D20',      // Dark text on light background
  background: '#FAFAFB', // Light background
};

// Dark mode
const darkColors = {
  text: '#FFFFFF',      // Light text on dark background
  background: '#080402', // Dark background
};
```

## 🧪 Testing

### Unit Test Example
```typescript
import { render } from '@testing-library/react-native';
import { Text } from '@/shared/components/atoms';

describe('Text Component', () => {
  it('renders text with correct variant', () => {
    const { getByText } = render(
      <Text variant="heading1">Test Heading</Text>
    );
    
    const textElement = getByText('Test Heading');
    expect(textElement).toBeTruthy();
  });

  it('applies correct color variant', () => {
    const { getByText } = render(
      <Text color="primary">Primary Text</Text>
    );
    
    const textElement = getByText('Primary Text');
    expect(textElement).toBeTruthy();
  });

  it('truncates text correctly', () => {
    const longText = 'This is a very long text that should be truncated';
    const { getByText } = render(
      <Text numberOfLines={1} ellipsizeMode="tail">
        {longText}
      </Text>
    );
    
    const textElement = getByText(longText);
    expect(textElement).toBeTruthy();
  });
});
```

### Snapshot Test
```typescript
import renderer from 'react-test-renderer';
import { Text } from '@/shared/components/atoms';

it('renders text variants correctly', () => {
  const variants = ['heading1', 'heading2', 'body1', 'body2', 'body3'];
  
  variants.forEach(variant => {
    const tree = renderer.create(
      <Text variant={variant}>Test Text</Text>
    ).toJSON();
    
    expect(tree).toMatchSnapshot();
  });
});
```

## 🎯 Best Practices

### Do's ✅

- Use semantic variants (heading1, heading2, body1, etc.)
- Choose appropriate color variants for context
- Use proper font weights for hierarchy
- Test text readability on different backgrounds
- Use numberOfLines for text truncation
- Consider accessibility when choosing colors
- Use responsive sizing for different screen sizes

### Don'ts ❌

- Don't use heading variants for body text
- Don't use too many different font weights
- Don't ignore color contrast requirements
- Don't use very small text sizes
- Don't forget to test on different devices
- Don't use hard-coded colors instead of theme colors
- Don't ignore accessibility guidelines

## 🔄 Migration Guide

### From React Native Text
```typescript
// Before
<Text style={{ fontSize: 16, color: '#000', fontWeight: 'bold' }}>
  Custom Text
</Text>

// After
<Text variant="body1" weight="bold" color="black">
  Custom Text
</Text>
```

### From Custom Typography
```typescript
// Before
<Text style={styles.heading}>
  Heading Text
</Text>

// After
<Text variant="heading1" weight="bold">
  Heading Text
</Text>
```

## 🐛 Troubleshooting

### Common Issues

**Text not displaying**
- Check if children prop is provided
- Verify text content is not empty
- Ensure component is properly imported

**Colors not applying**
- Verify theme integration is working
- Check if color variant exists in theme
- Ensure theme provider is wrapping the component

**Font sizes not responsive**
- Check if responsive utilities are imported
- Verify screen size detection is working
- Ensure responsive font size function is called

**Accessibility issues**
- Verify accessibility labels are provided
- Check color contrast ratios
- Ensure proper semantic roles are used

## 📚 Related Components

- [Button](./button.md) - Interactive button with text
- [Card](./card.md) - Container component
- [TextInput](./text-input.md) - Input component with text
- [Badge](./badge.md) - Status indicator with text

---

**Next**: Learn about the [TextInput component](./text-input.md) for form inputs.
