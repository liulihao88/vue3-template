# Animations with Reanimated

## Overview

Use Reanimated v3+ for all animations in Expo native apps. This includes:

- Entering/exiting animations
- Layout animations
- Scroll-driven animations
- Gesture-based animations

## Entering/Exiting Animations

Use Reanimated's `Entering` and `Exiting` animations for components that appear/disappear:

```tsx
import Animated, {
  FadeIn,
  FadeOut,
  SlideInRight,
  SlideOutLeft
} from 'react-native-reanimated';

// Fade in on enter, fade out on exit
<Animated.View
  entering={FadeIn}
  exiting={FadeOut}
>
  <Content />
</Animated.View>

// Slide from right on enter, slide to left on exit
<Animated.View
  entering={SlideInRight.duration(300)}
  exiting={SlideOutLeft.duration(250)}
>
  <ModalContent />
</Animated.View>
```

## Layout Animations

Use `Animated.Layout` to automatically animate layout changes:

```tsx
import Animated, { AnimatedLayout } from 'react-native-reanimated'

;<AnimatedLayout>
  {expanded && <ExtraContent />}
  <Button onPress={toggleExpanded}>{expanded ? 'Collapse' : 'Expand'}</Button>
</AnimatedLayout>
```

For custom layout animations on specific components:

```tsx
import Animated, { useAnimatedStyle } from 'react-native-reanimated'

const animatedStyle = useAnimatedStyle(() => ({
  height: progress.value * 100 + '%',
  opacity: progress.value,
}))

return <Animated.View style={animatedStyle} />
```

## Scroll-Driven Animations

Use `useSharedValue` with `scrollHandler` to create scroll-driven animations:

```tsx
import { useSharedValue } from 'react-native-reanimated'
import { useScrollHandler } from 'react-native-reanimated'

const scrollY = useSharedValue(0)

const { onScroll } = useScrollHandler(scrollY)

const headerOpacity = useAnimatedStyle(() => ({
  opacity: interpolate(scrollY.value, [0, 100], [0, 1], 'clamp'),
}))

return (
  <Animated.ScrollView onScroll={onScroll}>
    <Animated.View style={[headerStyle, headerOpacity]} />
  </Animated.ScrollView>
)
```

## Gestures

Combine Reanimated with `react-native-gesture-handler`:

```tsx
import { PanGestureHandler } from 'react-native-gesture-handler'
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'

const translateX = useSharedValue(0)

const gestureHandler = useAnimatedGestureHandler({
  onStart: (_, ctx) => {
    ctx.startX = translateX.value
  },
  onActive: (event, ctx) => {
    translateX.value = ctx.startX + event.translationX
  },
  onEnd: (_) => {
    translateX.value = withSpring(0)
  },
})

const animatedStyle = useAnimatedStyle(() => ({
  transform: [{ translateX: translateX.value }],
}))

return (
  <PanGestureHandler onGestureEvent={gestureHandler}>
    <Animated.View style={[styles.box, animatedStyle]} />
  </PanGestureHandler>
)
```

## Best Practices

1. **Keep animations simple** - Don't over-animate every interaction
2. **Use appropriate durations** - 200-300ms is ideal for most animations
3. **Use springs for interactions** - Springs feel more natural than timing animations
4. **Disable on low-end devices** - Check performance and disable if needed
5. **Combine with shared transitions** - Use shared element transitions when appropriate
