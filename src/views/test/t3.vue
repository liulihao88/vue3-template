<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import { validForm, validate } from 'oeos-components'
const { proxy } = getCurrentInstance()
const form = ref({})
const formRef = ref(null)
const rules = {
  name: [validate()],
  age: [validate()],
}
const submit = async () => {
  await validForm(formRef)
  console.log(`***** 56*  13行 test/t3.vue  18:11:40`)
}
</script>

<template>
  <div>
    <el-form ref="formRef" :model="form" :rules="rules">
      <el-form-item label="名称" prop="name">
        <o-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="名称" prop="age">
        <o-input v-model="form.age" />
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="submit">提交</el-button>
  </div>
</template>
