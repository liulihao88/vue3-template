<script setup lang="ts">
import { ref, getCurrentInstance, watch } from 'vue'
const { proxy } = getCurrentInstance()
import useMouse from '@/views/vueuse/useMouse.vue'
import UseVModels from '@/views/vueuse/useVModels.vue'
import OnClickoutside from '@/views/vueuse/onClickoutside.vue'
import UseTitle from '@/views/vueuse/useTitle.vue'
import UseMagicKeys from '@/views/vueuse/useMagicKeys.vue'
import UseMouseThrottle from '@/views/vueuse/useMouseThrottle.vue'

const cc = ref()

watch(
  cc,
  (val) => {
    console.log(`16 8行 vueUse/index.vue val`, val)
  },
  {
    immediate: true,
  },
)
</script>

<template>
  <div>
    <useMouse />
    <UseMouseThrottle />
    <UseVModels v-model="cc" v-number placeholder="只允许输入数字" />
    <OnClickoutside />
    <UseTitle />
    <UseMagicKeys />
  </div>
</template>
