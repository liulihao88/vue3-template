<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-select
        v-model="selectVlaue"
        placeholder="请选择工序"
        :optionSource="stepList"
        valueCustom="label"
        width="200px"
        @change="selectChange"
      />
    </t-layout-page-item>
  </t-layout-page>
</template>
<script setup lang="ts" name="Single">
import { formatNumber } from '@wocwin/t-ui-plus'
import { ref } from 'vue'
const selectVlaue = ref<any>()
const stepList = [
  { label: '开始' },
  { label: 'POSUI' },
  { label: '11' },
  { label: 'GX123' },
  { label: '烘干破碎' },
  { label: '车间仓库' },
  { label: 'ui3333' },
  { label: 'hhh333' },
]
const selectChange = (val: any) => {
  console.log('selectChange', val, selectVlaue.value)
}

console.log(`05 formatNumber(123)`, formatNumber(123))
</script>
