<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
</script>

<template>
  <div>
    <div>test/t3.vue</div>
    <g-svg-icon name="day" color="red" />
    <g-svg-icon name="full_screen" color="blue" />
  </div>
</template>
