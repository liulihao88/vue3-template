# SF Symbols with expo-image

## Overview

Use `expo-image` with SF Symbols on iOS. This supports:

- Native SF Symbols rendering
- Animation support
- Weight and scale configuration
- Native performance

## Usage

```tsx
import { Image } from 'expo-image'

// Basic SF Symbol
;<Image source="sf:list.dash" style={{ width: 24, height: 24 }} tintColor={textColor} />
```

## Animations

SF Symbols supports several animation types:

```tsx
// Bounce animation
<Image
  source="sf:heart.bounce"
  style={{ width: 24, height: 24 }}
/>

// Pulse animation
<Image
  source="sf:bell.pulse"
  style={{ width: 24, height: 24 }}
/>

// Variable color
<Image
  source="sf:wifi"
  style={{ width: 24, height: 24 }}
/>
```

## Weights and Scales

Specify weight in the name:

```tsx
// Ultra light
<Image source="sf:heart.ultralight" />

// Black weight
<Image source="sf:heart.black" />
```

Common weights:

- `ultralight`
- `thin`
- `light`
- `regular`
- `medium`
- `semibold`
- `bold`
- `heavy`
- `black`

## Tinting

Always use `tintColor` to set the icon color:

```tsx
<Image source="sf:heart.fill" style={{ width: 24, height: 24 }} tintColor="red" />
```

## Best Practices

1. **Use `expo-image` not `expo-symbols`** - `expo-image` has built-in SF Symbols support
2. **Don't use `@expo/vector-icons` for SF Symbols** - it doesn't support the latest symbols
3. **Dynamic tinting** - respect user's dark mode by using dynamic colors
4. **Size appropriately** - match SF Symbols sizing to text size

## Alternatives for Android

For Android, use appropriate vector drawables or icon packs:

- `@expo/vector-icons` for Material Icons
- Use Android's native vector drawables
