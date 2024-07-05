<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()

import { useMouse } from '@vueuse/core'

const { x, y } = useMouse()
</script>

<template>
  <div>
    <o-title title="useMouse" />
    <div>这是x: {{ x }}</div>
    <div>这是y: {{ y }}</div>
  </div>
</template>
