<script setup>
import { Field, Form } from 'vee-validate'

// Validation, or use `yup` or `zod`
function required(value) {
  return value ? true : 'This field is required'
}

// Submit handler
function onSubmit(values) {
  // Submit to API
  console.log(values)
}
</script>

<template>
  <Form v-slot="{ errors }" @submit="onSubmit">
    <Field name="field" :rules="required" />

    <span>{{ errors.field }}</span>

    <button>Submit</button>
  </Form>
</template>
