<script setup lang="ts">
import { ref, getCurrentInstance, onMounted, watch } from 'vue'
const { proxy } = getCurrentInstance()
const props = defineProps({
  used: {
    type: String,
    default: '17.50GB',
  },
  total: {
    type: String,
    required: true,
    default: '1.0TB',
  },
})
const options = ref()

const seriesData = ref([])
const usedNum = ref(0)
const totalNum = ref(0)

const initOptions = {
  title: {
    text: '',
    textStyle: {
      color: 'blue', // 更改标题颜色为红色
      fontSize: 16, // 更改标题字体大小为 20px
    },
  },
  legend: {
    top: 'bottom',
    textStyle: {
      fontSize: 10, // 更改图例文本字体大小为 14px
    },
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
    formatter: formatter,
  },
  toolbox: {
    show: true,
    feature: {
      mark: { show: true },
    },
  },
  series: [
    {
      type: 'pie',
      radius: ['70%', '90%'], // 设置饼图的内外半径，内容显示在内部
      center: ['50%', '50%'], // 设置饼图的中心位置
      label: {
        formatter: formatter,
        backgroundColor: '#F6F8FC',
        borderColor: '#8C8D8E',
        position: 'inner', // 标签显示在扇形内部
        borderRadius: 4,
        textStyle: {
          fontSize: 12, // 更改标题字体大小为 20px
          color: '#e4393c',
        },
        rich: {
          a: {
            color: '#6E7079',
            lineHeight: 22,
            fontSize: 10,
            align: 'center',
          },
          hr: {
            borderColor: '#8C8D8E',
            width: '100%',
            borderWidth: 1,
            height: 0,
          },
          b: {
            color: '#4C5058',
            fontSize: 12,
            fontWeight: 'bold',
            lineHeight: 33,
          },
        },
      },
      itemStyle: {
        borderRadius: 8,
      },
      data: [],
    },
  ],
}

watch(
  () => [props.used, props.total],
  ([usedNew, totalNew]) => {
    if (usedNew && totalNew) {
      usedNum.value = proxy.formatBytesConvert(usedNew)
      totalNum.value = proxy.formatBytesConvert(totalNew)
      initOptions.series[0].data = [usedNum.value, totalNum.value - usedNum.value]
      options.value = proxy.clone(initOptions)
    }
  },
  {
    deep: true,
    immediate: true,
  },
)
function formatter(params) {
  console.log(`31 params`, params)
  let res = `${params.name} \n <span class="cl-blue">${params.value}</span>`
  let { value, name } = params.data
  let formatBytes = proxy.formatBytes(value)
  return `${name}: ${formatBytes}\n 占比: (${params.percent}%)`
}
</script>

<template>
  <v-chart class="calc-height" :option="options" autoresize />
</template>

<style lang="scss" scoped>
.calc-height {
  height: calc(100% - 100px);
}
</style>
