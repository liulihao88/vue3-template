<script setup lang="ts">
import splitpane, { ContextProps } from '@/components/ReSplitPane'
import { reactive } from 'vue'

defineOptions({
  name: 'SplitPane',
})

const settingLR: ContextProps = reactive({
  minPercent: 10,
  defaultPercent: 50,
  split: 'vertical',
})
</script>

<template>
  <div class="h-100%">
    <o-basic-layout title="切割面板" class="h-95%">
      <div class="split-pane h-100%">
        <splitpane :splitSet="settingLR">
          <!-- #paneL 表示指定该组件为左侧面板 -->
          <template #paneL>
            <!-- 自定义左侧面板的内容 -->
            <el-scrollbar class="pane-scrollbar">
              <div class="pane-content f-ct-ct">A</div>
            </el-scrollbar>
          </template>
          <!-- #paneR 表示指定该组件为右侧面板 -->
          <template #paneR>
            <!-- 再次将右侧面板进行拆分 -->
            <el-scrollbar class="pane-scrollbar">
              <div class="pane-content f-ct-ct">B</div>
            </el-scrollbar>
          </template>
        </splitpane>
      </div>
    </o-basic-layout>
  </div>
</template>

<style lang="scss" scoped>
.split-pane {
  height: 100%;
  // width: 100%;
  // height: calc(100vh - 300px);
  // font-size: 50px;
  // text-align: center;
  // border: 1px solid #e5e6eb;
  border: 1px solid var(--line);
}

.pane-scrollbar {
  height: 100%;

  :deep(.el-scrollbar__wrap) {
    height: 100%;
  }

  :deep(.el-scrollbar__view) {
    height: 100%;
  }
}

.pane-content {
  height: 100%;
}
</style>
