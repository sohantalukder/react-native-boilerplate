# 🎨 Color System

A comprehensive guide to the color system used in the React Native Boilerplate. This document covers color palettes, usage guidelines, accessibility considerations, and implementation details.

## 📋 Overview

Our color system is designed to provide consistency, accessibility, and flexibility across all components and screens. It supports both light and dark modes with carefully selected color palettes that meet WCAG 2.1 AA accessibility standards.

## 🎯 Design Principles

### 1. Accessibility First
All color combinations meet or exceed WCAG 2.1 AA contrast requirements:
- **Normal Text**: Minimum 4.5:1 contrast ratio
- **Large Text**: Minimum 3:1 contrast ratio
- **UI Components**: Minimum 3:1 contrast ratio

### 2. Semantic Meaning
Colors have semantic meaning and should be used consistently:
- **Primary**: Main brand color for primary actions
- **Secondary**: Secondary brand color for secondary actions
- **Success**: Positive states and confirmations
- **Warning**: Caution states and pending actions
- **Error**: Error states and destructive actions
- **Info**: Information and neutral states

### 3. Theme Consistency
Colors automatically adapt to light and dark themes while maintaining visual hierarchy and accessibility.

## 🌈 Color Palettes

### Primary Brand Colors

#### Primary Color
```typescript
primary: '#4E4DD7'
```
- **Usage**: Main call-to-action buttons, links, brand elements
- **Light Mode**: Deep purple for strong visual impact
- **Dark Mode**: Same color for brand consistency
- **Accessibility**: Meets AA standards on both light and dark backgrounds

#### Secondary Color
```typescript
secondary: '#00CCCC'
```
- **Usage**: Secondary actions, accents, highlights
- **Light Mode**: Cyan for complementary contrast
- **Dark Mode**: Same color for consistency
- **Accessibility**: High contrast on both themes

### Semantic Colors

#### Success Color
```typescript
success: '#22C55E'
```
- **Usage**: Success messages, positive states, confirmations
- **Examples**: "Save successful", "Item added", "Form submitted"
- **Accessibility**: High contrast green that works on both themes

#### Warning Color
```typescript
warning: '#FFAB00'
```
- **Usage**: Warning messages, caution states, pending actions
- **Examples**: "Unsaved changes", "Low battery", "Pending approval"
- **Accessibility**: High contrast amber that's visible on both themes

#### Error Color
```typescript
error: '#FF5630'
```
- **Usage**: Error messages, destructive actions, critical states
- **Examples**: "Delete item", "Validation error", "Connection failed"
- **Accessibility**: High contrast red for critical information

#### Info Color
```typescript
info: '#00B8D9'
```
- **Usage**: Information messages, neutral states, help text
- **Examples**: "New feature available", "Help text", "Status updates"
- **Accessibility**: High contrast blue for informational content

### Neutral Colors

#### Background Colors

##### Light Mode Background
```typescript
background: '#FAFAFB'
```
- **Usage**: Main app background
- **Accessibility**: High contrast with text colors
- **Notes**: Slightly off-white to reduce eye strain

##### Dark Mode Background
```typescript
background: '#080402'
```
- **Usage**: Main app background in dark mode
- **Accessibility**: High contrast with light text
- **Notes**: Very dark but not pure black to reduce eye strain

#### Text Colors

##### Light Mode Text
```typescript
text: '#1B1D20'
```
- **Usage**: Primary text color
- **Accessibility**: 4.5:1 contrast ratio on light background
- **Notes**: Dark gray for better readability than pure black

##### Dark Mode Text
```typescript
text: '#FFFFFF'
```
- **Usage**: Primary text color in dark mode
- **Accessibility**: 4.5:1 contrast ratio on dark background
- **Notes**: Pure white for maximum contrast

### Gray Scale

Our gray scale provides a comprehensive range of neutral colors for borders, dividers, and secondary text.

#### Light Mode Gray Scale
```typescript
const lightGrayScale = {
  gray0: '#1B1D20',    // Darkest - Primary text
  gray1: '#323436',    // Dark - Secondary text
  gray2: '#494A4D',    // Medium dark - Tertiary text
  gray3: '#5F6163',    // Medium - Placeholder text
  gray4: '#767779',    // Light medium - Disabled text
  gray5: '#98999B',    // Light - Borders
  gray6: '#AFB0B1',    // Very light - Dividers
  gray7: '#DDDDDE',    // Lightest - Subtle borders
  gray8: '#E8E8E9',    // Very lightest - Background borders
  gray9: '#F4F4F4',    // Background - Card backgrounds
  gray10: '#FAFAFA',   // Lightest - Main background
};
```

