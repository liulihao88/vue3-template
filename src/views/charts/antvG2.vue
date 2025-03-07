<script setup lang="ts">
import { ref, getCurrentInstance, onMounted } from 'vue'
import { Chart } from '@antv/g2'

const age_groups = ['0-18岁', '19-30岁', '31-45岁', '46-60岁', '60+岁']
const education_levels = ['小学及以下', '初中', '高中', '大专', '本科', '硕士及以上']
// # 各年龄段人口基数（单位：百万）
const age_population = {
  '0-18岁': 280,
  '19-30岁': 200,
  '31-45岁': 320,
  '46-60岁': 260,
  '60+岁': 190,
}
// # 学历分布比例（优化后）
const education_distribution = {
  '0-18岁': [0.68, 0.28, 0.04, 0.0, 0.0, 0.0],
  '19-30岁': [0.03, 0.12, 0.15, 0.25, 0.4, 0.05],
  '31-45岁': [0.08, 0.18, 0.22, 0.18, 0.3, 0.04],
  '46-60岁': [0.25, 0.35, 0.25, 0.1, 0.05, 0.0],
  '60+岁': [0.55, 0.3, 0.12, 0.02, 0.01, 0.0],
}

function init() {
  const chart = new Chart({
    container: 'container4',
    width: 800,
    height: 800,
    paddingLeft: 100,
    paddingRight: 100,
  })

  /*   let data = [
    {
      label: '<18',
      text: '未上过学',
      value: 3840,
    },
  ] */
  // 计算总人口
  const totalPopulation = Object.values(age_population).reduce((sum, population) => sum + population, 0)
  let data = age_groups.flatMap((ageGroup) => {
    const population = age_population[ageGroup]
    const distribution = education_distribution[ageGroup]
    return education_levels
      .map((educationLevel, index) => ({
        label: ageGroup + '\n' + '(' + toPercentage(population, totalPopulation) + ')',
        text: educationLevel,
        value: parseInt(population * distribution[index]),
      }))
      .filter((v) => v.value !== 0)
  })

  chart
    .interval()
    .title({
      title: '人口分布',
      subtitle: '子人口分布',
    })
    .data(data)

    .transform({ type: 'flexX', reducer: 'sum' })
    .transform({ type: 'stackY' })
    .transform({ type: 'normalizeY' })
    .encode('x', 'label')
    .encode('y', 'value')
    .encode('color', 'text')
    .axis('y', { labelFormatter: '0.00%' })
    .scale('x', { paddingOuter: 0, paddingInner: 0.01 })
    .tooltip(['label', 'value', 'text'])
    .label({
      text: 'text',
      x: 5,
      y: 5,
      textAlign: 'start',
      fontSize: 10,
      fill: '#fff',
    })
    .label({
      text: 'value',
      x: 5,
      y: 5,
      textAlign: 'start',
      dx: 50,
      fontSize: 10,
      fill: '#fff',
    })
    .interaction('tooltip', {
      render: (label, sendValue) => {
        let value = sendValue.items
        let res = `
        <div>
        ${value[0].value}
        <br>
        ${value[1].value}
        <br>
        ${value[2].value}
        </div>
        `
        return res
      },
    })
  chart.text().attr('padding', 100)
  chart.render()
}

onMounted(() => {
  init()
})

function toPercentage(value, total) {
  if (total === 0) {
    return '0%' // 防止除以零的错误
  }
  const percentage = (value / total) * 100 // 计算百分比
  return `${(Math.round(percentage * 100) / 100).toFixed(2)}%` // 保留两位小数并格式化为字符串
}
</script>

<template>
  <div id="container4" />
</template>
