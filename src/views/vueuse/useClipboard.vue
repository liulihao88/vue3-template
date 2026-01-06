<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import { ref } from 'vue'

const source = ref('Hello')
const { text, copy, copied, isSupported } = useClipboard({ source })
</script>

<template>
  <o-title title="useClipboard" />
  <div v-if="isSupported">
    <el-button type="primary" size="small" @click="copy(source)">
      <!-- by default, `copied` will be reset in 1.5s -->
      <span v-if="!copied">Copy</span>
      <span v-else>Copied!</span>
    </el-button>
    <p>
      Current copied:
      <code>{{ text || 'none' }}</code>
    </p>
  </div>
  <p v-else>Your browser does not support Clipboard API</p>
</template>
