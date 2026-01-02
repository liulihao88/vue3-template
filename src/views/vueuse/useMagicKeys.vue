<script setup lang="ts">
import { ref, getCurrentInstance, watch } from 'vue'
const { proxy } = getCurrentInstance()
import { useMagicKeys } from '@vueuse/core'
const keys = useMagicKeys()
const shiftCtrlA = keys['Shift+ctrl+a']
const shiftCmdL = keys['Shift+command+l']
const TEXT = '我奶常山罩子熊 + shift+ctrl+a'
const TEXT2 = 'shift+command+l'

watch(
  shiftCtrlA,
  (val) => {
    if (val) {
      console.log(TEXT)
      proxy.$toast(TEXT)
    }
  },
  {
    deep: true,
    immediate: true,
  },
)
watch(
  shiftCmdL,
  (val) => {
    if (val) {
      console.log(TEXT2)
      proxy.$toast(TEXT2)
    }
  },
  {
    deep: true,
    immediate: true,
  },
)
</script>

<template>
  <div>
    <o-title title="useMagicKeys" :sub-title="`用来控制快捷键(按shift+ctrl+a: 弹出${TEXT})`" />
  </div>
</template>
