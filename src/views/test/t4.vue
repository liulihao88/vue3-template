<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
</script>

<template>
  <div>
    <div class="container">
      <div class="box box1">1</div>
      <div class="box box2">2</div>
      <div class="box box3">3</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex; /* 启用 Flex 布局 */
  flex-direction: column;
}

.box {
  flex: 1; /* 均分宽度 */
}

.box3 {
  order: 2; /* 将第三个 div 的显示顺序设为第二 */
}

.box2 {
  order: 3; /* 将第二个 div 的显示顺序设为第三 */
}
</style>
