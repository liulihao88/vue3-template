<template>
  <div class="content">
    <o-title title="安装: pnpm install vue3-ace-editor" />
    <el-select v-model="aceConfig.theme" class="m-2" placeholder="Select" size="large">
      <el-option v-for="item in aceConfig.arr" :key="item" :label="item" :value="item" />
    </el-select>
    <el-button @click="jsonFormat">格式化</el-button>
    <el-button @click="jsonNoFormat">压缩</el-button>
    <v-ace-editor
      v-model:value="dataForm.textareashow"
      lang="json"
      :theme="aceConfig.theme"
      :options="aceConfig.options"
      :readonly="aceConfig.readOnly"
      style="height: 300px; margin-top: 20px"
      class="ace-editor"
      @init="jsonFormat"
    />

    <el-button type="primary" @click="isTest79">测试98</el-button>

    <Vue3AceEditorSimple />
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { VAceEditor } from 'vue3-ace-editor'
import Vue3AceEditorSimple from '@/views/handleJson/vue3AceEditorSimple.vue'

//import "ace-builds/webpack-resolver";
// 加了这个【import "ace-builds/webpack-resolver";】可能会报错
//（若报错 则需要安装node.js的一个包 就是主题）
// 命令：npm install --save-dev file-loader

import 'ace-builds/src-noconflict/mode-json'
import 'ace-builds/src-noconflict/theme-chrome'
import 'ace-builds/src-noconflict/ext-language_tools'

//ace编辑器配置
const aceConfig = reactive({
  lang: 'json', //解析json
  theme: 'chrome', //主题
  arr: [
    /*所有主题*/
    'ambiance',
    'chaos',
    'chrome',
    'clouds',
    'clouds_midnight',
    'cobalt',
    'crimson_editor',
    'dawn',
    'dracula',
    'dreamweaver',
    'eclipse',
    'github',
    'gob',
    'gruvbox',
    'idle_fingers',
    'iplastic',
    'katzenmilch',
    'kr_theme',
    'kuroir',
    'merbivore',
    'merbivore_soft',
    'monokai',
    'mono_industrial',
    'pastel_on_dark',
    'solarized_dark',
    'solarized_light',
    'sqlserver',
    'terminal',
    'textmate',
    'tomorrow',
    'tomorrow_night',
    'tomorrow_night_blue',
    'tomorrow_night_bright',
    'tomorrow_night_eighties',
    'twilight',
    'vibrant_ink',
    'xcode',
  ],
  readOnly: false, //是否只读
  options: {
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: true,
    tabSize: 2,
    showPrintMargin: false,
    fontSize: 13,
  },
})

//form
const dataForm = reactive({
  textareashow: '',
})

dataForm.textareashow = JSON.stringify({
  name: 'andy',
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

const isTest79 = () => {
  console.log(dataForm.textareashow)
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
