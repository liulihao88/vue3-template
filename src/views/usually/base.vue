<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import { jwtDecode } from 'jwt-decode'
const decodeToken = ref('')

const token =
  'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Ind3dy5iZWpzb24uY29tIiwic3ViIjoiZGVtbyIsImlhdCI6MTc1NTMzNTI5MCwibmJmIjoxNzU1MzM1MjkwLCJleHAiOjE3NTU0MjE2OTB9.BOXyjP-Pe_Dk0i82SZezCr_N6FHm7M1xQ35x_9cgPtc'
decodeToken.value = jwtDecode(token) // 解码 Payload
</script>

<template>
  <oBasicLayout title="使用jwt-decode解析的token">
    {{ decodeToken }}
  </oBasicLayout>
</template>
