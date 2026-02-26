<script setup lang="ts">
import { ref, getCurrentInstance, onMounted, watch } from 'vue'
const { proxy } = getCurrentInstance()
import * as echarts from 'echarts'
import { EChartsOption } from 'echarts'
import { processWidth } from 'oeos-components'
import { useEcharts } from '@/hooks/useEcharts'
const echartDivRef = ref<HTMLElement>(null)

const props = withDefaults(
  defineProps<{
    width?: string
    height?: string
    option: EChartsOption
  }>(),
  {
    height: '400px',
    width: '100%',
  },
)

const init = () => {
  if (echartDivRef.value) {
    let myChart = echarts.init(echartDivRef.value)
    if (myChart) {
      useEcharts(myChart, props.option)
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
  [() => props.width, () => props.height, () => props.option],
  (val) => {
    resizeChart()
  },
  {
    deep: true,
    immediate: true,
  },
)
watch(
  [() => props.option],
  (val) => {
    init()
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

defineExpose({
  init,
})

/**
* @使用方法
  <div class="f">
    <div class="f-1">
      <g-chart
        :option="option"
        sId="r1"
        style="height: 700px"
      ></g-chart>
    </div>
    <div class="f-1">
      <g-chart :option="options2" sId="r2" class="g-100"></g-chart>
    </div>
    <div class="f-1">
      <g-chart :option="options3" sId="r3" h="100px"></g-chart>
    </div>
  </div>
*/
</script>

<template>
  <div ref="echartDivRef" :style="{ height: processWidth(height, true), width: processWidth(width, true) }" />
</template>

<style scoped lang="scss"></style>
