<template>
  <el-config-provider :locale="currentLocale">
    <router-view v-if="useRefresh.refresh" />
    <ReDialog />
  </el-config-provider>
</template>

<script lang="ts" setup>
import { defineComponent, ref } from 'vue'
import { ElConfigProvider } from 'element-plus'
import { ReDialog } from '@/components/ReDialog'

import useLanguage from '@/hooks/useLanguage.ts'
const { currentLocale } = useLanguage()

import useNativeRefresh from '@/store/nativeRefresh'
const useRefresh = useNativeRefresh()
</script>
