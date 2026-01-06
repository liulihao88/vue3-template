<script setup lang="ts">
import { ref, getCurrentInstance, watch } from 'vue'
const { proxy } = getCurrentInstance()
import useMouse from '@/views/vueuse/useMouse.vue'
import UseVModels from '@/views/vueuse/useVModels.vue'
import OnClickoutside from '@/views/vueuse/onClickoutside.vue'
import UseTitle from '@/views/vueuse/useTitle.vue'
import UseMagicKeys from '@/views/vueuse/useMagicKeys.vue'
import UseMouseThrottle from '@/views/vueuse/useMouseThrottle.vue'
import UseFullScreen from '@/views/vueuse/useFullScreen.vue'
import UseClipboard from '@/views/vueuse/useClipboard.vue'
import Base from '@/views/vueuse/useDraggable/base.vue'
import Advanced from '@/views/vueuse/useDraggable/advanced.vue'

const cc = ref()
const navValue = ref('base')

const options = [
  {
    label: '基础',
    value: 'base',
  },
  {
    label: 'useDraggable',
    value: 'useDraggable',
  },
]

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
    <o-tabs v-model="navValue" :options="options">
      <template #base>
        <useMouse />
        <UseMouseThrottle />
        <UseVModels v-model="cc" placeholder="双向数据绑定" />
        {{ cc }}
        <OnClickoutside />
        <UseTitle />
        <UseMagicKeys />
        <UseFullScreen />
        <UseClipboard />
      </template>

      <template #useDraggable>
        <Base />
        <Advanced />
      </template>
    </o-tabs>
  </div>
</template>
