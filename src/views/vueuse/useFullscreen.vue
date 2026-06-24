<script setup lang="ts">
import { useFullscreen } from '@vueuse/core'
import { ref } from 'vue'
const el = ref<HTMLVideoElement | null>(null)
const { toggle, isFullscreen } = useFullscreen(el)
</script>

<template>
  <s-title title="useFullscreen" />
  <s-flex gap="16">
    <video ref="el" class="" src="https://vjs.zencdn.net/v/oceans.mp4" width="300" height="300" controls />
    <el-button type="primary" @click="toggle">{{ isFullscreen ? '退出全屏' : '到全屏' }}</el-button>
  </s-flex>
</template>
