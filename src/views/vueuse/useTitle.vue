<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
import { useTitle } from '@vueuse/core'
const title = useTitle()
console.log(`54 title.value`, title.value)
title.value = 'hello'
</script>

<template>
  <div>
    <o-title title="useTitle: 显示或更改顶部的菜单栏title" />
  </div>
</template>
