<script setup lang="ts">
import { useDraggable } from '@vueuse/core'
import { useTemplateRef } from 'vue'

const el = useTemplateRef('el')

// `style` will be a helper computed for `left: ?px; top: ?px;`
const { x, y, style } = useDraggable(el, {
  initialValue: { x: 400, y: 400 },
})
</script>

<template>
  <div ref="el" :style="style" style="position: fixed" class="w-200 h-200 bg-white f-ct-ct w">
    <div>Drag me! at</div>
    <div>{{ x.toFixed(2) }}, {{ y.toFixed(2) }}</div>
  </div>
</template>
