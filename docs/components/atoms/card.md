# 🃏 Card Component

A versatile container component with elevation, shadows, and multiple variants for creating structured content layouts.

## 📋 Overview

The Card component provides a flexible container for grouping related content with consistent styling, elevation effects, and customizable variants. It's perfect for creating content blocks, product cards, and structured layouts.

## 🎯 Features

- **Multiple Variants**: Default, elevated, outlined, and filled styles
- **Elevation Levels**: 5 levels of shadow depth (0-5)
- **Customizable Styling**: Padding, margin, border radius, and colors
- **Pressable Support**: Optional press interaction with visual feedback
- **Theme Integration**: Automatic theme color integration
- **Responsive Design**: Adapts to different screen sizes
- **Accessibility**: Built-in accessibility features

## 📖 API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | **Required** | Card content |
| `variant` | `CardVariant` | `'default'` | Visual style variant |
| `elevation` | `CardElevation` | `2` | Shadow elevation level |
| `shadow` | `boolean` | `true` | Whether to show shadow |
| `borderRadius` | `number` | `12` | Border radius |
| `padding` | `number` | `16` | Internal padding |
| `margin` | `number` | `0` | External margin |
| `backgroundColor` | `string` | `undefined` | Custom background color |
| `borderColor` | `string` | `undefined` | Custom border color |
| `borderWidth` | `number` | `1` | Border width for outlined variant |
| `width` | `ViewStyle['width']` | `undefined` | Custom width |
| `height` | `ViewStyle['height']` | `undefined` | Custom height |
| `pressable` | `boolean` | `false` | Whether card is pressable |
| `onPress` | `() => void` | `undefined` | Press event handler |
| `style` | `StyleProp<ViewStyle>` | `undefined` | Custom styles |
| `testID` | `string` | `undefined` | Test identifier |

### CardVariant Type

```typescript
type CardVariant = 
  | 'default'   // Standard card with theme background
  | 'elevated'  // Card with shadow elevation
  | 'outlined'  // Card with border outline
  | 'filled';   // Card with filled background
```

### CardElevation Type

```typescript
type CardElevation = 0 | 1 | 2 | 3 | 4 | 5;
```

## 🎨 Variants

### Default Card
Standard card with theme background color.

```typescript
<Card variant="default" padding={20}>
  <Text variant="body1">Default card content</Text>
</Card>
```

### Elevated Card
Card with shadow elevation for depth.

```typescript
<Card variant="elevated" elevation={3} padding={20}>
  <Text variant="body1">Elevated card content</Text>
</Card>
```

### Outlined Card
Card with border outline.

```typescript
<Card variant="outlined" borderColor="#E0E0E0" padding={20}>
  <Text variant="body1">Outlined card content</Text>
</Card>
```

### Filled Card
Card with filled background color.

```typescript
<Card variant="filled" padding={20}>
  <Text variant="body1">Filled card content</Text>
</Card>
```

## 🔧 Advanced Usage

### Elevation Levels
```typescript
// No elevation
<Card elevation={0} padding={16}>
  <Text>Flat card</Text>
</Card>

// Light elevation
<Card elevation={1} padding={16}>
  <Text>Light shadow</Text>
</Card>

// Medium elevation
<Card elevation={2} padding={16}>
  <Text>Medium shadow</Text>
</Card>

// High elevation
<Card elevation={5} padding={16}>
  <Text>High shadow</Text>
</Card>
```

### Pressable Card
```typescript
<Card
  pressable
  onPress={() => console.log('Card pressed')}
  padding={20}
  elevation={2}
>
  <Text variant="heading3">Pressable Card</Text>
  <Text variant="body2">Tap to interact</Text>
</Card>
```

### Custom Styling
```typescript
<Card
  variant="elevated"
  backgroundColor="#F8F9FA"
  borderColor="#E9ECEF"
  borderRadius={16}
  padding={24}
  margin={8}
  elevation={3}
  style={{
    borderWidth: 1,
    borderStyle: 'dashed',
  }}
>
  <Text variant="heading3">Custom Styled Card</Text>
  <Text variant="body1">With custom colors and spacing</Text>
</Card>
```

### Fixed Dimensions
```typescript
<Card
  width={300}
  height={200}
  padding={20}
  elevation={2}
>
  <Text variant="heading3">Fixed Size Card</Text>
  <Text variant="body1">300x200 pixels</Text>
</Card>
```

### Product Card Example
```typescript
<Card
  variant="elevated"
  padding={16}
  margin={8}
  elevation={2}
  pressable
  onPress={() => navigateToProduct(product.id)}
>
  <Image
    source={{ uri: product.image }}
    width="100%"
    height={120}
    borderRadius={8}
  />
  <Text variant="heading3" weight="semibold" style={{ marginTop: 12 }}>
    {product.name}
  </Text>
  <Text variant="body2" color="secondary" style={{ marginTop: 4 }}>
    {product.category}
  </Text>
  <Text variant="body1" weight="bold" color="primary" style={{ marginTop: 8 }}>
    ${product.price}
  </Text>
</Card>
```

### List Item Card
```typescript
<Card
  variant="outlined"
  padding={16}
  margin={4}
  pressable
  onPress={() => handleItemPress(item)}
>
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <Avatar imageUrl={item.avatar} width={40} height={40} />
    <View style={{ marginLeft: 12, flex: 1 }}>
      <Text variant="body1" weight="medium">{item.name}</Text>
      <Text variant="body2" color="secondary">{item.description}</Text>
    </View>
    <Icon name="chevron-right" size={20} color="#999" />
  </View>
</Card>
```

