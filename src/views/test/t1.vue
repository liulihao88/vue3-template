<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
interface HasLength {
  length: number
}

function logLength<T extends HasLength>(item: T): T {
  console.log(item.length)
  return item
}

logLength('hello') // OK: string has length
logLength([1, 2, 3]) // OK: array has length
logLength({ length: 10 }) // OK: object has length
logLength(42) // Error: number has no length
</script>

<template>
  <div>
    <T2 />

    <T3 />
    <div>test/t1.vue</div>
    <el-button @click="openDialog">打开</el-button>
    <el-dialog v-model="open" title="提示" width="30%" destroy-on-close center>
      <div>test/t1.vue</div>
    </el-dialog>
  </div>
</template>
