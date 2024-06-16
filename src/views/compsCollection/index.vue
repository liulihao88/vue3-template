<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()

const lists = [
  { title: '取色器', comp: 'g-color-picker' },
  { title: '自定义指令v-tippy', comp: 'g-tippy' },
  { title: 'el-statistic', comp: 'g-statistic' },
]
</script>

<template>
  <div>
    <div v-for="(v, i) in lists" :key="i">
      <o-title :title="v.title" />
      <component :is="v.comp" />
    </div>
  </div>
</template>
