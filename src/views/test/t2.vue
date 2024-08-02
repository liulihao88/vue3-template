<script setup lang="tsx">
import { ref, getCurrentInstance, computed } from 'vue'
const { proxy } = getCurrentInstance()
const isShow = ref(false)
const form = ref({})
const fieldList = computed(() => {
  return [
    {
      prop: 'name',
      label: '姓名',
    },
    {
      prop: 'age',
      // label: '年龄',
      labelRender: () => {
        return <div class="cl-blue fs-30">我不服, 你服咋的?</div>
      },
      directives: {
        focus: true,
      },
    },
  ]
})
</script>

<template>
  <div>
    <o-dialog ref="dialogRef" v-model="isShow" title="t2">
      <o-form :fieldList="fieldList" :model="form" />
    </o-dialog>

    <el-button type="primary" @click="isShow = true">测试85</el-button>
  </div>
</template>
