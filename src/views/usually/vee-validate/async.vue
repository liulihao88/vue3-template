<script setup>
import { Field, Form, defineRule } from 'vee-validate'

// 定义异步校验规则
defineRule('nameRule', async (value) => {
  // 检查值是否存在
  if (!value || !value.length) {
    return 'This field is required'
  }

  // 模拟异步校验（如检查用户名是否已存在）
  return new Promise((resolve) => {
    setTimeout(() => {
      if (value === 'admin') {
        resolve('Username already exists')
      } else {
        resolve(true) // 校验通过
      }
    }, 1000)
  })
})

// Submit handler
function onSubmit(values) {
  console.log(values)
}
</script>

<template>
  <Form v-slot="{ errors }" @submit="onSubmit">
    <Field v-slot="{ field, meta }" name="name" rules="nameRule">
      {{ field }}
      <input v-bind="field" :class="{ error: meta.error }" placeholder="Enter name" width="100" />
      <span v-if="meta.error" class="error-message">{{ meta.errors[0] }}</span>
    </Field>

    <span>{{ errors.name }}</span>

    <button>Submit</button>
  </Form>
</template>
