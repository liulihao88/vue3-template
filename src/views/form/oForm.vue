<script setup lang="ts">
import { ref, getCurrentInstance, computed } from 'vue'
const { proxy } = getCurrentInstance()
const form = ref({})
const formRef = ref(null)
const rules = {
  name: [proxy.validate()],
}
const fieldList = computed(() => {
  return [
    {
      prop: 'name',
      label: '名字',
    },
    {
      prop: 'age',
      label: '年龄',
      directives: {
        focus: true,
      },
    },
  ]
})
const formTest = async () => {
  await formRef.value.validate({ detail: false })
}
</script>

<template>
  <div>
    <o-form ref="formRef" :fieldList="fieldList" :model="form" :rules="rules" />
    <el-button type="primary" @click="formTest">表单校验</el-button>
  </div>
</template>
