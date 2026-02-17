<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const list = ref(
  new Array(10).fill(null).map(() => ({
    date: '2022-08-24',
    name: 'RealityBoy',
    age: proxy.uuid(),
  })),
)
proxy.log(`48 list`, list)
</script>

<template>
  <div>
    <div>test/t1.vue</div>
  </div>
</template>
