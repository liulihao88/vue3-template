<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
import ChangeLangage from '@/layout/components/lay-setting/changeLangage.vue'
</script>

<template>
  <div>
    <div>test/t1.vue</div>
    <ChangeLangage />
  </div>
</template>
