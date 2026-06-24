# Native Tabs

## Overview

Use `expo-router/unstable-native-tabs` for truly native tabs on iOS. This replaces JavaScript-based tab bars with native platform tabs.

## Migrating from JavaScript Tabs

### Before (JavaScript Tabs)

```tsx
// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-tabs'

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
    </Tabs>
  )
}
```

### After (Native Tabs)

```tsx
// app/(tabs)/_layout.tsx
import { NativeTabs } from 'expo-router/unstable-native-tabs'

export default function Layout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="(index)">
        <Icon sf="house" />
        <Label>Home</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="(settings)">
        <Icon sf="gear" />
        <Label>Settings</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  )
}
```

## iOS 26 Features

iOS 26 introduces several new native tab bar features:

- **Sidebar-style tabs** on iPad
- **Customizable tab bar height**
- **Improved accessibility**
- **Smooth animations** when switching tabs

## Basic Structure

```tsx
// app/_layout.tsx (root)
import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs'
import { Theme } from '../components/theme'

export default function Layout() {
  return (
    <Theme>
      <NativeTabs>
        <NativeTabs.Trigger name="(index)">
          <Icon sf="list.dash" />
          <Label>Items</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="(search)" role="search">
          <Icon sf="magnifyingglass" />
          <Label>Search</Label>
        </NativeTabs.Trigger>
      </NativeTabs>
    </Theme>
  )
}
```

Then inside each tab group:

```tsx
// app/(index)/_layout.tsx
import { Stack } from 'expo-router/stack'

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Items' }} />
    </Stack>
  )
}
```

## Badges

Add badges to tab triggers:

```tsx
<NativeTabs.Trigger name="notifications">
  <Icon sf="bell" />
  <Label>Notifications</Label>
  <Badge value={unreadCount} />
</NativeTabs.Trigger>
```

## Best Practices

1. **Use native tabs** - Prefer `NativeTabs` over JavaScript tabs on iOS for better performance
2. **Use SF Symbols** - Provide native icons for tab bar items
3. **Keep labels short** - Tab bar labels should be concise
4. **Group related screens** - Each tab should contain its own navigation stack
5. **Use appropriate icons** - Icons should be recognizable and match iOS conventions

## Performance Benefits

- Native rendering by iOS
- Smoother transitions between tabs
- Better memory management
- Properly handles safe area insets
- Automatic keyboard avoidance
