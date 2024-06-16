<template>
  <div class="demo-color-block">
    <span class="demonstration">With default value</span>
    <el-color-picker v-model="color1" />
  </div>
  <div class="demo-color-block">
    <span class="demonstration">With no default value</span>
    <el-color-picker ref="colorPickerRef" v-model="color2" @focus="pickerFocus" />
  </div>
  <el-button type="primary" @click="isTest88">{{ isOpen ? '关闭' : '打开' }}颜色选择框</el-button>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const isOpen = ref(false)
const color1 = ref('#409EFF')
const colorPickerRef = ref()
const color2 = ref()
function isTest88() {
  isOpen.value ? colorPickerRef.value.hide() : colorPickerRef.value.show()
  isOpen.value = !isOpen.value
}
function pickerFocus() {
  isOpen.value = false
}
</script>

<style>
.demo-color-block {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.demo-color-block .demonstration {
  margin-right: 16px;
}
</style>
