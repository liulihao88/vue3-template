<template>
  <el-row>
    <el-col :span="6">
      <el-statistic title="Daily active users" :value="268500" />
    </el-col>
    <el-col :span="6">
      <el-statistic :value="138">
        <template #title>
          <div style="display: inline-flex; align-items: center">
            Ratio of men to women
            <el-icon style="margin-left: 4px" :size="12">
              <Male />
            </el-icon>
          </div>
        </template>
      </el-statistic>
    </el-col>
    <el-col :span="6">
      <el-statistic title="Total Transactions" :value="outputValue" />
    </el-col>
    <el-col :span="6">
      <el-statistic title="Feedback number" :value="562" />
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useTransition } from '@vueuse/core'

const source = ref(0)
const outputValue = useTransition(source, {
  duration: 1500,
})

setTimeout(() => {
  source.value = 172000
}, 2000)
</script>

<style scoped>
.el-col {
  text-align: center;
}
</style>
