<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
function test() {
  // 假设 'faviconURL' 是你找到的Favicon的URL
  var faviconURL = 'https://www.minio.org.cn/'

  // 创建一个新的Image对象
  var img = new Image()

  // 设置Image对象的src属性为Favicon的URL
  img.src = faviconURL

  // 添加load事件监听器，当图片加载完成后执行
  img.onload = function () {
    // 创建一个画布（Canvas）元素
    var canvas = document.createElement('canvas')
    var ctx = canvas.getContext('2d')

    // 设置画布大小与图片大小一致
    canvas.width = this.width
    canvas.height = this.height

    // 将图片绘制到画布上
    ctx.drawImage(this, 0, 0)

    // 等待画布绘制完成
    canvas.toBlob(function (blob) {
      // 创建一个指向blob的URL
      var blobURL = URL.createObjectURL(blob)

      // 创建一个<a>标签，用于下载
      var a = document.createElement('a')
      a.style.display = 'none'
      a.href = blobURL
      a.download = 'favicon.ico' // 可以自定义下载的文件名

      // 将<a>标签添加到文档中并触发点击事件
      document.body.appendChild(a)
      a.click()

      // 清理，移除<a>标签
      window.URL.revokeObjectURL(blobURL)
      document.body.removeChild(a)
    }, 'image/x-icon')
  }
}
test()
</script>

<template>
  <div>
    <div>test/t1.vue</div>
  </div>
</template>
