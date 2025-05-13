<script setup lang="ts">
import { ref, getCurrentInstance, onMounted } from 'vue'
import * as echarts from 'echarts'
const { proxy } = getCurrentInstance()

const echartRef = ref<HTMLElement | null>(null)

var option = {
  title: {
    text: 'ECharts 入门示例',
  },
  tooltip: {},
  legend: {
    data: ['销量'],
  },
  xAxis: {
    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
  },
  yAxis: {},
  series: [
    {
      name: '销量',
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20],
    },
  ],
}

onMounted(() => {
  let myChart = echarts.init(echartRef.value)
  myChart.setOption(option)
})
</script>

<template>
  <div ref="echartRef" style=" width: 400px;height: 400px" />
</template>
