# Form Sheets in Expo Router

## Overview

Form sheets are a native iOS modal presentation style that:

- Presents content from the bottom of the screen
- Allows dragging to dismiss
- Supports multiple detents (half-height, full-height)
- Can have a grabber visible

## Configuration

### Basic Form Sheet

```tsx
// app/sheet.tsx
import { Stack } from 'expo-router'

export default function SheetScreen() {
  return (
    <>
      <Stack.Screen
        name="sheet"
        options={{
          presentation: 'formSheet',
          sheetAllowedDetents: [0.5, 1.0],
          sheetGrabberVisible: true,
        }}
      />
      <Content />
    </>
  )
}
```

### Transparent Background with Liquid Glass

On iOS 26+, you can enable transparent background for liquid glass effect:

```tsx
<Stack.Screen
  name="sheet"
  options={{
    presentation: 'formSheet',
    sheetAllowedDetents: [0.5, 1.0],
    sheetGrabberVisible: true,
    contentStyle: { backgroundColor: 'transparent' },
  }}
/>
```

Then in your content:

```tsx
import { BlurView } from 'expo-blur'

export default function SheetContent() {
  return (
    <BlurView intensity={80} style={{ flex: 1, borderRadius: 16 }}>
      <Content />
    </BlurView>
  )
}
```

## Footers

For form sheets that need a persistent footer at the bottom:

```tsx
import { View, ScrollView, Button } from 'react-native'

export default function FormSheet() {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }} contentInsetAdjustmentBehavior="automatic">
        <FormContent />
      </ScrollView>
      <View style={{ padding: 16, borderTopWidth: 1, borderTopColor: 'rgba(0,0,0,0.1)' }}>
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </View>
  )
}
```

## Background Interaction

By default, background content is dimmed and not interactive. To allow interaction with the background behind the form sheet (iOS 15+):

```tsx
// This needs to be set in the screen options
options={{
  presentation: "formSheet",
  // Allows taps to pass through to the content below
  sheetAllowsContentTouch: true,
}}
```

## Common Use Cases

1. **Filters/Pickers** - Half-height sheet for selecting options
2. **User Input Forms** - Mixed detent for shorter forms
3. **Info Panels** - Allow dragging to expand for more content
4. **Action Sheets** - Short detent for quick actions

## Best Practices

- **Provide a grabber** for user-draggable sheets
- **Use appropriate detents** - Don't offer unnecessary sizing options
- **Handle safe area** - Ensure content isn't hidden by the grabber or bottom bar
- **Transparent backgrounds** - Use with liquid glass on iOS 26+ for modern look
