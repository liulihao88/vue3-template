<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import WikiTreeNode from './WikiTreeNode.vue'
import type { FileKind, WikiNode } from './types'
import {
  ArrowDown,
  CopyDocument,
  Document,
  EditPen,
  Files,
  Folder,
  FolderOpened,
  Picture,
  Search,
  Star,
  Download,
  Delete,
  Share,
  ZoomIn,
} from '@element-plus/icons-vue'

const tree = ref<WikiNode[]>([
  {
    id: 'team',
    title: '团队知识库',
    kind: 'folder',
    children: [
      {
        id: 'welcome',
        title: '欢迎使用团队知识库',
        kind: 'doc',
        content: '这里汇集团队协作中沉淀的流程、项目资料与经验。',
        updated: '刚刚更新',
      },
      {
        id: 'product',
        title: '产品与项目',
        kind: 'folder',
        children: [
          {
            id: 'guide',
            title: '项目启动指南',
            kind: 'doc',
            content:
              '## 项目启动指南\n\n从目标、范围、成员和排期四个维度完成项目启动。\n\n### 启动清单\n\n- 明确交付目标和验收口径\n- 建立项目协作群与任务看板\n- 对齐关键风险和里程碑',
            updated: '今天 10:24',
          },
          {
            id: 'release',
            title: '版本发布流程.md',
            kind: 'markdown',
            content: '# 版本发布流程\n\n1. 合并发布分支\n2. 完成预发验证\n3. 发布后观察核心指标',
            updated: '昨天 16:08',
          },
          { id: 'roadmap', title: '产品路线图.xlsx', kind: 'sheet', updated: '6月18日' },
        ],
      },
      {
        id: 'design',
        title: '设计资源',
        kind: 'folder',
        children: [
          {
            id: 'brand',
            title: '品牌素材规范.md',
            kind: 'doc',
            content: '统一使用团队品牌色、字体与插图规范，保证各端体验一致。',
            updated: '6月12日',
          },
          { id: 'cover', title: '活动主视觉.png', kind: 'image', updated: '6月9日' },
        ],
      },
      {
        id: 'meeting',
        title: '周会纪要',
        kind: 'doc',
        content: '记录每周项目进展、待办事项及需要协同解决的问题。',
        updated: '6月5日',
      },
    ],
  },
])

const selectedId = ref('guide')
const search = ref('')
const editing = ref(false)
const draft = ref('')
const dragId = ref<string | null>(null)
const moveDialog = ref(false)
const renameDialog = ref(false)
const renameTarget = ref<WikiNode | null>(null)
const renameValue = ref('')
const moveTarget = ref('team')
const movingNode = ref<WikiNode | null>(null)
const selectedIds = ref<string[]>([])
const bulkMode = ref(false)
const bulkMoveDialog = ref(false)
const copyDialog = ref(false)
const copyIds = ref<string[]>([])
const copyTarget = ref('team')
const globalSearch = ref(false)
const imageDialog = ref(false)
const dropTargetId = ref<string | null>(null)

const documentIds = computed(() => {
  const ids: string[] = []
  const walk = (nodes: WikiNode[]) =>
    nodes.forEach((node) => {
      if (node.kind !== 'folder') ids.push(node.id)
      if (node.children) walk(node.children)
    })
  walk(tree.value)
  return ids
})
const topLevelIds = computed(() => tree.value.flatMap((root) => root.children?.map((node) => node.id) || []))
const operationIds = computed(() => {
  const ids: string[] = []
  const walk = (nodes: WikiNode[], ancestorSelected = false) =>
    nodes.forEach((node) => {
      const nodeSelected = selectedIds.value.includes(node.id)
      if (nodeSelected && !ancestorSelected) ids.push(node.id)
      if (node.children) walk(node.children, ancestorSelected || nodeSelected)
    })
  walk(tree.value)
  return ids
})
const selectAllValue = computed({
  get: () =>
    topLevelIds.value.length && topLevelIds.value.every((id) => selectedIds.value.includes(id)) ? ['all'] : [],
  set: (value: string[]) => {
    selectedIds.value = value.includes('all') ? topLevelIds.value.slice() : []
  },
})

