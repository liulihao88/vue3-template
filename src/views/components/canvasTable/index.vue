<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
// import CanvasTable from "@/views/components/canvasTable/canvasTable1.vue";
// import CanvasTable from "@/views/components/canvasTable/canvasTable2.vue";
// import CanvasTable from '@/views/components/canvasTable/canvasTable3.vue'
import CanvasTable from '@/views/components/canvasTable/canvasTable4.vue'
</script>

<template>
  <div>
    <CanvasTable />
  </div>
</template>
