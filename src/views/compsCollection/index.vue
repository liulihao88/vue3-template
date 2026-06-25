<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

import Apps2Line from '@iconify-icons/ri/apps-2-line'
import ArrowRightUpLine from '@iconify-icons/ri/arrow-right-up-line'
import Brush3Line from '@iconify-icons/ri/brush-3-line'
import CodeSSlashLine from '@iconify-icons/ri/code-s-slash-line'
import Database2Line from '@iconify-icons/ri/database-2-line'
import FileList3Line from '@iconify-icons/ri/file-list-3-line'
import FlashlightLine from '@iconify-icons/ri/flashlight-line'
import FolderChart2Line from '@iconify-icons/ri/folder-chart-2-line'
import LayoutGridLine from '@iconify-icons/ri/layout-grid-line'
import LineChartLine from '@iconify-icons/ri/line-chart-line'
import PaletteLine from '@iconify-icons/ri/palette-line'
import PieChart2Line from '@iconify-icons/ri/pie-chart-2-line'
import Rocket2Line from '@iconify-icons/ri/rocket-2-line'
import ShapesLine from '@iconify-icons/ri/shapes-line'
import SparklingLine from '@iconify-icons/ri/sparkling-line'
import StackLine from '@iconify-icons/ri/stack-line'
import TimeLine from '@iconify-icons/ri/time-line'

const router = useRouter()

const headlineStats = [
  {
    label: '演示模块',
    value: '40+',
    detail: '覆盖图表、表单、VueUse、组件和工具页',
    icon: LayoutGridLine,
  },
  {
    label: '交互能力',
    value: '12',
    detail: '上传、校验、打印、预览、拖拽、全屏',
    icon: FlashlightLine,
  },
  {
    label: '设计目标',
    value: '统一',
    detail: '收敛层级、节奏、反馈和暗色模式',
    icon: PaletteLine,
  },
]

const sections = [
  {
    title: '表单与录入',
    description: '录入页优先保证字段关系清楚、校验反馈明确、长表单也能快速扫描。',
    icon: FileList3Line,
    items: [
      { title: '动态表单', description: '远程 schema、循环数据、字段联动。', path: '/form/oForm', badge: 'Forms' },
      { title: '远程表单', description: '模拟配置驱动的表单生成流程。', path: '/form/remoteForm', badge: 'Remote' },
      { title: '循环表单', description: '多组重复字段的批量录入展示。', path: '/form/loopForm', badge: 'Batch' },
    ],
  },
  {
    title: '组件与交互',
    description: '组件入口按使用场景组织，标题短、说明轻，先帮助你判断是否值得进入。',
    icon: ShapesLine,
    items: [
      { title: '基础组件', description: '验证码、输入封装和常用组合示例。', path: '/components/base', badge: 'Base' },
      {
        title: '动态按钮',
        description: '按钮配置和状态切换交互。',
        path: '/components/dynamic-button',
        badge: 'Actions',
      },
      { title: '时间轴', description: '结构化信息的时序表达。', path: '/components/timeline', badge: 'Flow' },
      {
        title: '分栏拖拽',
        description: '适合工作台和控制台布局的拆分场景。',
        path: '/components/split-pane',
        badge: 'Layout',
      },
    ],
  },
  {
    title: '图表与洞察',
    description: '数据页需要先读懂结论，再进入细节；图表入口也保持同样的信息顺序。',
    icon: LineChartLine,
    items: [
      { title: '基础图表', description: '折线、柱状等基础表达。', path: '/charts/base', badge: 'Charts' },
      { title: '饼图集合', description: '适合总量、占比和结构分布。', path: '/charts/pie', badge: 'Ratio' },
      { title: 'AntV G2', description: '更自由的数据可视化表现。', path: '/charts/antvG2', badge: 'Advanced' },
      { title: '对象折线', description: '对象结构映射到趋势视图。', path: '/charts/objectLine', badge: 'Trend' },
    ],
  },
  {
    title: '效率与工具',
    description: '工具页适合高频重复使用，入口文案保持动作明确、结果可预期。',
    icon: Rocket2Line,
    items: [
      {
        title: '音频可视化',
        description: '查看媒体控制、波形展示和操作反馈。',
        path: '/able/wavesurfer',
        badge: 'Media',
      },
      { title: '打印示例', description: '表格打印和样式控制。', path: '/able/print', badge: 'Print' },
      { title: 'Excel 处理', description: '表格读取、渲染和下载能力。', path: '/able/excel', badge: 'Excel' },
      { title: 'PDF 预览', description: '文档浏览与本地预览。', path: '/usually/pdfjs', badge: 'Preview' },
    ],
  },
]

