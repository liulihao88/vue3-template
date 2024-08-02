<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const formRef = ref()
const form = ref({
  data: [],
})

const ageNoRepeat = (rule, value, callback) => {
  let formData = form.value.data
  let repeatNum = 0
  let hasRepeat = formData.some((v) => {
    if (value) {
      if (v.age === value) {
        repeatNum++
      }
    }
    if (repeatNum === 2) {
      return true
    }
    return false
  })
  console.log(`45 hasRepeat`, hasRepeat)
  if (hasRepeat) {
    callback(new Error(`设备名称 ${value} 不允许重复`))
  } else {
    callback()
  }
}

const options = ref([
  { label: '张三', value: 'z3' },
  { label: '李四', value: 'l4' },
  { label: '王五', value: 'w5' },
])
setTimeout(() => {
  form.value.data = [
    { name: 'andy', age: 19 },
    { name: 'an', age: '' },
    { name: '', age: '' },
    { name: '', age: '' },
    { name: '', age: '' },
    { name: '', age: '' },
    { name: '', age: '' },
  ]
}, 1000)
const rules = {
  name: [proxy.validate()],
  age: [proxy.validate('请选择年龄'), { validator: ageNoRepeat, trigger: ['change'] }],
}
const submit = async () => {
  await proxy.validForm(formRef)
  proxy.$toast('保存成功')
}
const itemPropRules = (i, name) => {
  return {
    prop: `data.${i}.${name}`,
    rules: rules[name],
  }
}
</script>

<template>
  <div>
    <el-form ref="formRef" :model="form" :rules="rules" class="c-list-box">
      <div v-for="(v, i) in form.data" :key="i" class="c-box c-list-item">
        <el-form-item label="名称" v-bind="itemPropRules(i, 'name')">
          <o-input v-model="v.name" />
        </el-form-item>
        <el-form-item label="年龄" :prop="`data.${i}.age`" :rules="rules.age">
          <o-select v-model="v.age" :options="options" />
        </el-form-item>
      </div>
    </el-form>
    <el-button type="primary" @click="submit">提交</el-button>
  </div>
</template>
