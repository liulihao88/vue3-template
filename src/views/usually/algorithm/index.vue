<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()

/**
 * const r1 =  add[1][2][3] + 4 // 期望结果10
 * const r2 =  add[10][20] + 30 // 期望结果60
 */

function add(start = 0) {
  let total = start

  function chainable(x) {
    total += x
    return chainable // 支持链式调用
  }

  chainable.valueOf = () => total // 当对象参与计算时，返回 total

  return chainable
}

function createAdd() {
  let sum = 0
  const handler = {
    get(target, prop) {
      if (prop === Symbol.toPrimitive) {
        return () => sum // `+` 运算触发这个
      } else {
        const num = Number(prop)
        if (isNaN(num)) {
          return sum // 如果 prop 不是数字（比如 `+` 运算的时候），返回 sum
        }
        sum += num
        return new Proxy({}, handler) // 链式返回 Proxy
      }
    },
  }
  return new Proxy({}, handler)
}

const add2 = createAdd()
</script>

<template>
  <oBasicLayout title="科里化使用">
    {{ add(1)(2)(3) + 4 }}
    <el-divider border-style="dashed" />
    {{ add(10)(20) + 30 }}
    <el-divider border-style="dashed" />
    {{ add(10)(20)(30)(40) + 30 }}
  </oBasicLayout>
  <oBasicLayout title="代理用">
    {{ add2[1][2][3] + 4 }}
    <el-divider border-style="dashed" />
    {{ add2[10][20] + 30 }}
    <el-divider border-style="dashed" />
    {{ add2[10][20][30][40] + 30 }}
  </oBasicLayout>
</template>
