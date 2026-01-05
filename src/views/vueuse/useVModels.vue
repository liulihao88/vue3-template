<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import { useVModel } from '@vueuse/core'
const { proxy } = getCurrentInstance()

const props = defineProps({
  modelValue: {
    required: true,
    type: String,
  },
})
const data = useVModel(props)
console.log(data.value) // props.data
</script>

<template>
  <o-title title="useVModel" />
  <o-input v-model="data" v-bind="$attrs" width="200" />
  {{ data }}
</template>
