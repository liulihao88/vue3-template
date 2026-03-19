<script setup lang="ts">
import { ref } from 'vue'

import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

// defineOptions({
//   name: "Menu1-1"
// });

const input = ref('')
</script>

<template>
  <div class="dark:text-white">
    <el-button type="primary" @click="router.push({ name: 'Menu1-1-1' })">去到1-1-1</el-button>
  </div>
</template>