const quickLinks = [
  { title: 'VueUse', description: '常见组合式能力的可视化示例。', path: '/vueuse/home', icon: SparklingLine },
  { title: '常用工具', description: 'dayjs、jwt、pdf、插件等常用能力。', path: '/usually/base', icon: StackLine },
  {
    title: 'JSON 处理',
    description: '编辑器和 JSON 可视化页面。',
    path: '/handleJson/vueJsonPretty',
    icon: CodeSSlashLine,
  },
  { title: '权限页面', description: '按钮权限和页面权限示例。', path: '/permission/page', icon: Database2Line },
]

const principles = [
  {
    title: '统一的层级',
    description: '标题、摘要、数据、操作各自承担一种语气，页面读起来会更安静。',
    icon: Apps2Line,
  },
  {
    title: '稳定的间距',
    description: '区块之间拉开距离，区块内部保持紧凑，用户就不会在页面里迷路。',
    icon: TimeLine,
  },
  {
    title: '明确的状态',
    description: '交互文案和状态反馈要短而直接，少解释，多给下一步。',
    icon: Brush3Line,
  },
]

const featuredComponents = [
  {
    title: '统计卡片',
    description: '数字先给结论，说明文字补充范围和上下文。',
    comp: 'g-statistic',
  },
  {
    title: '品牌色选择',
    description: '颜色入口保持轻量，避免抢走标题和内容的注意力。',
    comp: 'g-color-picker',
  },
  {
    title: '提示浮层',
    description: '提示信息适合补充细节，不承担主路径说明。',
    comp: 'g-tippy',
  },
]

const totalDemoCount = computed(() => {
  return sections.reduce((sum, section) => sum + section.items.length, 0) + quickLinks.length
})

const openRoute = (path: string) => {
  router.push(path)
}
</script>

