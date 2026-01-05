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
  proxy.$toast('我在区域外点击')
})
</script>

<template>
  <o-title title="onClickOutside" />
  <div class="w-300 h-300 f-ct-ct">
    <div ref="containerRef" class="w-100 h-100 bg-blue" :class="isClickout && 'cl-red'" @click="isClickout = false">
      我是区域内
    </div>
  </div>
</template>
