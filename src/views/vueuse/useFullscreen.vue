<script setup lang="ts">
import { useFullscreen, onMounted } from '@vueuse/core'
import { useTemplateRef, ref } from 'vue'

const el = ref(null)
console.log(`79 el`, el)
const { toggle } = useFullscreen(el.value)
</script>

<template>
  <o-title title="useFullscreen" />
  <div class="text-center">
    <div class="flex" p="y-4">
      <video ref="el" class="m-auto rounded" src="https://vjs.zencdn.net/v/oceans.mp4" width="600" controls />
    </div>
    <el-button @click="toggle">点击按钮切换全屏</el-button>
  </div>
</template>
