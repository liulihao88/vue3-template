# Search Bar with Headers

## Overview

Implementing search in native iOS apps with header search bars.

## Using `headerSearchBarOptions`

The recommended way is to use the built-in `headerSearchBarOptions` in Expo Router:

```tsx
// app/search.tsx
import { Stack } from 'expo-router'

export default function SearchScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          headerSearchBarOptions: {
            placeholder: 'Search...',
            onChangeText: (e) => handleSearch(e.nativeEvent.text),
            onSearchButtonPress: (e) => submitSearch(e.nativeEvent.text),
          },
        }}
      />
      <SearchResults query={query} />
    </>
  )
}
```

## The `useSearch` Hook

Create a custom `useSearch` hook for managing search state:

```tsx
import { useState, useEffect } from 'react'

export function useSearch<T>({ data, filterFn }: { data: T[]; filterFn: (item: T, query: string) => boolean }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<T[]>(data)

  useEffect(() => {
    if (!query.trim()) {
      setResults(data)
      return
    }

    const filtered = data.filter((item) => filterFn(item, query))
    setResults(filtered)
  }, [query, data])

  return { query, setQuery, results }
}
```

## Filtering Patterns

### Text Matching

```tsx
const filterFn = (item, query) => {
  const lowerQuery = query.toLowerCase()
  return item.title.toLowerCase().includes(lowerQuery) || item.description.toLowerCase().includes(lowerQuery)
}
```

### Multiple Fields

```tsx
const filterFn = (item, query) => {
  const lowerQuery = query.toLowerCase()
  return Object.values(item).some((value) => {
    if (typeof value === 'string') {
      return value.toLowerCase().includes(lowerQuery)
    }
    return false
  })
}
```

## Search Bar in Header (iOS)

### iOS Specific Features

- **Scope Bar** - Add segmented control below search bar
- **Cancel Button** - Automatically provided by system
- **Clear Button** - Automatically provided by system

```tsx
<Stack.Screen
  options={{
    headerSearchBarOptions: {
      placeholder: 'Search',
      scopeButtons: [{ title: 'All' }, { title: 'Favorites' }],
      onScopeButtonChange: (e) => setScope(e.nativeEvent.selectedScopeButtonIndex),
    },
  }}
/>
```

## Best Practices

1. **Debounce** - Debounce search queries for large datasets
2. **Empty State** - Show empty state when no results
3. **Loading State** - Show loading indicator if searching remotely
4. **Keyboard Handling** - Ensure keyboard dismisses properly on scroll
5. **Preserve Query** - Keep search query in query params for deep linking

## Example with Filtering

```tsx
import { useSearch } from '../hooks/useSearch'

export default function SearchScreen() {
  const { query, setQuery, results } = useSearch({
    data: items,
    filterFn: (item, q) => item.name.toLowerCase().includes(q.toLowerCase()),
  })

  return (
    <FlatList
      data={results}
      contentInsetAdjustmentBehavior="automatic"
      renderItem={({ item }) => <SearchResultRow item={item} />}
    />
  )
}
```