<template>
  <div class="design-dashboard">
    <section class="hero-section">
      <div class="hero-copy">
        <span class="hero-kicker">Component Workspace</span>
        <h1>组件工作台</h1>
        <p>
          常用能力按任务类型重新分组，标题负责定位，摘要负责判断，入口负责行动。中文页面最怕信息挤在一起，这里先把阅读节奏理顺。
        </p>
        <div class="hero-actions">
          <el-button type="primary" size="large" @click="openRoute('/components/base')">
            <IconifyIconOffline :icon="ArrowRightUpLine" />
            开始看组件
          </el-button>
          <el-button size="large" @click="openRoute('/form/oForm')">查看表单页</el-button>
        </div>
      </div>

      <div class="hero-panel">
        <div class="hero-panel-head">
          <span>当前工作台</span>
          <strong>{{ totalDemoCount }} 个核心入口</strong>
        </div>
        <div class="hero-stat-grid">
          <article v-for="item in headlineStats" :key="item.label" class="hero-stat-card">
            <div class="hero-stat-icon">
              <IconifyIconOffline :icon="item.icon" />
            </div>
            <div class="hero-stat-body">
              <span>{{ item.label }}</span>
              <strong>{{ item.value }}</strong>
              <p>{{ item.detail }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="content-grid">
      <div class="content-main">
        <article v-for="section in sections" :key="section.title" class="panel-card section-panel">
          <div class="panel-header">
            <div class="panel-title-wrap">
              <div class="panel-icon">
                <IconifyIconOffline :icon="section.icon" />
              </div>
              <div>
                <h2>{{ section.title }}</h2>
                <p>{{ section.description }}</p>
              </div>
            </div>
          </div>

          <div class="feature-grid">
            <button
              v-for="item in section.items"
              :key="item.path"
              type="button"
              class="feature-card"
              @click="openRoute(item.path)"
            >
              <span class="feature-badge">{{ item.badge }}</span>
              <strong>{{ item.title }}</strong>
              <p>{{ item.description }}</p>
              <span class="feature-link">
                进入页面
                <IconifyIconOffline :icon="ArrowRightUpLine" />
              </span>
            </button>
          </div>
        </article>
      </div>

      <aside class="content-side">
        <article class="panel-card side-panel">
          <div class="panel-header">
            <div class="panel-title-wrap">
              <div class="panel-icon">
                <IconifyIconOffline :icon="PaletteLine" />
              </div>
              <div>
                <h2>设计原则</h2>
                <p>标题、摘要、数字和操作分开承担信息密度。</p>
              </div>
            </div>
          </div>

          <div class="principle-list">
            <div v-for="item in principles" :key="item.title" class="principle-item">
              <div class="principle-icon">
                <IconifyIconOffline :icon="item.icon" />
              </div>
              <div>
                <strong>{{ item.title }}</strong>
                <p>{{ item.description }}</p>
              </div>
            </div>
          </div>
        </article>

        <article class="panel-card side-panel">
          <div class="panel-header">
            <div class="panel-title-wrap">
              <div class="panel-icon">
                <IconifyIconOffline :icon="FolderChart2Line" />
              </div>
              <div>
                <h2>快捷入口</h2>
                <p>高频页面保持短路径，减少菜单层级带来的停顿。</p>
              </div>
            </div>
          </div>

          <div class="quick-link-list">
            <button
              v-for="item in quickLinks"
              :key="item.path"
              type="button"
              class="quick-link-item"
              @click="openRoute(item.path)"
            >
              <span class="quick-link-icon">
                <IconifyIconOffline :icon="item.icon" />
              </span>
              <span class="quick-link-copy">
                <strong>{{ item.title }}</strong>
                <small>{{ item.description }}</small>
              </span>
              <IconifyIconOffline :icon="ArrowRightUpLine" class="quick-link-arrow" />
            </button>
          </div>
        </article>
      </aside>
    </section>

    <section class="component-showcase">
      <div class="showcase-head">
        <div>
          <span class="hero-kicker">Featured Components</span>
          <h2>精选组件</h2>
        </div>
      </div>

      <div class="showcase-grid">
        <article v-for="item in featuredComponents" :key="item.title" class="panel-card showcase-card">
          <div class="showcase-card-head">
            <div>
              <strong>{{ item.title }}</strong>
              <p>{{ item.description }}</p>
            </div>
          </div>
          <div class="showcase-card-body">
            <component :is="item.comp" />
          </div>
        </article>
      </div>
    </section>

    <section class="bottom-banner panel-card">
      <div class="bottom-banner-copy">
        <span class="hero-kicker">Next Step</span>
        <h2>下一步可以继续统一表单页、图表页和工具页</h2>
        <p>首页现在提供了排版基准：标题更短，说明更稳，入口更容易扫读。后续页面可以沿用这套节奏。</p>
      </div>
      <el-button type="primary" size="large" @click="openRoute('/able/print')">
        <IconifyIconOffline :icon="PieChart2Line" />
        看工具页示例
      </el-button>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.design-dashboard {
  display: flex;
  flex-direction: column;
  gap: 28px;
  font-family: var(--ui-font-sans);
  font-variant-numeric: tabular-nums;
  color: var(--ui-text);
  letter-spacing: 0;
}

.hero-section {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1.45fr) minmax(320px, 0.95fr);
  gap: 24px;
  padding: 4px 0 0;
  overflow: hidden;
  background: transparent;
}

