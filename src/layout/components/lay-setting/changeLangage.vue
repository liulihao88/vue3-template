<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import useLanguage, { Language } from '@/hooks/useLanguage.ts'
const { proxy } = getCurrentInstance()
const { changeLanguage, text, currentLocale } = useLanguage()

const baseText = ref(text.value)
const cc = () => {
  changeLanguage()
}

defineExpose({
  currentLocale: currentLocale.value,
})
</script>

<template>
  <o-flex justify="space-between" align="center" class="w-100%">
    <span class="dark:text-white">切换语言</span>
    <el-switch
      v-model="baseText"
      inline-prompt
      :active-text="Language.ZH"
      :inactive-text="Language.EN"
      :active-value="Language.ZH"
      :inactive-value="Language.EN"
      style="margin-right: 0"
      @change="cc()"
    />
    <el-button type="primary" @click="cc()">{{ text }}</el-button>
  </o-flex>
</template>
