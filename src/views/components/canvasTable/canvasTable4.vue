<script setup lang="ts">
import { ref, getCurrentInstance, onMounted, onUnmounted, reactive, watch } from 'vue'
const { proxy } = getCurrentInstance()
const cellWidth = 100
const cellHeight = 50
const padding = 10

let startRow = 0

const visibleRows = Math.ceil(1200 / 100) - 1

const selectedCell = reactive({
  row: -1,
  column: -1,
})

// 获取canvas dom 引用
const canvasRef = ref<HTMLCanvasElement | null>(null)

const d = {
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
  dataSource: Array.from({ length: 100 }).map((item, index) => ({
    key: index,
    name: `name-${index}`,
    age: Math.floor(Math.random() * 100),
  })),
}

const data = {
  ...d,
  templateDataSource: d.dataSource,
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
  const y = ev.clientY - top - cellHeight

  const colIndex = Math.floor(x / cellWidth)
  const rowIndex = Math.floor(y / cellHeight)

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

const drawTable = (type = '') => {
  canvasRef.value.addEventListener('click', handleClick)
  const ctx = canvasRef.value.getContext('2d')

  const { columns, dataSource } = data
  if (dataSource.length <= 0) {
    ctx.clearRect(0, 0, 800, 600)
    return proxy.$toast('暂无数据', 'e')
  }
  const pixelRatio = window.devicePixelRatio

  // 设置canvas实际渲染尺寸
  canvasRef.value.width = canvasWidth * pixelRatio
  canvasRef.value.height = canvasHeight * pixelRatio

  // 缩放context以适应高分辨率
  ctx.scale(pixelRatio, pixelRatio)

  ctx.beginPath()

  // 画表头
  for (let i = 0; i < columns.length; i++) {
    ctx.font = `${10}px bold`
    const column = columns[i]
    ctx.fillText(column.title, cellWidth * i + padding, cellHeight)
  }

  // 画表格
  for (let i = startRow; i < startRow + visibleRows; i++) {
    ctx.beginPath()
    ctx.font = `${10}px serif`
    const record = dataSource[i]
    for (let j = 0; j < columns.length; j++) {
      // 做判断, 如果被选中了, 那么你就需要画矩形来高亮单元格

      const column = columns[j]
      if (i === selectedCell.row + startRow && j === selectedCell.column) {
        ctx.fillStyle = randomColor()
        ctx.fillRect(j * cellWidth, (i + 1 - startRow) * cellHeight, cellWidth, cellHeight)
      }

      ctx.fillStyle = 'black'
      ctx.fillText(record[column.key], j * cellWidth + padding, (i - startRow + 1 + 1) * cellHeight - cellHeight / 2)
      ctx.closePath()
    }
  }

  ctx.closePath()
}

const handleWheel = () => {
  window.addEventListener(
    'wheel',
    (ev) => {
      const { deltaY } = ev
      console.log(`77 deltaY`, deltaY)
      if (deltaY < 0) {
        startRow = Math.max(0, startRow - 1)
      } else {
        startRow = Math.min(data.dataSource.length, startRow + 1)
      }

      drawTable('wheel')
    },
    false,
  )
}

const handleSearch = (ev) => {
  const { value } = ev.target
  data.dataSource = data.templateDataSource.filter((v) => {
    return v.name.includes(value)
  })
  drawTable()
}

watch(
  () => data.dataSource,
  (val) => {
    drawTable()
  },
  {
    deep: true,
  },
)

onMounted(() => {
  drawTable()
  handleWheel()
})

onUnmounted(() => {
  canvasRef.value?.removeEventListener('click', handleClick)
})
</script>

<template>
  =={{ selectedCell }}?? {{ startRow }} !!
  <input class="mb" @input="handleSearch" />
  <canvas id="canvas" ref="canvasRef" :width="canvasWidth" :height="canvasHeight">对不起, 您的浏览器不支持</canvas>
</template>

<style lang="scss" scoped>
#canvas {
  width: 800px;
  height: 600px;
  background-color: #fff;
}
</style>
