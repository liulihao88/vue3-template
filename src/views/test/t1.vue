<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
import * as echarts from 'echarts'
const data = [
  {
    title: '<18',
    num: 10,
    no: 12,
    small: 21,
    middle: 3,
    high: 40,
  },
  {
    title: '18-24',
    num: 20,
    no: 12,
    small: 21,
    middle: 3,
    high: 40,
  },
]
const options = ref({
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
})
options.value = {
  xAxis: {
    type: 'category',
    data: ['A', 'B', 'C', 'D', 'E'],
  },
  yAxis: {
    type: 'value',
  },
  graphic: {
    elements: [
      {
        type: 'rect',
        shape: {
          x: 10,
          y: 10,
          width: 20, // 自定义宽度
          height: 30, // 自定义高度
        },
        style: {
          fill: 'yellow',
        },
      },
      {
        type: 'rect',
        shape: {
          x: 50,
          y: 20,
          width: 30, // 自定义宽度
          height: 100, // 自定义高度
        },
        style: {
          fill: '#ff7f0e',
        },
      },
      // 可以继续添加更多自定义矩形
    ],
  },
}

options.value = {
  series: [
    {
      type: 'custom',
      renderItem: function (params, api) {
        // 获取数据项中的值
        var categoryIndex = api.value(0)
        console.log(`04 categoryIndex`, categoryIndex)
        var start = api.coord([api.value(1), categoryIndex])
        var end = api.coord([api.value(2), categoryIndex])
        var height = api.size([0, 1])[1] * 0.6

        // 计算矩形的形状
        var rectShape = echarts.graphic.clipRectByRect(
          {
            x: start[0],
            y: start[1] - height / 2,
            width: end[0] - start[0],
            height: height,
          },
          {
            x: params.coordSys.x,
            y: params.coordSys.y,
            width: params.coordSys.width,
            height: params.coordSys.height,
          },
        )

        // 返回矩形图形
        return (
          rectShape && {
            type: 'rect',
            shape: rectShape,
            style: api.style(),
          }
        )
      },
      data: [
        [0, 10, 20], // 数据格式：[分类索引, 开始值, 结束值]
        [1, 15, 25],
        [2, 8, 18],
      ],
    },
  ],
}
</script>

<template>
  <div>
    <div>test/t1.vue</div>
    <g-echarts :options="options" sId="r2" style="height: 400px" />
  </div>
</template>
