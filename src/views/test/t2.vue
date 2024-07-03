<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const name = ref('小羊')
proxy.log(`name`, name, '/only-test/vue3-template/src/views/test/t2.vue')
</script>

<template>
  <div>
    <div>test/t2.vue</div>
  </div>
</template>
