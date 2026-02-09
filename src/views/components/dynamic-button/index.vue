<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const url = ref('/html/button.html')
</script>

<template>
  <div>
    <iframe :src="url" frameborder="0" class="w-100% h-1000" />
  </div>
</template>
