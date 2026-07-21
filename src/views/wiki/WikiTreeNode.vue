<script setup lang="ts">
import { computed } from 'vue'
import { CopyDocument, Document, Download, Folder, MoreFilled, Picture } from '@element-plus/icons-vue'
import type { WikiNode } from './types'

defineOptions({ name: 'WikiTreeNode' })

const props = defineProps<{
  node: WikiNode
  depth: number
  search: string
  selectedId: string
  selectedIds: string[]
  bulkMode: boolean
  ancestorSelected?: boolean
  dropTargetId: string | null
}>()

const emit = defineEmits<{
  'update:selectedIds': [value: string[]]
  select: [node: WikiNode]
  command: [command: string, node: WikiNode]
  dragstart: [id: string]
  dragover: [node: WikiNode]
  dragleave: []
  drop: [node: WikiNode]
}>()

const selection = computed({
  get: () => props.selectedIds,
  set: (value: string[]) => emit('update:selectedIds', value),
})

function matches(node: WikiNode): boolean {
  if (!props.search) return true
  const term = props.search.toLowerCase()
  return node.title.toLowerCase().includes(term) || Boolean(node.children?.some(matches))
}
</script>

<template>
  <div v-if="matches(node)">
    <div
      class="tree-row"
      :class="{
        active: selectedId === node.id,
        checked: bulkMode && selectedIds.includes(node.id),
        disabled: bulkMode && ancestorSelected,
        folder: node.kind === 'folder',
        'drop-target': dropTargetId === node.id,
      }"
      :style="{ paddingLeft: `${10 + depth * 24}px` }"
      :draggable="!bulkMode"
      :title="node.title"
      @dragstart="emit('dragstart', node.id)"
      @click="!ancestorSelected && emit('select', node)"
      @dragover.prevent="node.kind === 'folder' && emit('dragover', node)"
      @dragleave="emit('dragleave')"
      @drop.stop="emit('drop', node)"
    >
      <s-checkbox
        v-if="bulkMode"
        v-model="selection"
        :show-all="false"
        :options="[{ label: '', value: node.id, disabled: ancestorSelected }]"
        @click.stop
      />
      <el-icon>
        <component :is="node.kind === 'folder' ? Folder : node.kind === 'image' ? Picture : Document" />
      </el-icon>
      <s-tooltip class="tree-title" :content="node.title" width="150" />
      <el-dropdown
        v-if="!bulkMode"
        class="row-actions"
        trigger="click"
        popper-class="wiki-action-menu"
        @command="(command: string) => emit('command', command, node)"
      >
        <s-button text class="more" @click.stop>
          <el-icon><MoreFilled /></el-icon>
        </s-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-if="node.kind === 'folder'" command="create-doc">
              <el-icon><Document /></el-icon>
              新增文档
            </el-dropdown-item>
            <el-dropdown-item v-if="node.kind === 'folder'" command="create-folder">
              <el-icon><Folder /></el-icon>
              新增目录
            </el-dropdown-item>
            <el-dropdown-item v-if="node.kind !== 'folder'" command="edit">编辑</el-dropdown-item>
            <el-dropdown-item v-if="node.kind !== 'folder'" command="copy-text">
              <el-icon><CopyDocument /></el-icon>
              复制文本
            </el-dropdown-item>
            <el-dropdown-item v-if="node.kind !== 'folder'" command="download">
              <el-icon><Download /></el-icon>
              下载
            </el-dropdown-item>
            <el-dropdown-item command="rename">重命名</el-dropdown-item>
            <el-dropdown-item command="move">移动到...</el-dropdown-item>
            <el-dropdown-item command="copy">复制到...</el-dropdown-item>
            <el-dropdown-item command="delete">删除</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <WikiTreeNode
      v-for="child in node.children"
      :key="child.id"
      v-model:selected-ids="selection"
      :node="child"
      :depth="depth + 1"
      :search="search"
      :selected-id="selectedId"
      :bulk-mode="bulkMode"
      :ancestor-selected="ancestorSelected || selectedIds.includes(node.id)"
      :drop-target-id="dropTargetId"
      @select="emit('select', $event)"
      @command="(command, target) => emit('command', command, target)"
      @dragstart="emit('dragstart', $event)"
      @dragover="emit('dragover', $event)"
      @dragleave="emit('dragleave')"
      @drop="emit('drop', $event)"
    />
  </div>
</template>

<style scoped lang="scss">
.tree-row {
  height: 34px;
  margin: 1px 0;
  padding-right: 6px;
  border: 1px solid transparent;
  border-radius: 5px;
  display: flex;
  gap: 8px;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  transition:
    background-color 0.16s,
    border-color 0.16s,
    transform 0.16s;
}
.tree-row:hover {
  background: #eceef1;
}
.tree-row.active {
  color: #2164e8;
  background: #e8f0ff;
}
.tree-row.checked {
  color: #1456d9;
  background: #dfe9ff;
}
.tree-row.disabled {
  color: #a8adb5;
  background: transparent;
  cursor: not-allowed;
}
.tree-row.drop-target {
  border-color: #3370ff;
  background: #dce8ff;
  transform: translateX(3px);
  box-shadow: inset 3px 0 #3370ff;
}
.tree-title {
  min-width: 0;
  flex: 1;
}
.tree-row :deep(.s-tooltip),
.tree-row :deep(.el-tooltip__trigger) {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.tree-row :deep(.el-checkbox) {
  width: 16px;
  margin-right: 0;
}
.row-actions {
  width: 28px;
  min-width: 28px;
  height: 28px;
  margin-left: auto;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.16s;
}
.more {
  width: 28px;
  height: 28px;
  padding: 0;
  color: #626a73;
}
.tree-row:hover .row-actions,
.row-actions:focus-within {
  opacity: 1;
  pointer-events: auto;
}
</style>