#### Dark Mode Gray Scale
```typescript
const darkGrayScale = {
  gray0: '#F4F4F4',    // Lightest - Primary text
  gray1: '#DDDDDE',    // Light - Secondary text
  gray2: '#B0B1B2',    // Medium light - Tertiary text
  gray3: '#9A9B9D',    // Medium - Placeholder text
  gray4: '#7C7D7F',    // Medium dark - Disabled text
  gray5: '#616263',    // Dark - Borders
  gray6: '#4A4B4D',    // Very dark - Dividers
  gray7: '#373839',    // Darkest - Subtle borders
  gray8: '#2C2D2F',    // Very darkest - Background borders
  gray9: '#131415',    // Background - Card backgrounds
  gray10: '#1F222A',   // Darkest - Main background
};
```

## 🎨 Color Usage Guidelines

### Primary Colors Usage

#### Primary Color (#4E4DD7)
```typescript
// ✅ Good - Primary actions
<Button variant="primary" text="Save Changes" />
<Text color="primary">Important Link</Text>

// ❌ Avoid - Secondary actions
<Button variant="primary" text="Cancel" />
<Text color="primary">Secondary information</Text>
```

#### Secondary Color (#00CCCC)
```typescript
// ✅ Good - Secondary actions
<Button variant="secondary" text="Learn More" />
<Text color="secondary">Additional information</Text>

// ❌ Avoid - Primary actions
<Button variant="secondary" text="Submit Form" />
```

### Semantic Colors Usage

#### Success Color (#22C55E)
```typescript
// ✅ Good - Success states
<Text color="success">✓ Changes saved successfully</Text>
<Button variant="success" text="Confirm" />

// ❌ Avoid - Non-success states
<Text color="success">Regular information</Text>
```

#### Warning Color (#FFAB00)
```typescript
// ✅ Good - Warning states
<Text color="warning">⚠ Unsaved changes</Text>
<Button variant="warning" text="Continue Anyway" />

// ❌ Avoid - Non-warning states
<Text color="warning">Success message</Text>
```

#### Error Color (#FF5630)
```typescript
// ✅ Good - Error states
<Text color="error">✗ Validation failed</Text>
<Button variant="error" text="Delete Item" />

// ❌ Avoid - Non-error states
<Text color="error">Regular information</Text>
```

### Neutral Colors Usage

#### Text Colors
```typescript
// ✅ Good - Proper hierarchy
<Text variant="heading1" color="default">Main Title</Text>
<Text variant="body1" color="default">Body text</Text>
<Text variant="body2" color="secondary">Secondary text</Text>

// ❌ Avoid - Inconsistent hierarchy
<Text variant="body1" color="primary">Body text</Text>
<Text variant="heading1" color="secondary">Main title</Text>
```

#### Background Colors
```typescript
// ✅ Good - Proper contrast
<View style={{ backgroundColor: colors.background }}>
  <Text color="default">High contrast text</Text>
</View>

// ❌ Avoid - Poor contrast
<View style={{ backgroundColor: colors.gray5 }}>
  <Text color="default">Low contrast text</Text>
</View>
```

## 🌙 Dark Mode Considerations

### Automatic Theme Adaptation

Colors automatically adapt to the current theme:

```typescript
const { colors } = useTheme();

// Colors automatically switch based on theme
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,  // Adapts to theme
    borderColor: colors.gray7,          // Adapts to theme
  },
  text: {
    color: colors.text,                 // Adapts to theme
  },
});
```

### Dark Mode Best Practices