.hero-copy {
  display: flex;
  flex-direction: column;
  gap: 14px;
  justify-content: center;
  min-width: 0;
  padding: 20px 0;

  h1 {
    max-width: var(--ui-measure-sm);
    margin: 0;
    font-size: 36px;
    font-weight: 650;
    line-height: var(--ui-leading-tight);
    color: var(--ui-text);
    text-wrap: balance;
  }

  p {
    max-width: var(--ui-measure-md);
    margin: 0;
    font-size: 15px;
    line-height: var(--ui-leading-reading);
    color: var(--ui-text-secondary);
    text-wrap: pretty;
  }
}

.hero-kicker {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  padding: 6px 10px;
  font-size: 12px;
  font-weight: 600;
  line-height: 1;
  color: var(--el-color-primary);
  letter-spacing: 0;
  background: rgb(64 158 255 / 8%);
  border: 1px solid rgb(64 158 255 / 14%);
  border-radius: 999px;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 8px;
}

.hero-panel {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px 22px;
  background: var(--ui-surface);
  border: 1px solid var(--ui-border);
  border-radius: var(--ui-radius-md);
  box-shadow: var(--ui-shadow-sm);
}

.hero-panel-head {
  display: flex;
  gap: 8px;
  align-items: baseline;
  justify-content: space-between;

  span {
    font-size: 13px;
    line-height: var(--ui-leading-title);
    color: var(--ui-text-secondary);
  }

  strong {
    font-size: 15px;
    line-height: var(--ui-leading-title);
    color: var(--ui-text);
  }
}

.hero-stat-grid {
  display: grid;
  gap: 12px;
}

.hero-stat-card {
  display: grid;
  grid-template-columns: 44px minmax(0, 1fr);
  gap: 14px;
  align-items: start;
  padding: 16px;
  background: var(--ui-surface-soft);
  border: 1px solid var(--ui-border);
  border-radius: var(--ui-radius-md);
}

.hero-stat-icon,
.panel-icon,
.principle-icon,
.quick-link-icon {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  color: var(--el-color-primary);
  background: rgb(64 158 255 / 10%);
  border-radius: 12px;
}

.hero-stat-icon {
  width: 44px;
  height: 44px;
  font-size: 20px;
}

.hero-stat-body {
  display: flex;
  flex-direction: column;
  gap: 4px;

  span {
    font-size: 13px;
    line-height: var(--ui-leading-title);
    color: var(--ui-text-secondary);
  }

  strong {
    font-size: 24px;
    font-weight: 650;
    line-height: 1.1;
    color: var(--ui-text);
  }

  p {
    margin: 0;
    font-size: 13px;
    line-height: var(--ui-leading-copy);
    color: var(--ui-text-tertiary);
  }
}

.content-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.65fr) minmax(320px, 0.9fr);
  gap: 24px;
}

.content-main,
.content-side {
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-width: 0;
}

.panel-card {
  background: var(--ui-surface);
  border: 1px solid var(--ui-border);
  border-radius: var(--ui-radius-md);
  box-shadow: var(--ui-shadow-sm);
}

.section-panel,
.side-panel,
.showcase-card,
.bottom-banner {
  padding: 24px;
}

.panel-header,
.showcase-head {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  justify-content: space-between;
}

.panel-title-wrap {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  min-width: 0;

  h2 {
    margin: 0;
    font-size: 20px;
    font-weight: 650;
    line-height: var(--ui-leading-title);
    color: var(--ui-text);
    text-wrap: balance;
  }

  p {
    margin: 6px 0 0;
    font-size: 14px;
    line-height: var(--ui-leading-copy);
    color: var(--ui-text-secondary);
    text-wrap: pretty;
  }
}

