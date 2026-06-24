# Stack Headers and Toolbar Buttons

## Overview

Proper configuration of stack headers and navigation bar buttons on iOS.

## Basic Header Configuration

```tsx
import { Stack } from 'expo-router'

;<Stack.Screen
  name="screen"
  options={{
    title: 'Screen Title',
    headerLargeTitle: true,
    headerTransparent: true,
    headerShadowVisible: false,
  }}
/>
```

## Bar Buttons

### Left Button

```tsx
import { Link } from 'expo-router'
import { Button } from 'react-native'

;<Stack.Screen
  options={{
    headerLeft: () => (
      <Link href="/modal" asChild>
        <Button title="Add" />
      </Link>
    ),
  }}
/>
```

### Right Button (Menu)

```tsx
import { Menu, Icon } from 'react-native-ios-kit'

;<Stack.Screen
  options={{
    headerRight: () => (
      <Menu
        trigger={<Icon name="ellipsis" />}
        actions={[
          {
            title: 'Share',
            icon: 'square.and.arrow.up',
            handler: handleShare,
          },
          {
            title: 'Delete',
            icon: 'trash',
            destructive: true,
            handler: handleDelete,
          },
        ]}
      />
    ),
  }}
/>
```

## Search in Header

Prefer the built-in `headerSearchBarOptions`:

```tsx
<Stack.Screen
  options={{
    headerSearchBarOptions: {
      placeholder: 'Search...',
      onChangeText: handleSearch,
    },
  }}
/>
```

See [search.md](search.md) for full search implementation.

## iOS Specific Patterns

### Large Titles

Enable `headerLargeTitle` for the iOS large title style:

```tsx
<Stack.Screen
  options={{
    headerLargeTitle: true,
    headerLargeTitleStyle: {
      color: PlatformColor('label'),
    },
  }}
/>
```

### Transparent Headers

For a modern look with transparent headers and content under the status bar:

```tsx
<Stack.Screen
  options={{
    headerTransparent: true,
    headerShadowVisible: false,
  }}
/>
```

Then ensure your content uses `contentInsetAdjustmentBehavior="automatic"`:

```tsx
<ScrollView contentInsetAdjustmentBehavior="automatic">
  <Content />
</ScrollView>
```

## Toolbar

For bottom toolbar in navigation stack:

```tsx
<Stack.Screen
  options={{
    toolbar: {
      items: [
        {
          title: 'Action',
          onPress: handleAction,
        },
      ],
    },
  }}
/>
```

## Best Practices

- **Use system icons** where possible (SF Symbols)
- **Minimize buttons** - don't crowd the header
- **Place destructive actions in menus** - not directly on the header
- **Follow iOS spacing guidelines** - keep buttons properly spaced
- **Use large titles** for top-level screens
- **Turn off shadows** for transparent headers
- **Always set contentInsetAdjustmentBehavior** on scroll views
