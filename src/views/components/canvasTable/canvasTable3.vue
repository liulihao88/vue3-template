<script setup lang="ts">
import { ref, getCurrentInstance, onMounted, onUnmounted, reactive } from 'vue'
const { proxy } = getCurrentInstance()
const cellWidth = 100
const cellHeight = 50
const padding = 10

const selectedCell = reactive({
  row: -1,
  column: -1,
})

// 获取canvas dom 引用
const canvasRef = ref<HTMLCanvasElement | null>(null)

const data = {
  columns: [
    {
      title: '姓名',
      key: 'name',
    },
    {
      title: '年龄',
      key: 'age',
    },
  ],
  dataSource: Array.from({ length: 10 }).map((item, index) => ({
    key: index,
    name: `name-${index}`,
    age: Math.floor(Math.random() * 100),
  })),
}

const randomColor = () => {
  const randomNum = Math.random()

  if (randomNum > 0 && randomNum < 0.3) {
    return 'red'
  } else if (randomNum > 0.3 && randomNum < 0.6) {
    return 'blue'
  } else {
    return 'yellow'
  }
}

const handleClick = (ev) => {
  const { left, top } = canvasRef.value.getBoundingClientRect()

  const x = ev.clientX - left
  console.log(`97 x`, x)
  const y = ev.clientY - top - cellHeight
  console.log(`44 y`, y)

  const colIndex = Math.floor(x / cellWidth)
  console.log(`01 colIndex`, colIndex)
  const rowIndex = Math.floor(y / cellHeight)
  console.log(`52 rowIndex`, rowIndex)

  if (rowIndex >= 0 && rowIndex < data.dataSource.length && colIndex >= 0 && colIndex <= data.columns.length) {
    selectedCell.row = rowIndex
    selectedCell.column = colIndex
  } else {
    selectedCell.row = -1
    selectedCell.column = -1
  }

  drawTable()
}

const canvasWidth = 800
const canvasHeight = 600

const drawTable = () => {
  canvasRef.value.addEventListener('click', handleClick)

  const { columns, dataSource } = data
  const pixelRatio = window.devicePixelRatio
  console.log(`44 pixelRatio`, pixelRatio)

  // 设置canvas实际渲染尺寸
  canvasRef.value.width = canvasWidth * pixelRatio
  canvasRef.value.height = canvasHeight * pixelRatio

  // 缩放context以适应高分辨率
  const ctx = canvasRef.value.getContext('2d')
  ctx.scale(pixelRatio, pixelRatio)

  ctx.beginPath()

  // 画表头
  for (let i = 0; i < columns.length; i++) {
    ctx.font = `${10}px bold`
    const column = columns[i]
    ctx.fillText(column.title, cellWidth * i + padding, cellHeight)
    console.log(`97 cellWidth`, cellWidth)
    console.log(`06 column`, column)
  }

  // 画表格
  for (let i = 0; i < dataSource.length; i++) {
    ctx.beginPath()
    ctx.font = `${10}px serif`
    const record = dataSource[i]
    for (let j = 0; j < columns.length; j++) {
      // 做判断, 如果被选中了, 那么你就需要画矩形来高亮单元格

      const column = columns[j]
      if (i === selectedCell.row && j === selectedCell.column) {
        ctx.fillStyle = randomColor()
        ctx.fillRect(j * cellWidth, (i + 1) * cellHeight, cellWidth, cellHeight)
      }

      ctx.fillStyle = 'black'
      ctx.fillText(record[column.key], j * cellWidth + padding, (i + 1 + 1) * cellHeight - cellHeight / 2)
      ctx.closePath()
    }
  }

  ctx.closePath()
}

onMounted(() => {
  drawTable()
})

onUnmounted(() => {
  canvasRef.value?.removeEventListener('click', handleClick)
})
</script>

<template>
  <canvas id="canvas" ref="canvasRef" :width="canvasWidth" :height="canvasHeight">对不起, 您的浏览器不支持</canvas>
</template>

<style lang="scss" scoped>
#canvas {
  width: 800px;
  height: 600px;
  background-color: #fff;
}
</style>
