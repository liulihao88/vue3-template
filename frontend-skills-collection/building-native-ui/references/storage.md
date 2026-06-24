# Storage Options in Expo

## SQLite

Use `expo-sqlite` for persistent relational data:

```bash
npx expo install expo-sqlite
```

```tsx
import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('app.db')

// Create table
db.execAsync(`
  CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    created_at INTEGER NOT NULL
  );
`)

// Insert
await db.runAsync('INSERT INTO items (name, created_at) VALUES (?, ?);', ['Item Name', Date.now()])

// Query
const rows = await db.getAllAsync('SELECT * FROM items WHERE id = ?;', [id])
```

## AsyncStorage

For simple key-value storage, use `@react-native-async-storage/async-storage`:

> **Note**: Do not use the deprecated `react-native` AsyncStorage.

```bash
npx expo install @react-native-async-storage/async-storage
```

```tsx
import AsyncStorage from '@react-native-async-storage/async-storage'

// Save
await AsyncStorage.setItem('@key', 'value')

// Get
const value = await AsyncStorage.getItem('@key')

// Remove
await AsyncStorage.removeItem('@key')
```

## SecureStore

For sensitive information (tokens, credentials), use `expo-secure-store`:

```bash
npx expo install expo-secure-store
```

```tsx
import * as SecureStore from 'expo-secure-store'

// Save
await SecureStore.setItemAsync('auth_token', token)

// Get
const token = await SecureStore.getItemAsync('auth_token')

// Remove
await SecureStore.deleteItemAsync('auth_token')
```

## When to Use Which

| Storage      | Use Case                 | Best For                        |
| ------------ | ------------------------ | ------------------------------- |
| SQLite       | Structured data, queries | Large datasets, offline caching |
| AsyncStorage | Simple key-value         | User preferences, small state   |
| SecureStore  | Sensitive data           | Authentication tokens, secrets  |

## Best Practices

1. **Encrypt sensitive data** - Always use SecureStore for sensitive information
2. **Handle migration** - Plan for schema migrations in SQLite
3. **Don't store large blobs** - Use file system for large binary data
4. **Close connections** - Close SQLite connections when not in use
5. **Backup considerations** - Consider whether data should be included in backups
