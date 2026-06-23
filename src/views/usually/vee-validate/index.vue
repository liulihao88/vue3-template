<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import Base from './base.vue'
import Test from './test.vue'
import ValidEmail from '@/views/usually/vee-validate/validEmail.vue'
import Async from '@/views/usually/vee-validate/async.vue'
const { proxy } = getCurrentInstance()
</script>

<template>
  <div>
    <s-title title="基础用法" />
    <Base />
    <s-title title="验证email和name" />
    <ValidEmail />
    <s-title title="异步用法" />
    <Async />
    <s-title title="测试" />
    <Test />
  </div>
</template>
