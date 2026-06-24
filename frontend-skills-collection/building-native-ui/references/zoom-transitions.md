# Apple Zoom Transitions

## Overview

iOS 18+ introduces native Apple Zoom transitions with `Link.AppleZoom`. This creates a fluid zoom transition from a source view to a destination screen.

## Requirements

- iOS 18+
- Expo SDK 50+
- expo-router

## Usage

```tsx
import { Link } from 'expo-router'

// Source component with thumbnail
;<Link
  href={`/item/${item.id}`}
  appleZoom={{
    source: sourceRef,
  }}
>
  <Image ref={sourceRef} source={{ uri: item.thumbnail }} style={{ width: 100, height: 100, borderRadius: 8 }} />
</Link>
```

## In Destination Screen

On the destination screen, use `appleZoom` to get the matched content:

```tsx
// app/item/[id].tsx
import { useLocalSearchParams } from 'expo-router'
import { useAppleZoom } from 'expo-router'

export default function ItemScreen() {
  const { zoomTransition } = useAppleZoom()
  const { id } = useLocalSearchParams()
  const item = getItemById(id)

  return (
    <View style={{ flex: 1 }}>
      <Image source={{ uri: item.image }} style={{ width: '100%', height: 300 }} {...zoomTransition.contentProps} />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Content item={item} />
      </ScrollView>
    </View>
  )
}

// Configure the screen presentation
export function unstable_settingsScreenOptions() {
  return {
    presentation: 'appleZoom',
  }
}
```

## Configuration Options

```tsx
<Link
  href="/destination"
  appleZoom={{
    source: sourceRef,
    tintColor: 'systemBackground',
    cornerRadius: 16,
  }}
>
  <SourceImage ref={sourceRef} />
</Link>
```

## Common Use Cases

1. **Image galleries** - Zoom from thumbnail to full-screen image
2. **Card-based lists** - Zoom from card to detail screen
3. **Product grids** - Smooth transition from product grid to detail view
4. **Photo grids** - Native iOS 18-style photo browsing

## Best Practices

- **Match the source** - Ensure the source view matches the aspect ratio of the destination for a smoother animation
- **Use with native stack** - Apple Zoom only works with native stack navigation
- **Handle back navigation** - The transition automatically handles animated back navigation
- **Respect iOS version** - Falls back to normal push on older iOS versions
- **Keep content simple** during transition - Avoid complex animations in the destination during the zoom transition

## Example: Grid of Images

```tsx
import { View, FlatList } from 'react-native'
import { Link } from 'expo-router'
import { useRef } from 'react'

function ImageGrid({ items }) {
  return (
    <FlatList
      data={items}
      numColumns={2}
      contentInsetAdjustmentBehavior="automatic"
      renderItem={({ item }) => {
        const ref = useRef(null)
        return (
          <View style={{ flex: 1, padding: 4 }}>
            <Link href={`/photo/${item.id}`} appleZoom={{ source: ref }}>
              <Image ref={ref} source={{ uri: item.thumbnail }} style={{ aspectRatio: 1, borderRadius: 8 }} />
            </Link>
          </View>
        )
      }}
    />
  )
}
```
