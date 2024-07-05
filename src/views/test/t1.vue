<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const name = ref('andy')
proxy.log(`name`, name, '/only-test/vue3-template/src/views/test/t1.vue')
</script>

<template>
  <div>
    <div>test/t1.vue</div>
  </div>
</template>
