<script setup lang="ts">
import { ref, getCurrentInstance, onMounted } from 'vue'
const { proxy } = getCurrentInstance()

// 获取canvas dom 引用
const canvasRef = ref<HTMLCanvasElement | null>(null)

const data = {
  columns: [
    {
      title: '姓名',
      key: 'name',
      width: 100,
    },
    {
      title: '年龄',
      key: 'age',
      width: 100,
    },
  ],
  dataSource: Array.from({ length: 10 }).map((item, index) => ({
    key: index,
    name: `name-${index}`,
    age: Math.floor(Math.random() * 100),
  })),
}

onMounted(() => {
  const { columns, dataSource } = data
  const pixelRatio = window.devicePixelRatio
  const cellWidth = 100 * pixelRatio
  const cellHeight = 50 * pixelRatio
  const padding = 10 * pixelRatio

  const ctx = canvasRef.value.getContext('2d')
  ctx.beginPath()

  // 画表头
  for (let i = 0; i < columns.length; i++) {
    ctx.font = `${10 * pixelRatio}px bold`
    const column = columns[i]
    ctx.fillText(column.title, cellWidth * i + padding, cellHeight / 2)
    console.log(`06 column`, column)
  }

  // 画表格
  for (let i = 0; i < dataSource.length; i++) {
    ctx.font = `${10 * pixelRatio}px serif`
    const record = dataSource[i]
    for (let j = 0; j < columns.length; j++) {
      const column = columns[j]
      ctx.fillText(record[column.key], j * cellWidth + padding, (i + 1) * cellHeight)
    }
  }

  ctx.closePath()
})
</script>

<template>
  <canvas ref="canvasRef" widh="1600" height="1200">对不起, 您的浏览器不支持</canvas>
</template>

<style lang="scss" scoped>
canvas {
  width: 800px;
  height: 600px;
  background-color: #fff;
}
</style>
