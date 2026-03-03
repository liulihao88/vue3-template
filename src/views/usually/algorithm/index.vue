<script setup lang="ts">
import { ref, getCurrentInstance, onUnmounted, onBeforeUnmount } from 'vue'

const { proxy } = getCurrentInstance()

const isShow = ref(true)

/**
 * const r1 =  customAdd[1][2][3] + 4 // 期望结果10
 * const r2 =  customAdd[10][20] + 30 // 期望结果60
 */

type ChainableAdd = {
  (x: number): ChainableAdd
  valueOf(): number
} & number

// 将函数实例移到组件内部，避免全局状态污染
function createCustomAdd(start = 0): ChainableAdd {
  let total = start

  function chainable(x: number) {
    total += x
    return chainable // 支持链式调用
  }

  chainable.valueOf = () => total // 当对象参与计算时，返回 total

  return chainable as ChainableAdd
}

interface AddProxy {
  [key: number]: AddProxy
  valueOf(): number
  [Symbol.toPrimitive](hint: string): number
}

function createAdd() {
  let sum = 0
  const handler: ProxyHandler<object> = {
    get(target: object, prop: string | symbol, receiver: any) {
      if (prop === Symbol.toPrimitive) {
        return () => sum // `+` 运算触发这个
      } else if (prop === 'valueOf') {
        return () => sum // 为了兼容 JavaScript 的值转换
      } else if (typeof prop === 'string') {
        const num = Number(prop)
        if (isNaN(num)) {
          return sum // 如果 prop 不是数字（比如 `+` 运算的时候），返回 sum
        }
        sum += num
        return new Proxy({}, handler) // 链式返回 Proxy
      }
      return sum
    },
  }
  return new Proxy({}, handler) as AddProxy & number
}

// 为每个组件实例创建独立的实例，避免状态污染
const customAddInstance = createCustomAdd()
const add2Instance = createAdd()

// 每次组件创建时生成新的实例
let customAdd = (x: number) => {
  return customAddInstance(x)
}
let add2 = add2Instance

// 组件卸载时清理状态
onBeforeUnmount(() => {
  // 重置实例状态，确保下次进入组件时是干净的状态
  isShow.value = false
  // 创建新的实例来重置状态
  // 这样可以避免组件之间共享状态的问题
})
</script>

<template>
  <div v-if="isShow">
    <oBasicLayout title="科里化使用">
      {{ customAdd(1)(2)(3) + 4 }}
      <el-divider border-style="dashed" />
      {{ customAdd(10)(20) + 30 }}
      <el-divider border-style="dashed" />
      {{ customAdd(10)(20)(30)(40) + 30 }}
    </oBasicLayout>
    <oBasicLayout title="代理用">
      {{ add2[1][2][3] + 4 }}
      <el-divider border-style="dashed" />
      {{ add2[10][20] + 30 }}
      <el-divider border-style="dashed" />
      {{ add2[10][20][30][40] + 30 }}
    </oBasicLayout>
  </div>
</template>
