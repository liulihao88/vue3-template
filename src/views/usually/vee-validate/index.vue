<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import Base from './base.vue'
import Test from './test.vue'
import ValidEmail from '@/views/usually/vee-validate/validEmail.vue'
const { proxy } = getCurrentInstance()
</script>

<template>
  <div>
    <o-title title="基础用法" />
    <Base />
    <o-title title="验证email和name" />
    <ValidEmail />
    <o-title title="测试用法" />
    <Test />
  </div>
</template>
