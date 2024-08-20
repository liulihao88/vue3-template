<template>
  <div class="content">
    <o-title title="vue3-ace-editor简单功能" />
    <el-button @click="jsonFormat">格式化</el-button>
    <el-button @click="jsonNoFormat">压缩</el-button>
    <v-ace-editor
      v-model:value="dataForm.textareashow"
      lang="json"
      :readonly="aceConfig.readOnly"
      style="height: 300px; margin-top: 20px"
      class="ace-editor"
      @init="jsonFormat"
    />
  </div>
</template>
<script setup>
import { reactive } from 'vue'
import { VAceEditor } from 'vue3-ace-editor'

//ace编辑器配置
const aceConfig = reactive({
  lang: 'json', //解析json
  readOnly: false, //是否只读
})
//form
const dataForm = reactive({
  textareashow: '{"A":"A1","B":"B1"}',
})
const jsonError = (e) => {
  console.log(`JSON字符串错误：${e.message}`)
}
// JSON格式化
const jsonFormat = () => {
  try {
    dataForm.textareashow = JSON.stringify(JSON.parse(dataForm.textareashow), null, 2)
  } catch (e) {
    jsonError(e)
  }
}
// JSON压缩
const jsonNoFormat = () => {
  try {
    dataForm.textareashow = JSON.stringify(JSON.parse(dataForm.textareashow))
  } catch (e) {
    jsonError(e)
  }
}
</script>
<style scoped>
.content {
  padding-top: 20px;
}

.el-button {
  margin-left: 20px;
}
</style>
