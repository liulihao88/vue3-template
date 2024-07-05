<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
import { onClickOutside } from '@vueuse/core'
const containerRef = ref(null)
const isClickout = ref(false)
/**
 * 点击区域外, 改变区域内的颜色
 */
onClickOutside(containerRef, () => {
  isClickout.value = true
})
</script>

<template>
  <o-title title="onClickOutside" />
  <div class="w-600 h-400 f-ct-ct">
    <div ref="containerRef" class="w-200 h-200 bg-blue" :class="isClickout && 'cl-red'" @click="isClickout = false">
      我是区域内
    </div>
  </div>
</template>
