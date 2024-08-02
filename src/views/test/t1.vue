<script setup lang="tsx">
import { ref, getCurrentInstance, reactive, toRef, computed } from 'vue'
const { proxy } = getCurrentInstance()

const model = ref({
  account: '', // *用户账号
  password: null, // *用户密码
})
const gFormRef = ref()
const isShow = ref(true)
const rules = {
  account: [proxy.validate()],
  password: [proxy.validate()],
}

const fieldList = computed(() => {
  return [
    {
      label: '账号12312321321',
      prop: 'account',
      imgAttrs: {
        // src: isShow.value ? proxy.formatImg('icon_jd_01', 'cluster') : proxy.formatImg('icon_jd_02', 'cluster'),
        name: isShow.value ? 'delete' : 'plus',
        size: 16,
      },
      icon: 'delete',
      comp: 'el-input',
      attrs: {
        disabled: !isShow.value,
      },
    },
    {
      label: '密码',
      prop: 'password',
      imgAttrs: {
        src: isShow.value ? proxy.formatImg('icon_jd_01', 'cluster') : proxy.formatImg('icon_jd_02', 'cluster'),
        style: {
          marginRight: '4px',
        },
      },
      attrs: {
        width: 500,
        disabled: isShow.value,
      },
    },
  ]
})

async function testSubmit() {
  await gFormRef.value.validate({ detail: false })
}
const isTest24 = () => {
  isShow.value = !isShow.value
}
</script>

<template>
  <div>
    <o-form ref="gFormRef" :model="model" :fieldList="fieldList" :rules="rules" />
    <el-button type="primary" @click="isTest24">测试52</el-button>

    <!-- <img :src="proxy.formatImg('logo')" alt="" /> -->
    <el-button type="primary" @click="testSubmit">测试提交</el-button>
  </div>
</template>
