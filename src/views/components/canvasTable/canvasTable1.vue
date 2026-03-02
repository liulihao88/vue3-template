<script setup lang="ts">
import { ref, getCurrentInstance, onMounted } from 'vue'
const { proxy } = getCurrentInstance()

// 获取canvas dom 引用
const canvasRef = ref<HTMLCanvasElement | null>(null)

onMounted(() => {
  const ctx = canvasRef.value.getContext('2d')
  ctx.beginPath()

  ctx.moveTo(0, 0)
  ctx.lineTo(200, 200)

  ctx.strokeStyle = 'red'

  // 画文字
  ctx.font = '48px serif'
  ctx.fillText('hello world', 100, 200)
  ctx.stroke()

  // ctx.strokeText('hello world')

  // 回收画笔
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
