<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
import Pie from '@/views/charts/pie.vue'
</script>

<template>
  <div>
    <div>test/t1.vue</div>
    <Pie />
  </div>
</template>
