# 🔘 Button Component

A versatile and customizable button component with multiple variants, loading states, and icon support.

## 📋 Overview

The Button component is a fundamental interactive element that provides consistent styling and behavior across your application. It supports various visual variants, loading states, icons, and accessibility features.

## 🎯 Features

- **Multiple Variants**: Primary, secondary, outline, error, and disabled states
- **Icon Support**: Left or right positioned icons with customizable colors
- **Loading State**: Built-in loading indicator with customizable colors
- **Ripple Effect**: Material Design ripple animation
- **Accessibility**: Full accessibility support with proper labels
- **Theme Integration**: Automatic theme color integration
- **Customizable**: Extensive styling and behavior customization

## 📖 API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | **Required** | Button text content |
| `variant` | `ButtonVariant` | `'primary'` | Visual style variant |
| `onPress` | `() => void` | `() => {}` | Press event handler |
| `disabled` | `boolean` | `false` | Disabled state |
| `isLoading` | `boolean` | `false` | Loading state |
| `icon` | `string \| React.ReactNode` | `undefined` | Icon element or path |
| `iconPosition` | `'left' \| 'right'` | `'left'` | Icon position |
| `iconColor` | `ColorValue` | `undefined` | Custom icon color |
| `textColor` | `ColorValue` | `undefined` | Custom text color |
| `bgColor` | `ColorValue` | `undefined` | Custom background color |
| `rippleColor` | `ColorValue` | `undefined` | Custom ripple color |
| `activityColor` | `ColorValue` | `undefined` | Loading indicator color |
| `borderRadius` | `number` | `14` | Border radius |
| `textStyle` | `StyleProp<TextStyle>` | `{}` | Custom text styles |
| `wrapStyle` | `StyleProp<ViewStyle>` | `{}` | Custom container styles |

### ButtonVariant Type

```typescript
type ButtonVariant = 
  | 'primary'    // Primary action button
  | 'secondary'  // Secondary action button
  | 'outline'    // Outlined button
  | 'error'      // Error/danger button
  | 'disable';   // Disabled button
```

## 🎨 Variants

### Primary Button
The main call-to-action button with solid background.

```typescript
<Button
  text="Primary Button"
  variant="primary"
  onPress={() => console.log('Primary pressed')}
/>
```

### Secondary Button
Secondary action button with different styling.

```typescript
<Button
  text="Secondary Button"
  variant="secondary"
  onPress={() => console.log('Secondary pressed')}
/>
```

### Outline Button
Button with transparent background and border.

```typescript
<Button
  text="Outline Button"
  variant="outline"
  onPress={() => console.log('Outline pressed')}
/>
```

### Error Button
Button for destructive actions.

```typescript
<Button
  text="Delete Item"
  variant="error"
  onPress={() => console.log('Delete pressed')}
/>
```

### Disabled Button
Non-interactive button state.

```typescript
<Button
  text="Disabled Button"
  variant="disable"
  disabled={true}
/>
```

## 🔧 Advanced Usage

### With Icons

#### Left Icon
```typescript
<Button
  text="Save"
  icon="save"
  iconPosition="left"
  variant="primary"
  onPress={handleSave}
/>
```

#### Right Icon
```typescript
<Button
  text="Next"
  icon="arrow-right"
  iconPosition="right"
  variant="primary"
  onPress={handleNext}
/>
```

#### Custom Icon Component
```typescript
import { CustomIcon } from '@/assets/icons';

<Button
  text="Custom Icon"
  icon={<CustomIcon size={20} color="#fff" />}
  variant="primary"
  onPress={handleAction}
/>
```

### Loading State
```typescript
const [isLoading, setIsLoading] = useState(false);

<Button
  text="Submit"
  variant="primary"
  isLoading={isLoading}
  onPress={async () => {
    setIsLoading(true);
    await submitForm();
    setIsLoading(false);
  }}
/>
```

### Custom Styling
```typescript
<Button
  text="Custom Button"
  variant="primary"
  bgColor="#FF6B6B"
  textColor="#FFFFFF"
  borderRadius={20}
  textStyle={{ fontWeight: 'bold' }}
  wrapStyle={{ marginVertical: 10 }}
  onPress={handlePress}
/>
```

### Custom Ripple Effect
```typescript
<Button
  text="Custom Ripple"
  variant="primary"
  rippleColor="rgba(255, 255, 255, 0.3)"
  onPress={handlePress}
/>
```

