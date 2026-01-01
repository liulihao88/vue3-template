<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import LocalPdf from '@/views/usually/pdf-js/localPdf.vue'
const { proxy } = getCurrentInstance()
</script>

<template>
  <div>
    <o-title title="本地pdf" />
    <LocalPdf />
  </div>
</template>
