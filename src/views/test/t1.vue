<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import { sleep } from '@oeos-components/utils'
const { proxy } = getCurrentInstance()

const sleep = () => {
  proxy.sleep()
}
</script>

<template>
  <div>
    <div>test/t1.vue</div>
    <o-descriptions :options="options" :column="3" />
    <o-descriptions :options="options" :column="3" />
    <o-empty description="暂无数据" width="48" height="48" />
  </div>
</template>
