<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import T2 from './t2.vue'
import T3 from './t3.vue'
const { proxy } = getCurrentInstance()
const open = ref(false)

const openDialog = () => {
  open.value = true
}
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
