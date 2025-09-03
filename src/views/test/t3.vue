<script setup lang="ts">
import { ref } from 'vue'

const mode = ref('hierarchy') // 可以是 boolean | string | number
const modeChange = (newVal: string) => {
  console.log('切换模式:', newVal)
}
</script>

<template>
  <div class="bg-white">
    <g-check-btn
      v-model="mode"
      active-text="层级浏览"
      inactive-text="平铺浏览"
      active-value="hierarchy"
      inactive-value="flat"
      size="large"
      border
      @change="modeChange"
    />
    <g-check-btn
      v-model="mode"
      active-text="层级浏览"
      inactive-text="平铺浏览"
      active-value="hierarchy"
      inactive-value="flat"
      size="large"
      border
      @change="modeChange"
    />
    <g-check-btn
      v-model="mode"
      active-text="层级浏览"
      inactive-text="平铺浏览"
      active-value="hierarchy"
      inactive-value="flat"
      size="large"
      border
      @change="modeChange"
    />
    <el-button type="primary" @click="isTest03">你瞅啥</el-button>
    <g-check-btn
      v-model="mode"
      active-text="层级浏览"
      inactive-text="平铺浏览"
      active-value="hierarchy"
      inactive-value="flat"
      size="large"
      border
      @change="modeChange"
    />
    <g-check-btn
      v-model="mode"
      active-text="层级浏览"
      inactive-text="平铺浏览"
      active-value="hierarchy"
      inactive-value="flat"
      size="large"
      border
      @change="modeChange"
    />
  </div>
</template>