## 🎨 Theme Integration

The Card component automatically integrates with your theme system:

```typescript
// Theme colors are automatically applied
const { colors } = useTheme();

// Default variant uses colors.background
// Filled variant uses colors.gray9
// Outlined variant uses colors.gray7 for border
// Shadow color uses colors.text
```

### Custom Theme Colors
```typescript
// In your theme configuration
const theme = {
  colors: {
    background: '#FAFAFB',  // Default card background
    gray7: '#DDDDDE',       // Border color for outlined variant
    gray9: '#F4F4F4',       // Background for filled variant
    text: '#1B1D20',        // Shadow color
  },
};
```

## 📱 Responsive Design

### Responsive Spacing
```typescript
import rs from '@/shared/utilities/responsiveSize';

<Card
  padding={rs(20)}        // Responsive padding
  margin={rs(8)}          // Responsive margin
  borderRadius={rs(12)}   // Responsive border radius
  elevation={2}
>
  <Text variant="body1">Responsive card</Text>
</Card>
```

### Screen Size Adaptation
```typescript
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const cardWidth = width > 768 ? 300 : width - 32;

<Card
  width={cardWidth}
  padding={20}
  elevation={2}
>
  <Text variant="body1">Adaptive width card</Text>
</Card>
```

## ♿ Accessibility

The Card component includes built-in accessibility features:

- **Accessibility Role**: Automatically set to "button" when pressable
- **Accessibility State**: Reflects pressed state
- **Screen Reader Support**: Proper announcements for interactions

### Custom Accessibility
```typescript
<Card
  pressable
  onPress={handlePress}
  accessibilityLabel="Product card for iPhone 15"
  accessibilityHint="Double tap to view product details"
  accessibilityRole="button"
>
  <Text variant="heading3">iPhone 15</Text>
  <Text variant="body1">Latest smartphone from Apple</Text>
</Card>
```

## 🧪 Testing

### Unit Test Example
```typescript
import { render, fireEvent } from '@testing-library/react-native';
import { Card } from '@/shared/components/atoms';

describe('Card Component', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <Card>
        <Text>Card Content</Text>
      </Card>
    );
    
    expect(getByText('Card Content')).toBeTruthy();
  });

  it('calls onPress when pressable card is pressed', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <Card pressable onPress={onPress} testID="pressable-card">
        <Text>Pressable Card</Text>
      </Card>
    );
    
    fireEvent.press(getByTestId('pressable-card'));
    expect(onPress).toHaveBeenCalled();
  });

  it('applies correct elevation styles', () => {
    const { getByTestId } = render(
      <Card elevation={3} testID="elevated-card">
        <Text>Elevated Card</Text>
      </Card>
    );
    
    const cardElement = getByTestId('elevated-card');
    expect(cardElement).toBeTruthy();
  });
});
```

### Snapshot Test
```typescript
import renderer from 'react-test-renderer';
import { Card } from '@/shared/components/atoms';

it('renders card variants correctly', () => {
  const variants = ['default', 'elevated', 'outlined', 'filled'];
  
  variants.forEach(variant => {
    const tree = renderer.create(
      <Card variant={variant}>
        <Text>Test Content</Text>
      </Card>
    ).toJSON();
    
    expect(tree).toMatchSnapshot();
  });
});
```

## 🎯 Best Practices

### Do's ✅

- Use appropriate elevation levels for visual hierarchy
- Choose variants that match your design system
- Use consistent padding and margin values
- Make cards pressable when they represent interactive content
- Use proper accessibility labels for pressable cards
- Test card appearance on different backgrounds
- Use responsive spacing for different screen sizes

### Don'ts ❌

- Don't use too many different elevation levels
- Don't make cards too small for touch targets
- Don't ignore accessibility requirements
- Don't use hard-coded colors instead of theme colors
- Don't forget to test on different devices
- Don't use excessive shadows that impact performance
- Don't make non-interactive content pressable

## 🔄 Migration Guide

### From Custom Container
```typescript
// Before
<View style={styles.cardContainer}>
  <Text>Card Content</Text>
</View>

// After
<Card variant="elevated" padding={16} elevation={2}>
  <Text>Card Content</Text>
</Card>
```

### From TouchableOpacity Card
```typescript
// Before
<TouchableOpacity style={styles.card} onPress={onPress}>
  <Text>Pressable Content</Text>
</TouchableOpacity>

// After
<Card pressable onPress={onPress} padding={16}>
  <Text>Pressable Content</Text>
</Card>
```

## 🐛 Troubleshooting

### Common Issues

**Card not showing shadow**
- Check if `shadow` prop is set to `true`
- Verify `elevation` prop is greater than 0
- Ensure platform supports shadow rendering

**Pressable card not responding**
- Verify `pressable` prop is set to `true`
- Check if `onPress` handler is provided
- Ensure card is not covered by other elements

**Custom colors not applying**
- Check if color values are valid hex codes
- Verify theme integration is working
- Ensure style props are not conflicting

**Performance issues with many cards**
- Consider using FlatList for large lists
- Reduce elevation levels for better performance
- Use memoization for complex card content

## 📚 Related Components

- [Button](./button.md) - Interactive button component
- [Text](./text.md) - Typography component
- [Image](./image.md) - Image component for card content
- [Avatar](./avatar.md) - User avatar component

---

**Next**: Learn about the [Image component](./image.md) for displaying images in cards.
