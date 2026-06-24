# Native iOS Controls

## Switch

Use the native React Native Switch component for boolean controls:

```tsx
import { Switch } from 'react-native'

;<Switch
  value={enabled}
  onValueChange={setEnabled}
  trackColor={{ false: '#767577', true: '#81b0ff' }}
  thumbColor={enabled ? '#f5dd4b' : '#f4f3f4'}
/>
```

## Slider

Use `@react-native-community/slider`:

```bash
npx expo install @react-native-community/slider
```

```tsx
import Slider from '@react-native-community/slider'

;<Slider
  minimumValue={0}
  maximumValue={100}
  value={value}
  onValueChange={setValue}
  minimumTrackTintColor="#1fb28a"
  maximumTrackTintColor="#d3d3d4"
  thumbStyle={{ backgroundColor: '#ffffff' }}
/>
```

## SegmentedControl

Use `@react-native-segmented-control/segmented-control`:

```bash
npx expo install @react-native-segmented-control/segmented-control
```

```tsx
import SegmentedControl from '@react-native-segmented-control/segmented-control'

;<SegmentedControl
  values={['First', 'Second']}
  selectedIndex={selectedIndex}
  onChange={(event) => {
    setSelectedIndex(event.nativeEvent.selectedSegmentIndex)
  }}
/>
```

## DateTimePicker

Use `@react-native-community/datetimepicker`:

```bash
npx expo install @react-native-community/datetimepicker
```

```tsx
import DateTimePicker from '@react-native-community/datetimepicker'

;<DateTimePicker
  value={date}
  mode="date"
  onChange={(event, selectedDate) => {
    setDate(selectedDate || date)
  }}
/>
```

## Picker

> **Note**: Do not use the deprecated React Native Picker. Use a community maintained version.

Use `@react-native-picker/picker`:

```bash
npx expo install @react-native-picker/picker
```

```tsx
import { Picker } from '@react-native-picker/picker'

;<Picker selectedValue={selectedValue} onValueChange={(itemValue) => setSelectedValue(itemValue)}>
  <Picker.Item label="Option 1" value="option1" />
  <Picker.Item label="Option 2" value="option2" />
</Picker>
```

## Best Practices

1. **Use native controls** - Prefer native controls over custom JavaScript implementations when possible
2. **Respect platform conventions** - Follow platform-specific design patterns for controls
3. **Accessibility** - Ensure all controls have proper accessibility labels
4. **Haptic feedback** - Add haptic feedback for value changes when appropriate
