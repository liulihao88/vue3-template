# Route Structure

## Route Conventions

Routes belong in the `app` directory.

**Never co-locate components, types, or utilities in the app directory.** This is an anti-pattern. Keep them in a separate `components/`, `types/`, or `utils/` directory at the root or outside of `app/`.

Ensure the app always has a route that matches "/", it may be inside a group route.

## Dynamic Routes

Use `[param]` for dynamic routes:

- `app/users/[id].tsx` → `/users/:id`
- `app/users/[id]/posts/[postId].tsx` → `/users/:id/posts/:postId`

## Route Groups

Use `(group)` for route groups to organize routes without affecting the URL:

- `app/(auth)/login.tsx` → `/login`
- `app/(tabs)/(home)/index.tsx` → `/`

Route groups are useful for:

- Organizing routes into sections
- Sharing layouts between routes
- Protecting multiple routes with a single layout

## Shared Layouts

Create `_layout.tsx` in any directory to define a shared layout for all child routes.

```tsx
// app/(tabs)/_layout.tsx
import { NativeTabs } from 'expo-router/unstable-native-tabs'

export default function Layout() {
  return <NativeTabs>{/* tab triggers */}</NativeTabs>
}
```

## Folder Organization Best Practices

1. **Keep app directory clean** - only route files live here
2. **Co-locate related non-route files outside app** - `components/`, `lib/`, `types/`
3. **Use groups for logical organization** - don't let group names affect the URL structure unnecessarily
4. **Index routes for the root** - `index.tsx` is the root of the directory

## Common Route Structure Example

```
app/
├── _layout.tsx                 # Root layout
├── (tabs)/
│   ├── _layout.tsx             # Tabs layout
│   ├── (index)/
│   │   ├── _layout.tsx         # Home stack layout
│   │   └── index.tsx           # Home screen
│   └── (settings)/
│       ├── _layout.tsx         # Settings stack layout
│       └── index.tsx           # Settings screen
└── modal.tsx                   # Modal screen
```

## Common app structure with tabs and stacks

A standard app layout with tabs and stacks inside each tab:

```
app/
├─ _layout.tsx — <NativeTabs />
├─ (index,search)/
│  ├─ _layout.tsx — <Stack />
│  ├─ index.tsx — Main list
│  └─ search.tsx — Search view
```

```tsx
// app/_layout.tsx
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
        <NativeTabs.Trigger name="(search)" role="search" />
      </NativeTabs>
    </Theme>
  )
}
```

```tsx
// app/(index,search)/_layout.tsx
import { Stack } from 'expo-router/stack'
import { PlatformColor } from 'react-native'

export default function Layout({ segment }) {
  const screen = segment.match(/\((.*)\)/)?.[1]!
  const titles: Record<string, string> = { index: 'Items', search: 'Search' }

  return (
    <Stack
      screenOptions={{
        headerTransparent: true,
        headerShadowVisible: false,
        headerLargeTitleShadowVisible: false,
        headerLargeStyle: { backgroundColor: 'transparent' },
        headerTitleStyle: { color: PlatformColor('label') },
        headerLargeTitle: true,
        headerBlurEffect: 'none',
        headerBackButtonDisplayMode: 'minimal',
      }}
    >
      <Stack.Screen name={screen} options={{ title: titles[screen] }} />
      <Stack.Screen name="i/[id]" options={{ headerLargeTitle: false }} />
    </Stack>
  )
}
```

Create a shared group route so both tabs can push common screens.
