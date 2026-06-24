# Media: Camera, Audio, Video and File Saving

## Camera

Use `expo-camera` for camera access:

```bash
npx expo install expo-camera
```

```tsx
import { Camera } from 'expo-camera'

const [permission, requestPermission] = Camera.useCameraPermissions()

if (!permission.granted) {
  return <Button title="Grant permission" onPress={requestPermission} />
}

;<Camera style={styles.camera} type={CameraType.back}>
  {/* Camera content */}
</Camera>
```

## Audio

Use `expo-audio` for audio playback:

```bash
npx expo install expo-audio
```

```tsx
import { Audio } from 'expo-audio'

const player = Audio.usePlayer(require('./assets/audio.mp3'))

player.play()
player.pause()
```

## Video

Use `expo-video` for video playback:

```bash
npx expo install expo-video
```

```tsx
import { VideoView, useVideoPlayer } from 'expo-video'

const player = useVideoPlayer(require('./assets/video.mp4'), (player) => {
  player.loop = true
  player.play()
})

;<VideoView player={player} style={{ width: '100%', height: 200 }} contentFit="contain" />
```

## File Saving

Save files to device storage with `expo-file-system`:

```bash
npx expo install expo-file-system
```

```tsx
import * as FileSystem from 'expo-file-system'

// Save remote image to local storage
const downloadAndSave = async (url: string, filename: string) => {
  const downloadResumable = FileSystem.createDownloadResumable(url, FileSystem.documentDirectory + filename)

  const { uri } = await downloadResumable.downloadAsync()
  return uri
}
```

## Permissions

Always request permissions before accessing camera, microphone, or saving to photo library:

```tsx
import * as MediaLibrary from 'expo-media-library'

const [permissionResponse, requestPermission] = MediaLibrary.usePermissions()

if (!permissionResponse?.granted) {
  // Request permission
  await requestPermission()
}
```

## Best Practices

- **Lazy loading** - Unload media players when not in use
- **Handle permissions gracefully** - Show explanation before requesting permission
- **Memory management** - Dispose players when component unmounts
- **Respect system limits** - Don't save large files to app's document directory
