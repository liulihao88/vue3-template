<script setup lang="ts">
import { ref, getCurrentInstance, onMounted, withDefaults, watch } from 'vue'
const { proxy } = getCurrentInstance()
import * as echarts from 'echarts'
import { processWidth } from 'oeos-components'
import { useEcharts } from '@/hooks/useEcharts.ts'
const echartDivRef = ref()

const props = withDefaults(
  defineProps<{
    width?: string
    height?: string
    options?: any
  }>(),
  {
    height: '400px',
    width: '100%',
    options: () => ({}),
  },
)

const init = () => {
  if (echartDivRef.value) {
    let myChart = echarts.init(echartDivRef.value)
    if (myChart) {
      useEcharts(myChart, props.options)
    }
  }
}

const resizeChart = () => {
  if (echartDivRef.value) {
    let myChart = echarts.init(echartDivRef.value)
    if (myChart) {
      setTimeout(() => {
        myChart.resize()
      }, 0)
    }
  }
}

watch(
  [() => props.width, () => props.height, () => props.options],
  (val) => {
    resizeChart()
  },
  {
    deep: true,
    immediate: true,
  },
)

onMounted(() => {
  init()
})

/**
* @使用方法
  <div class="f">
    <div class="f-1">
      <g-echart
        :options="options"
        sId="r1"
        style="height: 700px"
      ></g-echart>
    </div>
    <div class="f-1">
      <g-echart :options="options2" sId="r2" class="g-100"></g-echart>
    </div>
    <div class="f-1">
      <g-echart :options="options3" sId="r3" h="100px"></g-echart>
    </div>
  </div>
*/
</script>

<template>
  <div ref="echartDivRef" :style="{ height: processWidth(height, true), width: processWidth(width, true) }" />
</template>

<style scoped lang="scss"></style>
