<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
import { ReImageVerify } from '@/components/ReImageVerify'

const imgCode = ref()
const form = ref({
  verifyCode: '',
})

const rules = {
  verifyCode: [
    {
      validator: (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入'))
        } else if (form.value.verifyCode !== imgCode.value) {
          callback(new Error('请输入正确的验证码'))
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
}
</script>

<template>
  <div>
    <el-form ref="formRef" :model="form" :rules="rules">
      <el-form-item label="验证码" prop="verifyCode">
        <o-input v-model="form.verifyCode" width="400">
          <template #append>
            <ReImageVerify v-model:code="imgCode" />
          </template>
        </o-input>
      </el-form-item>
    </el-form>
    {{ imgCode }}
  </div>
</template>

<style lang="scss" scoped>
:deep(.o-input .el-input-group__append) {
  padding: 0;
}
</style>
