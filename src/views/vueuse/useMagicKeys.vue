<script setup lang="ts">
import { ref, getCurrentInstance, watch } from 'vue'
const { proxy } = getCurrentInstance()
import { useMagicKeys } from '@vueuse/core'
const keys = useMagicKeys()
const shiftCtrlA = keys['Shift+ctrl+A']
const shiftCmdA = keys['Shift+cmd+A']

watch(
  shiftCtrlA,
  (val) => {
    console.log(`09 8行 vueuse/useMagicKeys.vue val`, val)
  },
  {
    deep: true,
    immediate: true,
  },
)
watch(
  shiftCmdA,
  (val) => {
    console.log('我奶常山罩子熊')
  },
  {
    deep: true,
    immediate: true,
  },
)
</script>

<template>
  <div>
    <o-title title="useMagicKeys" sub-title="用来控制快捷键" />
  </div>
</template>
