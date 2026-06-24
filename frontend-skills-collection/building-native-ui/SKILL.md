---
name: building-native-ui
description: 基于 Expo 构建原生应用 UI 的开发指南，包含代码规范、导航设计、样式规范、组件使用和最佳实践。使用 Expo 和 React Native 开发原生应用 UI 时使用。
---

# Building Native UI with Expo

## Iron Law

> **Iron Law：必须严格遵循 Expo 官方最佳实践和代码规范，优先使用 Expo Go 进行开发，仅在必要时才创建自定义构建。**

## Overview

这个技能提供了基于 Expo 构建原生应用 UI 的完整开发指南，包括：

- Expo 开发最佳实践
- 代码风格规范
- 导航结构设计
- 样式规范
- 交互行为设计
- 组件使用偏好
- 参考文档

## Quick Start

1. 始终优先使用 Expo Go 测试应用
2. 遵循代码风格和命名规范
3. 使用推荐的库和组件
4. 遵循导航和样式规范

## Running the App

**CRITICAL: Always try Expo Go first before creating custom builds.**

Most Expo apps work in Expo Go without any custom native code. Before running `npx expo run:ios` or `npx expo run:android`:

1. **Start with Expo Go**: Run `npx expo start` and scan the QR code with Expo Go
2. **Check if features work**: Test your app thoroughly in Expo Go
3. **Only create custom builds when required**

### When Custom Builds Are Required

You need `npx expo run:ios/android` or `eas build` ONLY when using:

- Local Expo modules (custom native code in `modules/`)
- Apple targets (widgets, app clips, extensions via `@bacons/apple-targets`)
- Third-party native modules not included in Expo Go
- Custom native configuration that can't be expressed in `app.json`

### When Expo Go Works

Expo Go supports a huge range of features out of the box:

- All `expo-*` packages (camera, location, notifications, etc.)
- Expo Router navigation
- Most UI libraries (reanimated, gesture handler, etc.)
- Push notifications, deep links, and more

If you're unsure, try Expo Go first. Creating custom builds adds complexity, slower iteration, and requires Xcode/Android Studio setup.

## Code Style

- Be cautious of unterminated strings. Ensure nested backticks are escaped; never forget to escape quotes correctly.
- Always use import statements at the top of the file.
- Always use kebab-case for file names, e.g. `comment-card.tsx`
- Always remove old route files when moving or restructuring navigation
- Never use special characters in file names
- Configure `tsconfig.json` with path aliases, and prefer aliases over relative imports for refactors.

## Library Preferences

- Never use modules removed from React Native such as Picker, WebView, SafeAreaView, or AsyncStorage
- Never use legacy expo-permissions
- `expo-audio` not `expo-av`
- `expo-video` not `expo-av`
- `expo-image` with `source="sf:name"` for SF Symbols, not `expo-symbols` or `@expo/vector-icons`
- `react-native-safe-area-context` not `react-native` SafeAreaView
- `process.env.EXPO_OS` not `Platform.OS`
- `React.use` not `React.useContext`
- `expo-image` Image component instead of intrinsic element `img`
- `expo-glass-effect` for liquid glass backdrops

## Responsiveness

- Always wrap root component in a scroll view for responsiveness
- Use `useSafeAreaInsets` instead of `SafeAreaView` for smarter safe area insets
- `contentInsetAdjustmentBehavior="automatic"` should be applied to FlatList and SectionList as well
- Use flexbox instead of Dimensions API
- **ALWAYS** prefer `useWindowDimensions` over `Dimensions.get()` to measure screen size

## Behavior

- Use `expo-haptics` conditionally on iOS to make more delightful experiences
- Use views with built-in haptics like `Pressable` from React Native and `@react-native-community/datetimepicker`
- When a route belongs to a Stack, its first child should almost always be a ScrollView with `contentInsetAdjustmentBehavior="automatic"` set
- When adding a ScrollView to the page it should almost always be the first component inside the route component
- Prefer `headerSearchBarOptions` in `Stack.Screen` options to add a search bar
- Use the `selectable` prop on text containing data that could be copied
- Consider formatting large numbers like `1.4M` or `38k`
- Never use intrinsic elements like `'img'` or `'div'` unless in a webview or Expo DOM component

## Styling

Follow Apple Human Interface Guidelines.

### General Styling Rules

- Prefer flex `gap` over margin and padding styles
- Prefer padding over margin where possible
- Always account for safe area, either with stack headers, tabs, or `ScrollView`/`FlatList` `contentInsetAdjustmentBehavior="automatic"`
- Ensure both top and bottom safe area insets are accounted for
- Inline styles not `StyleSheet.create` unless reusing styles is faster
- Add entering and exiting animations for state changes
- Use `{ borderCurve: 'continuous' }` for rounded corners unless creating a capsule shape
- **ALWAYS** use a navigation stack title instead of a custom text element on the page
- When padding a ScrollView, use `contentContainerStyle` padding and gap instead of padding on the ScrollView itself (reduces clipping)
- **CSS and Tailwind are not supported - use inline styles**

