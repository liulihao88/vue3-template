# CSS Gradients with Expo New Architecture

## Overview

Expo supports CSS gradients via the experimental `backgroundImage` prop when using the New Architecture. This is currently only available in Expo SDK 50+ with New Architecture enabled.

## Requirements

- Expo SDK 50+
- New Architecture enabled
- iOS 16+ / Android 13+

## Usage

### Linear Gradient

```tsx
import { View } from 'react-native'

;<View
  style={{
    backgroundImage: 'linear-gradient(45deg, #ff0000, #00ff00, #0000ff)',
  }}
/>
```

### Radial Gradient

```tsx
<View
  style={{
    backgroundImage: 'radial-gradient(circle at center, #ffffff, #000000)',
  }}
/>
```

### Multiple Gradients

```tsx
<View
  style={{
    backgroundImage: `
      linear-gradient(to right, rgba(255,255,255,0.8), transparent),
      linear-gradient(45deg, #ff0000, #00ff00)
    `,
  }}
/>
```

## Comparison with expo-linear-gradient

| Feature                   | CSS Gradient     | expo-linear-gradient |
| ------------------------- | ---------------- | -------------------- |
| Performance               | Native rendering | JavaScript           |
| Multiple stops            | ✓ Full support   | ✓ Full support       |
| Multiple gradients        | ✓                | ✗                    |
| Radial gradients          | ✓                | ✗                    |
| New Architecture required | ✓                | ✗                    |

Use CSS gradients when possible with New Architecture, fall back to `expo-linear-gradient` for older architectures.

## Installation

No additional installation needed when using New Architecture.

For classic architecture, use:

```bash
npx expo install expo-linear-gradient
```

## Example with expo-linear-gradient (Classic Architecture)

```tsx
import { LinearGradient } from 'expo-linear-gradient'

;<LinearGradient
  colors={['#ff0000', '#00ff00', '#0000ff']}
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 1 }}
  style={{ flex: 1 }}
>
  <Content />
</LinearGradient>
```

## Notes

- This is currently experimental in Expo
- Always check if the user is using New Architecture before using CSS gradients
- Fall back to `expo-linear-gradient` for broader compatibility