## 🎨 Theme Integration

The Button component automatically integrates with your theme system:

```typescript
// Theme colors are automatically applied
const { colors } = useTheme();

// Primary variant uses colors.primary
// Secondary variant uses colors.secondary
// Text color adapts to theme
// Ripple color uses theme ripple color
```

### Custom Theme Colors
```typescript
// In your theme configuration
const theme = {
  colors: {
    primary: '#4E4DD7',      // Primary button background
    secondary: '#00CCCC',    // Secondary button background
    error: '#FF5630',        // Error button background
    text: '#1B1D20',         // Default text color
    white: '#FFFFFF',        // Text color on colored backgrounds
    ripple: '#000000',       // Ripple effect color
  },
};
```

## ♿ Accessibility

The Button component includes built-in accessibility features:

- **Accessibility Role**: Automatically set to "button"
- **Accessibility Label**: Uses the `text` prop as the label
- **Accessibility State**: Reflects disabled and loading states
- **Screen Reader Support**: Proper announcements for state changes

### Custom Accessibility
```typescript
<Button
  text="Save Document"
  variant="primary"
  accessibilityLabel="Save the current document"
  accessibilityHint="Double tap to save your changes"
  onPress={handleSave}
/>
```

## 📱 Platform Considerations

### iOS
- Native touch feedback
- Proper accessibility integration
- iOS-specific animations

### Android
- Material Design ripple effect
- Proper elevation and shadows
- Android-specific touch feedback

## 🧪 Testing

### Unit Test Example
```typescript
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '@/shared/components/atoms';

describe('Button Component', () => {
  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Button text="Test Button" onPress={onPress} />
    );
    
    fireEvent.press(getByText('Test Button'));
    expect(onPress).toHaveBeenCalled();
  });

  it('does not call onPress when disabled', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Button text="Disabled Button" disabled onPress={onPress} />
    );
    
    fireEvent.press(getByText('Disabled Button'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('shows loading state correctly', () => {
    const { getByTestId } = render(
      <Button text="Loading Button" isLoading />
    );
    
    expect(getByTestId('button-loader')).toBeTruthy();
  });
});
```

### Snapshot Test
```typescript
import renderer from 'react-test-renderer';
import { Button } from '@/shared/components/atoms';

it('renders primary button correctly', () => {
  const tree = renderer.create(
    <Button text="Primary Button" variant="primary" />
  ).toJSON();
  
  expect(tree).toMatchSnapshot();
});
```

## 🎯 Best Practices

### Do's ✅

- Use primary variant for main actions
- Use secondary variant for secondary actions
- Use error variant for destructive actions
- Provide clear, actionable button text
- Use icons to enhance button meaning
- Handle loading states for async actions
- Test button interactions thoroughly

### Don'ts ❌

- Don't use too many primary buttons on one screen
- Don't make buttons too small for touch targets
- Don't use vague button text like "Click here"
- Don't forget to handle disabled states
- Don't ignore accessibility requirements
- Don't use error variant for non-destructive actions

## 🔄 Migration Guide

### From Custom Button
```typescript
// Before
<TouchableOpacity style={customButtonStyle} onPress={onPress}>
  <Text style={customTextStyle}>{title}</Text>
</TouchableOpacity>

// After
<Button
  text={title}
  variant="primary"
  onPress={onPress}
  textStyle={customTextStyle}
  wrapStyle={customButtonStyle}
/>
```

## 🐛 Troubleshooting

### Common Issues

**Button not responding to touch**
- Check if `disabled` prop is set to `true`
- Verify `onPress` handler is provided
- Ensure button is not covered by other elements

**Loading state not showing**
- Verify `isLoading` prop is set to `true`
- Check if loading indicator is properly imported

**Icon not displaying**
- Verify icon path is correct
- Check if icon component is properly imported
- Ensure icon size is appropriate

**Styling not applying**
- Check if custom styles are properly formatted
- Verify theme integration is working
- Ensure style props are not conflicting

## 📚 Related Components

- [IconButton](./icon-button.md) - Icon-only button variant
- [Text](./text.md) - Typography component
- [Card](./card.md) - Container component
- [Loader](./loader.md) - Loading indicator

---

**Next**: Learn about the [IconButton component](./icon-button.md) for icon-only button variants.
