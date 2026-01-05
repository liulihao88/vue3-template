<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import { debounceFilter, throttleFilter, useLocalStorage, useMouse } from '@vueuse/core'
const { proxy } = getCurrentInstance()

// changes will write to localStorage with a throttled 1s
const storage = useLocalStorage('my-key', { foo: 'bar' }, { eventFilter: throttleFilter(1000) })
console.log(`77 storage`, storage)

// mouse position will be updated after mouse idle for 100ms
const { x, y } = useMouse({ eventFilter: throttleFilter(100) })
const { x: dx, y: dy } = useMouse({ eventFilter: debounceFilter(100) })
</script>

<template>
  <o-flex gap="100">
    <div>
      <o-title title="throttleFilter" />
      <div>这是throttleFilter后的x{{ x }}</div>
      <div>这是throttleFilter后的y{{ y }}</div>
    </div>
    <div>
      <o-title title="debounceFilter" />
      <div>这是debounceFilter后的dx{{ dx }}</div>
      <div>这是debounceFilter后的dy{{ dy }}</div>
    </div>
  </o-flex>
</template>
