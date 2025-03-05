<script setup lang="ts">
import { ref, getCurrentInstance, onMounted } from 'vue'
const { proxy } = getCurrentInstance()
import * as echarts from 'echarts'
import { useEcharts } from '@/hooks/useEcharts.ts'
const echartsRef = ref()

const props = defineProps({
  options: {
    type: Object,
    default: () => {},
  },
  h: {
    type: String,
    default: '400px',
  },
})

onMounted(() => {
  let myChart = echarts.init(echartsRef.value)
  useEcharts(myChart, props.options)
})

/**
* @使用方法
  <div class="f">
    <div class="f-1">
      <g-bar-echarts
        :options="options"
        sId="r1"
        style="height: 700px"
      ></g-bar-echarts>
    </div>
    <div class="f-1">
      <g-bar-echarts :options="options2" sId="r2" class="g-100"></g-bar-echarts>
    </div>
    <div class="f-1">
      <g-bar-echarts :options="options3" sId="r3" h="100px"></g-bar-echarts>
    </div>
  </div>
*/
</script>

<template>
  <div ref="echartsRef" class="w-100% container" :style="{ height: h }" />
</template>

<style scoped lang="scss">
.container {
  width: 400px;
  height: 400px;
}
</style>
