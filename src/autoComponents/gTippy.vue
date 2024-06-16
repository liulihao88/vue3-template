<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const aa = ref('生当作人杰')
import { setDefaultProps } from 'vue-tippy'

setDefaultProps({
  placement: 'right',
})
</script>

<template>
  <div>
    <span
      v-tippy="{
        content:
          '清空缓存并返回登录页2024-06-08 22:07:38I want to set some random text, if you like it , please tell me. good wish for you! thank you so much. have a nice day!2024-06-08 22:07:39I want to set some random text, if you like it , please tell me. good wish for you! thank you so much. have a nice day!',
        // followCursor: true,
        // hideOnClick: false,
        interactive: true,
      }"
    >
      test/t2.vue
    </span>
    <br />
    <span
      v-tippy="{
        content: aa,
        interactive: true,
      }"
    >
      你好啊
    </span>
    <br />
    <span
      v-tippy="{
        content: aa,
      }"
    >
      我并不会111
    </span>
  </div>
</template>
