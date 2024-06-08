<template>
  <div>
    <el-form ref="forms" :model="info">
      <el-table ref="tableRef" :data="info.data" border>
        <el-table-column align="center" property="name" label="*姓名">
          <template #default="row">
            <el-form-item :prop="'data.' + row.$index + '.name'" :rules="formRules.name">
              <el-input v-model="info.data[row.$index].name" placeholder="请输入姓名" />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column align="center" property="role" label="角色">
          <template #default="row">
            <el-form-item :prop="'data.' + row.$index + '.role'" :rules="formRules.role">
              <el-input v-model="info.data[row.$index].role" placeholder="请输入角色" />
            </el-form-item>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <el-button type="primary" @click="submitForm()">Submit</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { FormInstance } from 'element-plus'
let info: any = reactive({
  data: [
    {
      id: 0,
      name: '',
      role: '',
    },
    {
      id: 1,
      name: '',
      role: '',
    },
  ],
})
const formRules = reactive({
  name: [{ required: true, message: '请输入姓名', trigger: 'change' }],
  role: [{ required: true, message: '请输入角色', trigger: 'change' }],
})
const forms = ref<FormInstance>()
const submitForm = async () => {
  if (!forms.value) return
  return await forms.value?.validate((valid: any) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!')
      return false
    }
  })
}
</script>
