# Card Component

A flexible and customizable Card component for React Native applications with multiple variants, elevation levels, and styling options.

## Features

- **Multiple Variants**: `default`, `elevated`, `outlined`, `filled`
- **Elevation Levels**: 0-5 with predefined shadow styles
- **Customizable**: Border radius, padding, margin, colors
- **Pressable Support**: Optional press handling
- **TypeScript**: Full TypeScript support with proper types
- **Responsive**: Uses responsive sizing utilities

## Basic Usage

```tsx
import { Card } from '@/shared/components/atoms';

// Simple card
<Card>
  <Text>Basic card content</Text>
</Card>

// Card with custom styling
<Card
  variant="elevated"
  elevation={3}
  borderRadius={16}
  padding={20}
>
  <Text>Elevated card with custom padding</Text>
</Card>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'elevated' \| 'outlined' \| 'filled'` | `'default'` | Visual variant of the card |
| `borderRadius` | `number` | `12` | Border radius of the card |
| `elevation` | `0 \| 1 \| 2 \| 3 \| 4 \| 5` | `2` | Shadow elevation level |
| `shadow` | `boolean` | `true` | Whether to show shadow |
| `padding` | `number` | `16` | Padding inside the card |
| `margin` | `number` | `0` | Margin around the card |
| `backgroundColor` | `string` | - | Custom background color |
| `borderColor` | `string` | - | Border color for outlined variant |
| `borderWidth` | `number` | `1` | Border width for outlined variant |
| `width` | `ViewStyle['width']` | - | Custom width |
| `height` | `ViewStyle['height']` | - | Custom height |
| `pressable` | `boolean` | `false` | Whether the card is pressable |
| `onPress` | `() => void` | - | Callback when pressed (requires pressable=true) |
| `testID` | `string` | - | Test identifier |
| `style` | `ViewStyle` | - | Additional styles |

## Variants

### Default
Basic card with background color from theme.

```tsx
<Card variant="default">
  <Text>Default card</Text>
</Card>
```

### Elevated
Card with enhanced shadow and elevation.

```tsx
<Card variant="elevated" elevation={4}>
  <Text>Elevated card</Text>
</Card>
```

### Outlined
Card with border and no fill.

```tsx
<Card variant="outlined" borderColor="#E0E0E0">
  <Text>Outlined card</Text>
</Card>
```

### Filled
Card with filled background color.

```tsx
<Card variant="filled">
  <Text>Filled card</Text>
</Card>
```

## Elevation Levels

The card supports 6 elevation levels (0-5) with predefined shadow styles:

- **0**: No shadow
- **1**: Subtle shadow (1px offset, 0.05 opacity)
- **2**: Light shadow (2px offset, 0.1 opacity) - *Default*
- **3**: Medium shadow (4px offset, 0.15 opacity)
- **4**: Strong shadow (6px offset, 0.2 opacity)
- **5**: Very strong shadow (8px offset, 0.25 opacity)

```tsx
<Card elevation={0}>No shadow</Card>
<Card elevation={3}>Medium shadow</Card>
<Card elevation={5}>Strong shadow</Card>
```

## Advanced Examples

### User Profile Card
```tsx
<Card
  variant="elevated"
  elevation={3}
  borderRadius={16}
  padding={20}
>
  <View style={styles.profileContainer}>
    <Image source={{ uri: user.avatar }} style={styles.avatar} />
    <View>
      <Text variant="heading3">{user.name}</Text>
      <Text variant="body2" color="secondary">{user.email}</Text>
    </View>
  </View>
</Card>
```

### Interactive Feature Card
```tsx
<Card
  variant="outlined"
  pressable
  onPress={() => handleFeaturePress()}
  borderRadius={12}
  padding={16}
>
  <View style={styles.featureContainer}>
    <Icon name="star" size={24} />
    <Text variant="body1">Tap to explore</Text>
  </View>
</Card>
```

### Stats Card
```tsx
<Card
  variant="filled"
  backgroundColor="#F0F8FF"
  borderRadius={16}
  padding={24}
>
  <Text variant="heading2" style={{ textAlign: 'center' }}>
    Statistics
  </Text>
  <View style={styles.statsGrid}>
    {/* Stats content */}
  </View>
</Card>
```

### Custom Styled Card
```tsx
<Card
  backgroundColor="#FF6B6B"
  borderColor="#FF5252"
  borderWidth={2}
  borderRadius={20}
  padding={32}
  margin={16}
  shadow={false}
  width="100%"
  height={200}
>
  <Text color="white">Custom styled card</Text>
</Card>
```

## Best Practices

1. **Use appropriate variants**: Choose the variant that best fits your design needs
2. **Consistent elevation**: Use consistent elevation levels throughout your app
3. **Responsive design**: Use the responsive sizing utilities for consistent spacing
4. **Accessibility**: Add proper `testID` for testing and accessibility
5. **Performance**: Avoid unnecessary re-renders by memoizing onPress callbacks

## Theming

The Card component automatically adapts to your app's theme colors:

- `colors.background` - Default background
- `colors.gray7` - Default border color
- `colors.gray9` - Filled variant background
- `colors.text` - Shadow color

You can override these by passing custom `backgroundColor` and `borderColor` props. 