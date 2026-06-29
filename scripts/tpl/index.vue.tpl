<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import './{{ componentName }}.scss'
const { proxy } = getCurrentInstance()
</script>

<template>
  <div class="container">
    <div>{{ componentName }}</div>
  </div>
</template>

<style lang="scss" scoped></style>
