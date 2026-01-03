<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import JwtDecode from '@/views/usually/base/jwtDecode.vue'
import StudyPlugins from '@/views/usually/base/studyPlugins.vue'
const { proxy } = getCurrentInstance()
</script>

<template>
  <oBasicLayout class="h-100%">
    <o-title title="1. 使用jwt-decode解析的token" />
    <JwtDecode />
    <o-title title="2.学习使用plugins, 结果请看控制台" />
    <StudyPlugins />
  </oBasicLayout>
</template>
