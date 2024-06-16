<script setup lang="ts">
import { ref, getCurrentInstance, reactive, watch } from 'vue'
const { proxy } = getCurrentInstance()
import 'vue-json-pretty/lib/styles.css'
import VueJsonPretty from 'vue-json-pretty'

const defaultData = {
  status: 200,
  text: '',
  error: null,
  config: undefined,
  data: [
    {
      news_id: 51184,
      title: 'iPhone X Review: Innovative future with real black technology',
      source: 'Netease phone',
    },
    {
      news_id: 51183,
      title: 'Traffic paradise: How to design streets for people and unmanned vehicles in the future?',
      source: 'Netease smart',
      link: 'http://netease.smart/traffic-paradise/1235',
    },
    {
      news_id: 51182,
      title: "Teslamask's American Business Relations: The government does not pay billions to build factories",
      source: 'AI Finance',
      members: ['Daniel', 'Mike', 'John'],
    },
  ],
}

const copyDefaultData = ref({
  status: 200,
  text: '',
  error: null,
  config: undefined,
  data: [
    {
      news_id: 51184,
      title: 'iPhone X Review: Innovative future with real black technology',
      source: 'Netease phone',
    },
    {
      news_id: 51183,
      title: 'Traffic paradise: How to design streets for people and unmanned vehicles in the future?',
      source: 'Netease smart',
      link: 'http://netease.smart/traffic-paradise/1235',
    },
    {
      news_id: 51182,
      title: "Teslamask's American Business Relations: The government does not pay billions to build factories",
      source: 'AI Finance',
      members: ['Daniel', 'Mike', 'John'],
    },
  ],
})

const state = reactive({
  val: JSON.stringify(defaultData),
  data: defaultData,
  showLine: true,
  showLineNumber: true,
  showDoubleQuotes: false,
  showLength: true,
  editable: true,
  showIcon: true,
  selectableType: 'multiple',
  editableTrigger: 'click',
  deep: 4,
})

watch(
  () => state.val,
  (newVal) => {
    try {
      state.data = JSON.parse(newVal)
    } catch (err) {
      // console.log('JSON ERROR');
    }
  },
)

watch(
  () => state.data,
  (newVal) => {
    try {
      state.val = JSON.stringify(newVal)
    } catch (err) {
      // console.log('JSON ERROR');
    }
  },
)
function view() {
  // console.log(state.data)
  console.log(`copyDefaultData.value`, copyDefaultData.value)
}
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div class="card-header">
        <span class="font-medium">
          JSON编辑器，采用开源的
          <el-link
            href="https://github.com/leezng/vue-json-pretty"
            target="_blank"
            style="margin: 0 4px 5px; font-size: 16px"
          >
            vue-json-pretty
          </el-link>
          （支持大数据量）。
        </span>
      </div>
    </template>
    <el-button type="primary" @click="view">查看state.data的值</el-button>
    <vue-json-pretty
      v-model:data="copyDefaultData"
      :deep="state.deep"
      :show-double-quotes="state.showDoubleQuotes"
      :show-line="state.showLine"
      :show-length="state.showLength"
      :itemHeight="16"
      :show-line-number="state.showLineNumber"
      :editable="state.editable"
      :editable-trigger="state.editableTrigger"
    />
  </el-card>
</template>