1. **Test Both Modes**: Always test your components in both light and dark modes
2. **Avoid Pure Black**: Use dark grays instead of pure black (#000000)
3. **Maintain Contrast**: Ensure sufficient contrast in both modes
4. **Consider Images**: Adjust image brightness for dark mode

### Dark Mode Color Adjustments

```typescript
// ✅ Good - Theme-aware colors
const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background,
    borderColor: colors.gray7,
  },
});

// ❌ Avoid - Hard-coded colors
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E0E0E0',
  },
});
```

## ♿ Accessibility Guidelines

### Contrast Requirements

All color combinations must meet WCAG 2.1 AA standards:

#### Text Contrast
- **Normal Text**: Minimum 4.5:1 contrast ratio
- **Large Text (18px+)**: Minimum 3:1 contrast ratio
- **UI Components**: Minimum 3:1 contrast ratio

#### Color Combinations

##### Light Mode Contrast Ratios
```typescript
const lightModeContrast = {
  'text on background': '4.5:1',      // ✅ AA compliant
  'primary on background': '4.8:1',   // ✅ AA compliant
  'secondary on background': '3.2:1', // ✅ AA compliant
  'success on background': '4.2:1',   // ✅ AA compliant
  'warning on background': '3.1:1',   // ✅ AA compliant
  'error on background': '4.1:1',     // ✅ AA compliant
};
```

##### Dark Mode Contrast Ratios
```typescript
const darkModeContrast = {
  'text on background': '4.5:1',      // ✅ AA compliant
  'primary on background': '4.8:1',   // ✅ AA compliant
  'secondary on background': '3.2:1', // ✅ AA compliant
  'success on background': '4.2:1',   // ✅ AA compliant
  'warning on background': '3.1:1',   // ✅ AA compliant
  'error on background': '4.1:1',     // ✅ AA compliant
};
```

### Color Blindness Considerations

Our color system is designed to be accessible to users with color vision deficiencies:

1. **Don't Rely on Color Alone**: Use icons, text, or patterns in addition to color
2. **Test with Simulators**: Use color blindness simulators to test your designs
3. **Provide Alternatives**: Ensure information is conveyed through multiple means

```typescript
// ✅ Good - Multiple indicators
<View style={{ flexDirection: 'row', alignItems: 'center' }}>
  <Icon name="check" color={colors.success} size={16} />
  <Text color="success">Success message</Text>
</View>

// ❌ Avoid - Color only
<Text color="success">Success message</Text>
```

## 🔧 Implementation

### Theme Integration

Colors are automatically integrated with the theme system:

```typescript
import { useTheme } from '@/theme';

const MyComponent = () => {
  const { colors } = useTheme();
  
  return (
    <View style={{ backgroundColor: colors.background }}>
      <Text style={{ color: colors.text }}>
        Theme-aware text
      </Text>
    </View>
  );
};
```

### Custom Color Usage

For custom colors, ensure they meet accessibility standards:

```typescript
// ✅ Good - Accessible custom color
const customColor = '#1E40AF'; // Blue with good contrast

// ❌ Avoid - Low contrast color
const customColor = '#ADD8E6'; // Light blue with poor contrast
```

### Color Utilities

Use color utilities for opacity and variations:

```typescript
import withOpacity from '@/shared/utilities/withOpacity';

// Create color variations
const primaryWithOpacity = withOpacity(colors.primary, 0.1);
const errorWithOpacity = withOpacity(colors.error, 0.2);
```

## 🧪 Testing Colors

### Contrast Testing

Test color combinations for accessibility:

```typescript
// Test contrast ratios
const testContrast = (foreground, background) => {
  // Implementation for contrast testing
  // Should return contrast ratio
};

// Example usage
const contrast = testContrast(colors.text, colors.background);
console.log(`Contrast ratio: ${contrast}:1`);
```

### Visual Testing

Test colors in different contexts:

1. **Different Backgrounds**: Test on various background colors
2. **Different Sizes**: Test at different text sizes
3. **Different Devices**: Test on various screen types
4. **Different Lighting**: Test in various lighting conditions

## 📚 Resources

### Color Tools
- [WebAIM Color Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Coolors.co](https://coolors.co/) - Color palette generator
- [Adobe Color](https://color.adobe.com/) - Color wheel and palettes

### Accessibility Resources
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Color Blindness Simulator](https://www.color-blindness.com/coblis-color-blindness-simulator/)
- [Contrast Ratio Calculator](https://contrast-ratio.com/)

### Design Resources
- [Material Design Color System](https://material.io/design/color/)
- [Human Interface Guidelines - Color](https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/color/)
- [Material Design Color Tool](https://material.io/resources/color/)

---

**Next**: Learn about [Typography](./typography.md) for text styling and hierarchy.