watch(selectedIds, (ids, previousIds = []) => {
  const nextIds = new Set(ids)
  const collectChildren = (node: WikiNode, selected: boolean) =>
    node.children?.forEach((child) => {
      if (selected) nextIds.add(child.id)
      else nextIds.delete(child.id)
      collectChildren(child, selected)
    })
  previousIds.forEach((id) => {
    if (ids.includes(id)) return
    const node = findNode(tree.value, id)
    if (node?.kind === 'folder') collectChildren(node, false)
  })
  ids.forEach((id) => {
    const node = findNode(tree.value, id)
    if (node?.kind === 'folder') collectChildren(node, true)
  })
  const normalized = [...nextIds]
  if (normalized.length !== ids.length || normalized.some((id, index) => id !== ids[index])) {
    selectedIds.value = normalized
  }
})

function findNode(nodes: WikiNode[], id: string): WikiNode | undefined {
  for (const node of nodes) {
    if (node.id === id) return node
    const found = node.children && findNode(node.children, id)
    if (found) return found
  }
}

function findParent(nodes: WikiNode[], id: string): WikiNode[] | undefined {
  for (const node of nodes) {
    if (node.children?.some((child) => child.id === id)) return node.children
    const found = node.children && findParent(node.children, id)
    if (found) return found
  }
}

function uniqueTitle(base: string, siblings: WikiNode[]) {
  if (!siblings.some((node) => node.title === base)) return base
  let index = 2
  while (siblings.some((node) => node.title === `${base} ${index}`)) index += 1
  return `${base} ${index}`
}

function hasDuplicateTitle(siblings: WikiNode[], title: string, excludeId?: string) {
  return siblings.some((node) => node.id !== excludeId && node.title === title)
}

function containsNode(node: WikiNode, id: string): boolean {
  return Boolean(node.children?.some((child) => child.id === id || containsNode(child, id)))
}

const selected = computed(() => findNode(tree.value, selectedId.value) || tree.value[0])
const selectedPath = computed(() => {
  const findPath = (nodes: WikiNode[], id: string, path: WikiNode[] = []): WikiNode[] | undefined => {
    for (const node of nodes) {
      const currentPath = [...path, node]
      if (node.id === id) return currentPath
      const found = node.children && findPath(node.children, id, currentPath)
      if (found) return found
    }
  }
  return findPath(tree.value, selected.value.id) || [tree.value[0]]
})
const flattenedFolders = computed(() => {
  const result: { id: string; label: string }[] = []
  const walk = (nodes: WikiNode[], prefix = '') =>
    nodes.forEach((node) => {
      if (node.kind === 'folder') {
        result.push({ id: node.id, label: `${prefix}${node.title}` })
        if (node.children) walk(node.children, `${prefix}  /  `)
      }
    })
  walk(tree.value)
  return result
})

function matches(node: WikiNode): boolean {
  if (!search.value) return true
  const term = search.value.toLowerCase()
  return node.title.toLowerCase().includes(term) || Boolean(node.children?.some(matches))
}

function selectNode(node: WikiNode) {
  if (bulkMode.value) {
    selectedIds.value = selectedIds.value.includes(node.id)
      ? selectedIds.value.filter((id) => id !== node.id)
      : [...selectedIds.value, node.id]
    return
  }
  selectedId.value = node.id
  editing.value = false
}

function createNode(kind: 'doc' | 'folder', parentId = tree.value[0]?.id) {
  const parent = findNode(tree.value, parentId)
  if (!parent?.children) return
  const baseTitle = kind === 'folder' ? '未命名目录' : '未命名文档'
  const node: WikiNode = {
    id: `${kind}-${Date.now()}`,
    title: uniqueTitle(baseTitle, parent.children),
    kind,
    children: kind === 'folder' ? [] : undefined,
    content: kind === 'doc' ? '开始记录团队知识。' : undefined,
    updated: '刚刚更新',
  }
  parent.children.unshift(node)
  if (kind === 'doc') selectedId.value = node.id
  rename(node)
}

