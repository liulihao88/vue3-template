# Visual Effects: Blur and Liquid Glass

## Blur with expo-blur

Use `expo-blur` for native blur effects:

```bash
npx expo install expo-blur
```

### Basic Blur View

```tsx
import { BlurView } from 'expo-blur'

;<BlurView
  intensity={80}
  tint="systemMaterial"
  style={{
    borderRadius: 16,
    overflow: 'hidden',
  }}
>
  <Content />
</BlurView>
```

### Tint Options

- `default`
- `extraLight`
- `light`
- `dark`
- `tinted`
- `systemMaterial`
- `systemUltraThinMaterial`
- `systemThinMaterial`
- `systemMaterialDark`
- `systemMaterialLight`

## Liquid Glass with expo-glass-effect

For the modern liquid glass effect (iOS 26+), use `expo-glass-effect`:

```bash
npx expo install expo-glass-effect
```

```tsx
import { GlassEffect } from 'expo-glass-effect'

;<GlassEffect intensity={0.8} cornerRadius={16} style={{ flex: 1 }}>
  <Content />
</GlassEffect>
```

## Use Cases

1. **Bottom Sheets/Modals** - Blurred background for form sheets
2. **Navigation Bar** - Blurred navigation bar background
3. **Cards** - Blurred card content
4. **Background Overlays** - Blurred background for modal content

## Compositing Examples

### Blurred Background with Content

```tsx
import { View, StyleSheet } from 'react-native'
import { BlurView } from 'expo-blur'

export default function BlurredCard() {
  return (
    <View style={styles.container}>
      <BlurView intensity={60} style={StyleSheet.absoluteFill} />
      <View style={styles.content}>
        <Content />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  content: {
    padding: 16,
    position: 'relative',
    zIndex: 1,
  },
})
```

### Form Sheet with Liquid Glass

```tsx
// In screen options:
// contentStyle: { backgroundColor: "transparent" }

import { GlassEffect } from 'expo-glass-effect'

export default function Sheet() {
  return (
    <GlassEffect intensity={0.7} cornerRadius={16} style={{ flex: 1 }}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <SheetContent />
      </ScrollView>
    </GlassEffect>
  )
}
```

## Best Practices

- **Adjust intensity based on context** - 50-80 is good for most use cases
- **Respect dark mode** - Use dynamic tint that adapts to user interface style
- **Performance** - Too many blur views can impact performance, use sparingly
- **Corner radius** - Always set `overflow: 'hidden'` when using borderRadius
