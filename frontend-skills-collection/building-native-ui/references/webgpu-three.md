# 3D Graphics with WebGPU and Three.js

## Overview

Expo supports WebGPU for high-performance 3D graphics and GPU-accelerated visualizations. Combine with Three.js for a complete 3D solution.

## Requirements

- Expo SDK 50+
- New Architecture enabled
- Device with WebGPU support

## Installation

```bash
npx expo install three @react-three/fiber @react-three/drei expo-webgpu
```

## Basic Usage

```tsx
import { Canvas } from '@react-three/fiber'
import { ExpoWebGPURenderer } from 'expo-webgpu'

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
    </>
  )
}

export default function ThreeDScreen() {
  return (
    <Canvas renderer={ExpoWebGPURenderer}>
      <Scene />
    </Canvas>
  )
}
```

## Common Use Cases

1. **3D Games** - Full 3D game experiences
2. **Data Visualizations** - GPU-accelerated charts and 3D plots
3. **Product Visualization** - Interactive 3D product previews
4. **Effects and Animations** - Advanced GPU-accelerated visual effects

## Performance Tips

- **Level of detail** - Use lower detail models for distant objects
- **Instancing** - Use instanced rendering for many similar objects
- **Culling** - Enable frustum culling to avoid rendering off-screen objects
- **Textures** - Use compressed textures for better memory usage

## Example: React Three Fiber

```tsx
import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

function Box(props) {
  const meshRef = useRef()
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  useFrame((_, delta) => {
    meshRef.current.rotation.x += delta
    meshRef.current.rotation.y += delta
  })

  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

export default function App() {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
    </Canvas>
  )
}
```

## Known Limitations

- Not all Three.js features are supported in WebGPU mode
- Requires newer devices for WebGPU support
- Falls back to WebGL on unsupported devices

## Best Practices

- Always provide a WebGL fallback for older devices
- Test on actual hardware for performance
- Use Expo Go for development before creating custom builds
- Monitor memory usage - 3D graphics can use lots of GPU memory
