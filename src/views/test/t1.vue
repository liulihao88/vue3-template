<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
import { isAllPropertiesEmpty } from '@/utils/gFunc.js'

let obj = {
  name: [],
  age: null,
  obj2: {},
  sex: undefined,
  str: '',
}
isAllPropertiesEmpty(obj)
console.log(`91 isAllPropertiesEmpty(obj)`, isAllPropertiesEmpty(obj))
</script>

<template>
  <div>
    <div>test/t1.vue</div>
  </div>
</template>