### Text Styling

- Add the `selectable` prop to every element displaying important data or error messages
- Counters should use `{ fontVariant: 'tabular-nums' }` for alignment

### Shadows

Use CSS `boxShadow` style prop. **NEVER** use legacy React Native shadow or elevation styles.

```jsx
<View style={{ boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)' }} />
```

`'inset'` shadows are supported.

## Navigation

### Link

Use `<Link href="/path" />` from `expo-router` for navigation between routes.

```jsx
import { Link } from 'expo-router';

// Basic link
<Link href="/path" />

// Wrapping custom components
<Link href="/path" asChild>
  <Pressable>...</Pressable>
</Link>
```

Whenever possible, include `<Link.Preview>` to follow iOS conventions. Add context menus and previews frequently to enhance navigation.

### Stack

- **ALWAYS** use `_layout.tsx` files to define stacks
- Use `Stack` from `expo-router/stack` for native navigation stacks

#### Page Title

Set the page title in `Stack.Screen` options:

```jsx
<Stack.Screen options={{ title: 'Home' }} />
```

### Context Menus

Add long press context menus to Link components:

```jsx
import { Link } from 'expo-router'

;<Link href="/settings" asChild>
  <Link.Trigger>
    <Pressable>
      <Card />
    </Pressable>
  </Link.Trigger>
  <Link.Menu>
    <Link.MenuAction title="Share" icon="square.and.arrow.up" onPress={handleSharePress} />
    <Link.MenuAction title="Block" icon="nosign" destructive onPress={handleBlockPress} />
    <Link.Menu title="More" icon="ellipsis">
      <Link.MenuAction title="Copy" icon="doc.on.doc" onPress={() => {}} />
      <Link.MenuAction title="Delete" icon="trash" destructive onPress={() => {}} />
    </Link.Menu>
  </Link.Menu>
</Link>
```

### Link Previews

Use link previews frequently to enhance navigation:

```jsx
<Link href="/settings">
  <Link.Trigger>
    <Pressable>
      <Card />
    </Pressable>
  </Link.Trigger>
  <Link.Preview />
</Link>
```

Link preview can be used with context menus.

### Modal

Present a screen as a modal:

```jsx
<Stack.Screen name="modal" options={{ presentation: 'modal' }} />
```

Prefer this to building a custom modal component.

### Sheet

Present a screen as a dynamic form sheet:

```jsx
<Stack.Screen
  name="sheet"
  options={{
    presentation: 'formSheet',
    sheetGrabberVisible: true,
    sheetAllowedDetents: [0.5, 1.0],
    contentStyle: { backgroundColor: 'transparent' },
  }}
/>
```

- Using `contentStyle: { backgroundColor: "transparent" }` makes the background liquid glass on iOS 26+.

## References

Consult these resources as needed:

- [animations.md](references/animations.md) - Reanimated: entering, exiting, layout, scroll-driven, gestures
- [controls.md](references/controls.md) - Native iOS: Switch, Slider, SegmentedControl, DateTimePicker, Picker
- [form-sheet.md](references/form-sheet.md) - Form sheets in expo-router: configuration, footers and background interaction
- [gradients.md](references/gradients.md) - CSS gradients via experimental_backgroundImage (New Arch only)
- [icons.md](references/icons.md) - SF Symbols via expo-image (sf: source), names, animations, weights
- [media.md](references/media.md) - Camera, audio, video, and file saving
- [route-structure.md](references/route-structure.md) - Route conventions, dynamic routes, groups, folder organization
- [search.md](references/search.md) - Search bar with headers, useSearch hook, filtering patterns
- [storage.md](references/storage.md) - SQLite, AsyncStorage, SecureStore
- [tabs.md](references/tabs.md) - NativeTabs, migration from JS tabs, iOS 26 features
- [toolbar-and-headers.md](references/toolbar-and-headers.md) - Stack headers and toolbar buttons, menus, search (iOS only)
- [visual-effects.md](references/visual-effects.md) - Blur (expo-blur) and liquid glass (expo-glass-effect)
- [webgpu-three.md](references/webgpu-three.md) - 3D graphics, games, GPU visualizations with WebGPU and Three.js
- [zoom-transitions.md](references/zoom-transitions.md) - Apple Zoom: fluid zoom transitions with Link.AppleZoom (iOS 18+)
