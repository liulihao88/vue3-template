<template>
  <input type="file" multiple @change="handleChange" />
  <button @click="loadClick">上传</button>
</template>

<script setup lang="ts">
// 导入必要的模块和类型
import { ref } from 'vue' // ref 用于创建响应式状态
import { UploadProps } from './types' // 上传属性的类型定义
import axios, { AxiosProgressEvent } from 'axios' // axios 用于HTTP请求，AxiosProgressEvent用于进度事件
import imageCompression from 'browser-image-compression' // 图像压缩库

// 定义当前组件的选项（比如组件名称）
defineOptions({
  name: 'VkUpload',
})

// 定义组件的属性并设置默认值
const props = withDefaults(defineProps<UploadProps>(), {
  chunkSize: 5, // 分片大小默认值为 5 MB
})

// 响应式状态，用于存储上传的文件列表
const uploadFiles = ref<any[]>([])

// 处理文件输入改变事件
const handleChange = async (e: Event) => {
  const input = e.target as HTMLInputElement // 获取输入元素
  if (!input.files?.length) return // 如果没有选中文件，则返回
  const files = Array.from(input.files) // 将文件列表转换为数组
  // 构建新的上传文件对象, 包含文件的URL、原始文件对象、进度信息等
  const newUploadFiles = files.map((file) => {
    const url = URL.createObjectURL(file) // 创建文件的URL
    return {
      url, // 文件URL
      raw: file, // 原始文件对象
      progress: 0, // 文件上传总体进度
      chunkProgress: [], // 分片上传进度数组
    }
  })
  // 将新的上传文件推入响应式状态中
  uploadFiles.value.push(...newUploadFiles)
}

// 处理加载点击事件，执行文件上传逻辑
const loadClick = async () => {
  const files = [...uploadFiles.value] // 复制文件列表
  for (const [_, file] of files.entries()) {
    // 使用 imageCompression 压缩文件 (暂时注释掉了)
    // file.raw = await imageCompression(file.raw, {
    //   maxSizeMB: 0.5,
    //   useWebWorker: true
    // });

    let uploadPromises = [] // 存储每个分片上传的Promise
    const raw = file.raw // 获取文件的原始文件对象
    const size = raw.size // 获取文件大小
    const chunkSize = props.fragment ? props.chunkSize * 1024 * 1024 : size // 根据是否需要分片，计算分片大小
    const totalChunks = Math.ceil(size / chunkSize) // 计算总分片数
    file.chunkProgress = new Array(totalChunks).fill(0) // 初始化每个分片的进度

    // 循环遍历每个分片
    for (let i = 0; i < totalChunks; i++) {
      const start = i * chunkSize // 分片的起始字节
      const end = Math.min(raw.size, start + chunkSize) // 分片的结束字节
      const chunk = raw.slice(start, end) // 获取文件的分片
      const formData = new FormData() // 创建FormData对象用于上传
      formData.append('chunk', chunk) // 添加分片数据
      formData.append('chunkIndex', String(i)) // 添加分片索引
      formData.append('totalChunks', String(totalChunks)) // 添加总分片数
      formData.append('name', raw.name) // 添加文件名

      // 定义上传进度处理函数
      const onUploadProgress = (progressEvent: AxiosProgressEvent) => {
        file.chunkProgress[i] = Math.round((progressEvent.loaded * 100) / progressEvent.total!) // 更新当前分片的进度
        // 计算文件的总体上传进度
        file.progress =
          (file.chunkProgress as number[]).reduce((previousValue, currentValue) => previousValue + currentValue, 0) /
          totalChunks
      }

      // 推入上传分片的Promise
      uploadPromises.push(uploadChunk(formData, onUploadProgress))
    }

    // 等待所有分片的上传完成
    Promise.all(uploadPromises).then((res) => {
      console.log(res) // 打印上传结果
    })
  }
}

// 上传分片的函数
const uploadChunk = (formData: FormData, onUploadProgress: (progressEvent: AxiosProgressEvent) => void) => {
  return axios.post('http://127.0.0.1:4000/upload_chunk', formData, {
    onUploadProgress, // 上传进度事件处理函数
  })
}
</script>