function handleCreateCommand(command: 'doc' | 'folder') {
  createNode(command)
}

function toggleBulkMode() {
  bulkMode.value = !bulkMode.value
  selectedIds.value = []
}

function deleteSelectedNodes() {
  operationIds.value.forEach(removeNode)
  selectedIds.value = []
  bulkMode.value = false
}

function handleBulkCommand(command: string) {
  if (!selectedIds.value.length) return
  if (command === 'move') bulkMoveDialog.value = true
  else if (command === 'copy') openCopy(operationIds.value)
  else deleteSelectedNodes()
}

function removeNode(id: string) {
  const parent = findParent(tree.value, id)
  if (!parent) return
  parent.splice(
    parent.findIndex((item) => item.id === id),
    1,
  )
  selectedIds.value = selectedIds.value.filter((item) => item !== id)
  if (!findNode(tree.value, selectedId.value)) selectedId.value = documentIds.value[0] || tree.value[0]?.id || ''
}

function cloneNode(source: WikiNode): WikiNode {
  return {
    ...source,
    id: `${source.id}-copy-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    children: source.children?.map(cloneNode),
  }
}

function openCopy(ids: string | string[]) {
  copyIds.value = Array.isArray(ids) ? ids.slice() : [ids]
  copyTarget.value = 'team'
  copyDialog.value = true
}

function copyNodes() {
  const target = findNode(tree.value, copyTarget.value)
  if (!target?.children) return
  copyIds.value.forEach((id) => {
    const source = findNode(tree.value, id)
    if (!source) return
    const copy = cloneNode(source)
    copy.title = hasDuplicateTitle(target.children!, source.title)
      ? uniqueTitle(`${source.title} 副本`, target.children!)
      : source.title
    target.children!.push(copy)
  })
  copyDialog.value = false
  ElMessage.success(`已复制 ${copyIds.value.length} 项`)
}

function getNodeText(node: WikiNode) {
  if (node.content) return node.content
  if (node.kind === 'sheet') {
    return '季度,目标,完成率,负责人,状态\nQ1,120,86%,产品团队,进行中'
  }
  return `${node.title}\n暂无文本内容`
}

async function copyNodeText(node: WikiNode) {
  const text = getNodeText(node)
  try {
    await navigator.clipboard.writeText(text)
  } catch {
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    textarea.remove()
  }
  ElMessage.success('文件文本已复制')
}

function downloadNode(node: WikiNode) {
  const blob = new Blob([getNodeText(node)], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = node.title
  link.click()
  URL.revokeObjectURL(url)
}

function shareDocument() {
  const url = `${window.location.origin}${window.location.pathname}#${selected.value.id}`
  navigator.clipboard?.writeText(url)
  ElMessage.success('分享链接已复制')
}

function handleNodeCommand(command: string, node: WikiNode) {
  if (command === 'create-doc') createNode('doc', node.id)
  else if (command === 'create-folder') createNode('folder', node.id)
  else if (command === 'rename') rename(node)
  else if (command === 'edit') {
    selectNode(node)
    startEdit()
  } else if (command === 'copy') openCopy(node.id)
  else if (command === 'copy-text') copyNodeText(node)
  else if (command === 'download') downloadNode(node)
  else if (command === 'delete') removeNode(node.id)
  else openMove(node)
}

function startEdit() {
  draft.value = selected.value.content || ''
  editing.value = true
  nextTick(() => document.querySelector<HTMLTextAreaElement>('.editor-area')?.focus())
}

function saveEdit() {
  const node = findNode(tree.value, selectedId.value)
  if (node) {
    node.content = draft.value
    node.updated = '刚刚更新'
  }
  editing.value = false
}

function rename(node: WikiNode) {
  renameTarget.value = node
  renameValue.value = node.title
  renameDialog.value = true
}

function confirmRename() {
  const name = renameValue.value.trim()
  if (!name || !renameTarget.value) return
  const siblings = findParent(tree.value, renameTarget.value.id)
  if (siblings && hasDuplicateTitle(siblings, name, renameTarget.value.id)) {
    ElMessage.warning('同级目录下名称不能重复')
    return
  }
  renameTarget.value.title = name
  renameDialog.value = false
}

function openMove(node: WikiNode) {
  movingNode.value = node
  moveTarget.value = 'team'
  moveDialog.value = true
}

function moveNode() {
  const node = movingNode.value
  const target = findNode(tree.value, moveTarget.value)
  if (!node || !target?.children || node.id === target.id) return
  if (containsNode(node, target.id)) {
    ElMessage.warning('目录不能移动到自己的子目录中')
    return
  }
  const parent = findParent(tree.value, node.id)
  if (!parent) return
  if (hasDuplicateTitle(target.children, node.title, node.id)) {
    ElMessage.warning(`“${node.title}”与目标目录中的名称重复`)
    return
  }
  parent.splice(
    parent.findIndex((item) => item.id === node.id),
    1,
  )
  target.children.push(node)
  moveDialog.value = false
}

function moveSelectedNodes() {
  const target = findNode(tree.value, moveTarget.value)
  if (!target?.children) return
  operationIds.value.forEach((id) => {
    const node = findNode(tree.value, id)
    const parent = findParent(tree.value, id)
    if (!node || !parent || target.children!.some((item) => item.id === id)) return
    if (node.id === target.id || containsNode(node, target.id)) {
      ElMessage.warning(`“${node.title}”不能移动到自己的子目录中`)
      return
    }
    if (hasDuplicateTitle(target.children!, node.title, node.id)) {
      ElMessage.warning(`“${node.title}”与目标目录中的名称重复，已跳过`)
      return
    }
    parent.splice(
      parent.findIndex((item) => item.id === id),
      1,
    )
    target.children!.push(node)
  })
  selectedIds.value = []
  bulkMode.value = false
  bulkMoveDialog.value = false
}

function handleDrop(target: WikiNode) {
  const node = dragId.value && findNode(tree.value, dragId.value)
  if (!node || target.kind !== 'folder' || node.id === target.id || !target.children) return
  if (containsNode(node, target.id)) {
    ElMessage.warning('目录不能移动到自己的子目录中')
    return
  }
  const parent = findParent(tree.value, node.id)
  if (!parent || target.children.some((child) => child.id === node.id)) return
  if (hasDuplicateTitle(target.children, node.title, node.id)) {
    ElMessage.warning(`“${node.title}”与目标目录中的名称重复`)
    return
  }
  parent.splice(
    parent.findIndex((item) => item.id === node.id),
    1,
  )
  target.children.push(node)
  dragId.value = null
  dropTargetId.value = null
}

function kindLabel(kind: FileKind) {
  return { doc: '文档', sheet: 'Excel', image: '图片', markdown: 'Markdown' }[kind]
}
</script>

<template>
  <div class="wiki-page">
    <aside class="sidebar">
      <div class="workspace-head">
        <span class="workspace-mark">知</span>
        <span>团队知识库</span>
      </div>
      <s-input v-model="search" placeholder="搜索知识库" />
      <div v-if="!bulkMode" class="sidebar-label">
        <span>目录</span>
        <div class="sidebar-actions">
          <el-dropdown trigger="click" popper-class="wiki-action-menu" @command="handleCreateCommand">
            <s-button text title="新增">
              <el-icon></el-icon>
              新增
              <el-icon><ArrowDown /></el-icon>
            </s-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="doc">
                  <el-icon><Document /></el-icon>
                  新增文档
                </el-dropdown-item>
                <el-dropdown-item command="folder">
                  <el-icon><Folder /></el-icon>
                  新增目录
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <s-button text @click="toggleBulkMode">批量操作</s-button>
        </div>
      </div>
      <div v-else class="bulk-toolbar">
        <div class="bulk-summary">
          <s-checkbox
            v-model="selectAllValue"
            :show-all="false"
            :options="[{ label: '', value: 'all' }]"
            title="全选"
          />
          <span>已选 {{ operationIds.length }} 项</span>
        </div>
        <div class="bulk-actions">
          <el-dropdown trigger="click" popper-class="wiki-action-menu" @command="handleBulkCommand">
            <s-button text class="bulk-operation" :disabled="!selectedIds.length">批量操作</s-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="move">
                  <el-icon><Folder /></el-icon>
                  移动
                </el-dropdown-item>
                <el-dropdown-item command="delete" divided>
                  <el-icon><Delete /></el-icon>
                  删除
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <s-button class="bulk-exit" @click="toggleBulkMode">退出</s-button>
        </div>
      </div>
      <div class="tree">
        <template v-for="root in tree" :key="root.id">
          <div v-if="matches(root)" class="tree-root">
            <div
              class="tree-row folder-row"
              :class="{ active: selectedId === root.id, 'drop-target': dropTargetId === root.id }"
              @click="selectNode(root)"
              @dragover.prevent="dropTargetId = root.id"
              @dragleave="dropTargetId = null"
              @drop="handleDrop(root)"
            >
              <el-icon><FolderOpened /></el-icon>
              <b>{{ root.title }}</b>
            </div>
            <WikiTreeNode
              v-for="node in root.children"
              :key="node.id"
              v-model:selected-ids="selectedIds"
              :node="node"
              :depth="0"
              :search="search"
              :selected-id="selectedId"
              :bulk-mode="bulkMode"
              :drop-target-id="dropTargetId"
              @select="selectNode"
              @command="handleNodeCommand"
              @dragstart="dragId = $event"
              @dragover="dropTargetId = $event.id"
              @dragleave="dropTargetId = null"
              @drop="handleDrop"
            />
          </div>
        </template>
      </div>
      <div class="sidebar-foot">
        <el-icon><Star /></el-icon>
        <span>收藏</span>
      </div>
    </aside>

    <main class="content">
      <header class="topbar">
        <div class="crumb">
          <span class="crumb-node" @click="selectNode(selectedPath[0])">{{ selectedPath[0].title }}</span>
          <el-icon><ArrowDown /></el-icon>
          <template v-for="node in selectedPath.slice(1)" :key="node.id">
            <span class="crumb-separator">/</span>
            <span class="crumb-node" :class="{ current: node.id === selected.id }" @click="selectNode(node)">
              {{ node.title }}
            </span>
          </template>
        </div>
        <div class="top-actions">
          <s-button v-if="selected.kind !== 'folder'" text @click="copyNodeText(selected)">
            <el-icon><CopyDocument /></el-icon>
            复制文本
          </s-button>
          <s-button v-if="selected.kind !== 'folder'" text @click="downloadNode(selected)">
            <el-icon><Download /></el-icon>
            下载
          </s-button>
          <s-button text @click="shareDocument">
            <el-icon><Share /></el-icon>
            分享
          </s-button>
          <s-button v-if="selected.kind !== 'folder'" type="primary" @click="startEdit">
            <el-icon><EditPen /></el-icon>
            编辑
          </s-button>
        </div>
      </header>
      <article v-if="selected.kind === 'folder'" class="folder-view">
        <div class="doc-meta">
          <span>目录</span>
          <span>{{ selected.children?.length || 0 }} 项</span>
        </div>
        <h1>{{ selected.title }}</h1>
        <div class="folder-content">
          <div v-for="node in selected.children" :key="node.id" class="folder-content-row" @click="selectNode(node)">
            <el-icon>
              <component :is="node.kind === 'folder' ? Folder : node.kind === 'image' ? Picture : Document" />
            </el-icon>
            <span>{{ node.title }}</span>
            <span class="folder-kind">{{ node.kind === 'folder' ? '目录' : kindLabel(node.kind) }}</span>
          </div>
          <div v-if="!selected.children?.length" class="folder-empty">暂无内容</div>
        </div>
      </article>
      <article v-else-if="selected.kind === 'doc' || selected.kind === 'markdown'" class="document">
        <div class="doc-meta">
          <span>{{ kindLabel(selected.kind) }}</span>
          <span>{{ selected.updated }}</span>
        </div>
        <h1>{{ selected.title.replace(/\.(md|markdown)$/i, '') }}</h1>
        <template v-if="editing">
          <textarea v-model="draft" class="editor-area" />
          <div class="editor-actions">
            <s-button @click="editing = false">取消</s-button>
            <s-button type="primary" @click="saveEdit">保存</s-button>
          </div>
        </template>
        <div v-else class="rich-content">
          <p
            v-for="(line, index) in (selected.content || '').split('\n')"
            :key="index"
            :class="{ heading: line.startsWith('#'), bullet: line.startsWith('-') }"
          >
            {{ line.replace(/^#+\s?|^-\s?/, '') || ' ' }}
          </p>
        </div>
      </article>
      <article v-else-if="selected.kind === 'sheet'" class="file-preview">
        <div class="file-icon sheet">XLSX</div>
        <h1>{{ selected.title }}</h1>
        <p>Excel 表格</p>
        <div class="sheet-preview">
          <div v-for="row in 6" :key="row" class="sheet-row">
            <span v-for="col in 5" :key="col">
              {{
                row === 1
                  ? ['季度', '目标', '完成率', '负责人', '状态'][col - 1]
                  : ['Q' + (row - 1), '120', '86%', '产品团队', '进行中'][col - 1]
              }}
            </span>
          </div>
        </div>
      </article>
      <article v-else class="file-preview">
        <div class="image-preview" @click="imageDialog = true" title="点击放大">
          <el-icon><Picture /></el-icon>
          <el-icon class="zoom"><ZoomIn /></el-icon>
        </div>
        <h1>{{ selected.title }}</h1>
        <p>图片文件 · {{ selected.updated }}</p>
        <s-button @click="downloadNode(selected)">
          <el-icon><Download /></el-icon>
          下载原图
        </s-button>
      </article>
    </main>
    <s-dialog v-model="moveDialog" title="移动到">
      <s-select
        v-model="moveTarget"
        class="move-select"
        :options="flattenedFolders.map((item) => ({ label: item.label, value: item.id }))"
      />
      <template #footer>
        <s-button @click="moveDialog = false">取消</s-button>
        <s-button type="primary" @click="moveNode">移动</s-button>
      </template>
    </s-dialog>
    <s-dialog v-model="renameDialog" title="重命名">
      <s-input v-model="renameValue" placeholder="请输入名称" @keyup.enter="confirmRename" v-focus />
      <template #footer>
        <s-button @click="renameDialog = false">取消</s-button>
        <s-button type="primary" :disabled="!renameValue.trim()" @click="confirmRename">确定</s-button>
      </template>
    </s-dialog>
    <s-dialog v-model="bulkMoveDialog" title="批量移动">
      <s-select
        v-model="moveTarget"
        class="move-select"
        :options="flattenedFolders.map((item) => ({ label: item.label, value: item.id }))"
      />
      <template #footer>
        <s-button @click="bulkMoveDialog = false">取消</s-button>
        <s-button type="primary" @click="moveSelectedNodes">移动</s-button>
      </template>
    </s-dialog>
    <s-dialog v-model="globalSearch" title="全局搜索">
      <s-input v-model="search" placeholder="搜索所有知识库内容" />
      <div class="search-hint">输入关键词后，左侧目录会实时筛选匹配文件</div>
    </s-dialog>
    <s-dialog v-model="imageDialog" title="图片预览">
      <div class="image-large">
        <el-icon><Picture /></el-icon>
      </div>
    </s-dialog>
  </div>
</template>

<style scoped lang="scss">
.wiki-page {
  display: flex;
  height: calc(100vh - 48px);
  min-height: 620px;
  background: #fff;
  color: #1f2329;
  font-family: Inter, 'PingFang SC', sans-serif;
}
.sidebar {
  width: 286px;
  flex: 0 0 286px;
  padding: 20px 12px;
  background: #f7f8fa;
  border-right: 1px solid #e8eaed;
  display: flex;
  flex-direction: column;
}
.workspace-head {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 8px 22px;
  font-weight: 650;
  font-size: 16px;
}
.workspace-mark {
  width: 30px;
  height: 30px;
  display: grid;
  place-items: center;
  color: #fff;
  border-radius: 7px;
  background: #3370ff;
  font-weight: 700;
}
.sidebar-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 22px 8px 8px;
  color: #8f959e;
  font-size: 13px;
}
.sidebar-actions {
  display: flex;
  align-items: center;
  gap: 2px;
}
.bulk-toolbar {
  min-height: 52px;
  margin: 14px -2px 8px;
  padding: 0 4px 10px;
  border-bottom: 1px solid #e1e4e8;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}
.bulk-summary,
.bulk-actions {
  display: flex;
  align-items: center;
}
.bulk-summary {
  min-width: 0;
  gap: 8px;
  color: #292d33;
  font-size: 14px;
  white-space: nowrap;
}
.bulk-actions {
  gap: 4px;
}
.bulk-operation {
  height: 32px;
  padding: 0 8px;
}
.bulk-exit {
  min-width: 52px;
  height: 32px;
  padding: 0 12px;
}
.tree {
  overflow: auto;
}
.tree-row {
  height: 34px;
  margin: 1px 0;
  padding: 0 6px 0 10px;
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
.tree-row.disabled :deep(.el-checkbox__input) {
  cursor: not-allowed;
}
:global(.wiki-action-menu.el-popper) {
  min-width: 112px !important;
  padding: 4px 0 !important;
}
:global(.wiki-action-menu .el-dropdown-menu) {
  padding: 0 !important;
}
:global(.wiki-action-menu .el-dropdown-menu__item) {
  display: flex !important;
  flex-direction: row !important;
  align-items: center !important;
  gap: 8px;
  width: auto !important;
  min-width: 112px;
  height: 36px !important;
  min-height: 36px !important;
  padding: 0 12px !important;
  font-size: 14px !important;
  line-height: 36px !important;
  white-space: nowrap;
}
:global(.wiki-action-menu .el-dropdown-menu__item .el-icon) {
  width: 16px !important;
  height: 16px !important;
  margin: 0 !important;
  font-size: 16px !important;
}
:global(.wiki-action-menu .el-dropdown-menu__item--divided) {
  margin-top: 5px !important;
  border-top: 1px solid #ebeef5;
}
:global(.wiki-action-menu .el-dropdown-menu__item--divided::before) {
  display: none !important;
}
.tree-row.drop-target {
  border-color: #3370ff;
  background: #dce8ff;
  transform: translateX(3px);
  box-shadow: inset 3px 0 #3370ff;
}
.folder-row {
  color: #3b3f45;
}
.child {
  padding-left: 34px;
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
.sidebar-foot {
  margin-top: auto;
  padding: 12px 10px 0;
  border-top: 1px solid #e8eaed;
  display: flex;
  gap: 8px;
  color: #616873;
  font-size: 14px;
}
.content {
  min-width: 0;
  flex: 1;
  overflow: auto;
}
.topbar {
  height: 64px;
  padding: 0 36px;
  border-bottom: 1px solid #eceef1;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.crumb,
.top-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}
.crumb {
  font-size: 14px;
  color: #646a73;
  min-width: 0;
  overflow: hidden;
}
.crumb-node {
  max-width: 220px;
  overflow: hidden;
  color: #646a73;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
}
.crumb-node:hover {
  color: #2164e8;
}
.crumb-node.current,
.crumb-separator {
  color: #9aa0a8;
}
.crumb-separator {
  flex: none;
}
.document,
.folder-view,
.file-preview {
  max-width: 860px;
  margin: 0 auto;
  padding: 72px 56px 120px;
}
.doc-meta {
  display: flex;
  gap: 14px;
  font-size: 13px;
  color: #8c929b;
}
.document h1,
.folder-view h1,
.file-preview h1 {
  margin: 16px 0 32px;
  color: #1f2329;
  font-size: 34px;
  line-height: 1.25;
  font-weight: 700;
}
.folder-content {
  border-top: 1px solid #e8eaed;
}
.folder-content-row {
  min-height: 48px;
  padding: 0 8px;
  border-bottom: 1px solid #eef0f2;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #30343a;
  cursor: pointer;
}
.folder-content-row:hover {
  background: #f7f8fa;
}
.folder-content-row > span:first-of-type {
  min-width: 0;
  overflow: hidden;
  flex: 1;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.folder-kind {
  color: #9298a1;
  font-size: 13px;
}
.folder-empty {
  padding: 48px 0;
  color: #a0a5ad;
  text-align: center;
}
.rich-content {
  color: #373c43;
  font-size: 16px;
  line-height: 1.9;
}
.rich-content p {
  margin: 0 0 10px;
}
.rich-content .heading {
  margin-top: 26px;
  font-size: 20px;
  font-weight: 650;
}
.rich-content .bullet {
  padding-left: 18px;
  position: relative;
}
.rich-content .bullet::before {
  content: '';
  position: absolute;
  left: 2px;
  top: 14px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #4d5662;
}
.editor-area {
  width: 100%;
  min-height: 380px;
  padding: 18px;
  border: 1px solid #3370ff;
  border-radius: 6px;
  resize: vertical;
  color: #1f2329;
  font:
    16px/1.8 Inter,
    'PingFang SC',
    sans-serif;
  outline: none;
}
.editor-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 14px;
}
.file-preview {
  text-align: center;
}
.file-preview p {
  color: #8b9199;
}
.file-icon {
  width: 72px;
  height: 72px;
  margin: 18px auto;
  display: grid;
  place-items: center;
  border-radius: 12px;
  color: #fff;
  font-weight: 700;
}
.sheet {
  background: #20a464;
}
.sheet-preview {
  margin-top: 38px;
  overflow: hidden;
  border: 1px solid #dfe3e8;
  border-radius: 6px;
  text-align: left;
}
.sheet-row {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  min-height: 44px;
  border-bottom: 1px solid #e8eaed;
}
.sheet-row:first-child {
  background: #f4f7fb;
  font-weight: 600;
}
.sheet-row span {
  padding: 12px;
  border-right: 1px solid #e8eaed;
  font-size: 13px;
}
.image-preview {
  height: 300px;
  margin-bottom: 28px;
  display: grid;
  place-items: center;
  position: relative;
  border-radius: 8px;
  cursor: zoom-in;
  color: #548ce8;
  background: #eaf2ff;
}
.image-preview > .el-icon {
  font-size: 82px;
}
.image-preview .zoom {
  position: absolute;
  right: 18px;
  bottom: 18px;
  font-size: 24px;
}
.move-select {
  width: 100%;
}
.search-hint {
  padding-top: 16px;
  color: #8b9199;
  font-size: 13px;
}
.image-large {
  height: calc(100vh - 120px);
  display: grid;
  place-items: center;
  color: #fff;
  background: #202124;
}
.image-large .el-icon {
  font-size: 180px;
}
@media (max-width: 720px) {
  .wiki-page {
    height: 100vh;
  }
  .sidebar {
    width: 210px;
    flex-basis: 210px;
  }
  .workspace-head {
    font-size: 14px;
  }
  .topbar {
    padding: 0 18px;
  }
  .document,
  .file-preview {
    padding: 40px 24px;
  }
  .document h1,
  .file-preview h1 {
    font-size: 28px;
  }
  .top-actions > :first-child {
    display: none;
  }
}
</style>
