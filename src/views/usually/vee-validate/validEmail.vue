<script setup>
import { Field, Form } from 'vee-validate'
const emial = 'example@example.com'

// Validation, or use `yup` or `zod`
function required(value) {
  return value ? true : 'This field is required'
}

import { defineRule } from 'vee-validate'
defineRule('required', (value) => {
  console.log(`77 value`, value)
  if (!value || !value.length) {
    return 'This field is required'
  }
  return true
})
defineRule('email', (value) => {
  // Field is empty, should pass
  if (!value || !value.length) {
    return true
  }
  // Check if email
  console.log(`88 value`, value)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailRegex.test(value)) {
    console.log(`53 value`, value)
    return 'This field must be a valid email'
  }
  return true
})

// Submit handler
function onSubmit(values) {
  // Submit to API
  console.log(values)
}
</script>

<template>
  <Form v-slot="{ errors }" @submit="onSubmit">
    <div>
      <Field name="name" rules="required" />
      <span>{{ errors.name }}</span>
    </div>
    <div>
      <Field name="email" rules="required|email" />
      <span>{{ errors.email }}</span>
    </div>

    <button>Submit</button>
  </Form>
</template>