.panel-icon {
  width: 40px;
  height: 40px;
  font-size: 18px;
}

.feature-grid,
.showcase-grid {
  display: grid;
  gap: 16px;
  margin-top: 20px;
}

.feature-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.feature-card,
.quick-link-item {
  text-align: left;
  cursor: pointer;
  border: 0;
  outline: none;
}

.feature-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 168px;
  padding: 18px;
  background: linear-gradient(180deg, var(--ui-surface), var(--ui-surface-soft));
  border: 1px solid var(--ui-border);
  border-radius: var(--ui-radius-md);
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    border-color 0.18s ease,
    background-color 0.18s ease;

  &:hover {
    border-color: rgb(64 158 255 / 20%);
    box-shadow: 0 14px 28px rgb(15 23 42 / 8%);
    transform: translateY(-2px);
  }

  strong {
    font-size: 17px;
    font-weight: 650;
    line-height: var(--ui-leading-title);
    color: var(--ui-text);
    text-wrap: balance;
  }

  p {
    flex: 1;
    margin: 0;
    font-size: 14px;
    line-height: var(--ui-leading-copy);
    color: var(--ui-text-secondary);
    text-wrap: pretty;
  }
}

.feature-badge {
  display: inline-flex;
  width: fit-content;
  padding: 4px 8px;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.25;
  color: var(--ui-text-secondary);
  letter-spacing: 0;
  background: rgb(15 23 42 / 4%);
  border-radius: 999px;
}

.feature-link {
  display: inline-flex;
  gap: 6px;
  align-items: center;
  font-size: 13px;
  font-weight: 600;
  line-height: var(--ui-leading-title);
  color: var(--el-color-primary);
}

.principle-list,
.quick-link-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 20px;
}

.principle-item {
  display: grid;
  grid-template-columns: 40px minmax(0, 1fr);
  gap: 14px;
  align-items: start;
  padding: 14px 0;

  &:not(:last-child) {
    border-bottom: 1px solid var(--ui-border);
  }

  strong {
    font-size: 15px;
    font-weight: 650;
    line-height: var(--ui-leading-title);
    color: var(--ui-text);
  }

  p {
    margin: 6px 0 0;
    font-size: 13px;
    line-height: var(--ui-leading-copy);
    color: var(--ui-text-secondary);
    text-wrap: pretty;
  }
}

.principle-icon,
.quick-link-icon {
  width: 40px;
  height: 40px;
  font-size: 18px;
}

.quick-link-item {
  display: grid;
  grid-template-columns: 40px minmax(0, 1fr) 18px;
  gap: 14px;
  align-items: center;
  width: 100%;
  padding: 14px;
  background: var(--ui-surface-soft);
  border: 1px solid transparent;
  border-radius: var(--ui-radius-md);
  transition:
    transform 0.18s ease,
    border-color 0.18s ease,
    background-color 0.18s ease;

  &:hover {
    background: rgb(64 158 255 / 6%);
    border-color: rgb(64 158 255 / 14%);
    transform: translateY(-1px);
  }
}

.quick-link-copy {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;

  strong {
    font-size: 15px;
    font-weight: 650;
    line-height: var(--ui-leading-title);
    color: var(--ui-text);
  }

  small {
    font-size: 13px;
    line-height: var(--ui-leading-copy);
    color: var(--ui-text-secondary);
    text-wrap: pretty;
  }
}

.quick-link-arrow {
  color: var(--ui-text-tertiary);
}

