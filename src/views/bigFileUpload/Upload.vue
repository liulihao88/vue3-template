<template>
  <input type="file" multiple @change="handleChange" />
  <button @click="loadClick">上传</button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { AxiosProgressEvent } from 'axios'
import axios from 'axios'
import type { UploadProps } from './types'

defineOptions({
  name: 'VkUpload',
})

const props = withDefaults(defineProps<UploadProps>(), {
  chunkSize: 5,
})

interface UploadFileItem {
  url: string
  raw: File
  progress: number
  chunkProgress: number[]
}

const uploadFiles = ref<UploadFileItem[]>([])

const handleChange = (e: Event) => {
  const input = e.target as HTMLInputElement
  if (!input.files?.length) return
  const files = Array.from(input.files)
  const newUploadFiles = files.map((file) => {
    const url = URL.createObjectURL(file)
    return {
      url,
      raw: file,
      progress: 0,
      chunkProgress: [],
    }
  })
  uploadFiles.value.push(...newUploadFiles)
}

const loadClick = async () => {
  const files = [...uploadFiles.value]
  for (const file of files) {
    const uploadPromises = []
    const raw = file.raw
    const size = raw.size
    const chunkSize = props.fragment ? props.chunkSize * 1024 * 1024 : size
    const totalChunks = Math.ceil(size / chunkSize)
    file.chunkProgress = new Array(totalChunks).fill(0)

    for (let i = 0; i < totalChunks; i++) {
      const start = i * chunkSize
      const end = Math.min(raw.size, start + chunkSize)
      const chunk = raw.slice(start, end)
      const formData = new FormData()
      formData.append('chunk', chunk)
      formData.append('chunkIndex', String(i))
      formData.append('totalChunks', String(totalChunks))
      formData.append('name', raw.name)

      const onUploadProgress = (progressEvent: AxiosProgressEvent) => {
        file.chunkProgress[i] = Math.round((progressEvent.loaded * 100) / progressEvent.total!)
        file.progress =
          (file.chunkProgress as number[]).reduce((previousValue, currentValue) => previousValue + currentValue, 0) /
          totalChunks
      }

      uploadPromises.push(uploadChunk(formData, onUploadProgress))
    }

    await Promise.all(uploadPromises)
  }
}

const uploadChunk = (formData: FormData, onUploadProgress: (progressEvent: AxiosProgressEvent) => void) => {
  return axios.post('http://127.0.0.1:4000/upload_chunk', formData, {
    onUploadProgress,
  })
}
</script>