.component-showcase {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.showcase-head {
  h2 {
    margin: 8px 0 0;
    font-size: 24px;
    font-weight: 650;
    line-height: var(--ui-leading-title);
    color: var(--ui-text);
  }
}

.showcase-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.showcase-card {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.showcase-card-head {
  strong {
    font-size: 16px;
    font-weight: 650;
    line-height: var(--ui-leading-title);
    color: var(--ui-text);
  }

  p {
    margin: 6px 0 0;
    font-size: 13px;
    line-height: var(--ui-leading-copy);
    color: var(--ui-text-secondary);
    text-wrap: pretty;
  }
}

.showcase-card-body {
  min-height: 200px;
}

.bottom-banner {
  display: flex;
  gap: 24px;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(135deg, rgb(255 255 255 / 98%), rgb(247 250 255 / 98%)), var(--ui-surface);
}

.bottom-banner-copy {
  max-width: 760px;

  h2 {
    margin: 8px 0 0;
    font-size: 24px;
    font-weight: 650;
    line-height: var(--ui-leading-title);
    color: var(--ui-text);
    text-wrap: balance;
  }

  p {
    margin: 10px 0 0;
    font-size: 14px;
    line-height: var(--ui-leading-reading);
    color: var(--ui-text-secondary);
    text-wrap: pretty;
  }
}

@media screen and (width <= 1280px) {
  .content-grid,
  .hero-section,
  .showcase-grid,
  .feature-grid {
    grid-template-columns: 1fr;
  }
}

@media screen and (width <= 900px) {
  .hero-section,
  .content-grid {
    gap: 20px;
  }

  .hero-copy {
    padding: 8px 0 0;
  }

  .hero-panel {
    padding: 18px;
  }

  .showcase-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .bottom-banner {
    align-items: flex-start;
  }
}

@media screen and (width <= 768px) {
  .design-dashboard {
    gap: 18px;
  }

  .hero-section,
  .section-panel,
  .side-panel,
  .showcase-card,
  .bottom-banner {
    padding: 16px;
  }

  .hero-section {
    padding: 0;
  }

  .hero-actions,
  .bottom-banner {
    flex-direction: column;
  }

  .hero-actions {
    align-items: stretch;
    width: 100%;
  }

  .hero-actions :deep(.el-button),
  .bottom-banner :deep(.el-button) {
    width: 100%;
    margin-left: 0;
  }

  .hero-stat-card,
  .principle-item,
  .quick-link-item {
    grid-template-columns: 38px minmax(0, 1fr);
    gap: 12px;
  }

  .quick-link-item {
    grid-template-columns: 38px minmax(0, 1fr) 18px;
  }

  .hero-stat-icon,
  .panel-icon,
  .principle-icon,
  .quick-link-icon {
    width: 38px;
    height: 38px;
    font-size: 17px;
  }

  .showcase-grid {
    grid-template-columns: 1fr;
  }

  .hero-copy h1,
  .bottom-banner-copy h2,
  .showcase-head h2 {
    font-size: 26px;
  }

  .bottom-banner {
    align-items: flex-start;
  }

  .showcase-card-body {
    min-height: 0;
  }

  .showcase-card-body :deep(.el-col) {
    flex: 0 0 50%;
    width: 50%;
    max-width: 50%;
    margin-bottom: 12px;
  }
}

@media screen and (width <= 420px) {
  .design-dashboard {
    gap: 14px;
  }

  .hero-copy {
    padding-top: 4px;

    h1 {
      font-size: 28px;
    }

    p {
      font-size: 14px;
      line-height: var(--ui-leading-copy);
    }
  }

  .hero-panel-head,
  .panel-title-wrap {
    align-items: flex-start;
  }

  .hero-panel-head {
    flex-direction: column;
    gap: 4px;
  }

  .panel-title-wrap {
    gap: 12px;
  }

  .panel-title-wrap h2 {
    font-size: 18px;
  }

  .feature-card {
    min-height: 0;
    padding: 16px;
  }

  .feature-card strong {
    font-size: 16px;
  }

  .bottom-banner-copy h2,
  .showcase-head h2 {
    font-size: 22px;
  }

  .showcase-card-body :deep(.el-col) {
    flex: 0 0 100%;
    width: 100%;
    max-width: 100%;
  }
}
</style>
