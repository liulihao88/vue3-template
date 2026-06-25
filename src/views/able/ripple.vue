<script setup lang="ts">
import ArrowRightUpLine from '@iconify-icons/ri/arrow-right-up-line'
import CheckboxCircleLine from '@iconify-icons/ri/checkbox-circle-line'
import CodeSSlashLine from '@iconify-icons/ri/code-s-slash-line'
import ContrastDropLine from '@iconify-icons/ri/contrast-drop-line'
import CursorLine from '@iconify-icons/ri/cursor-line'
import FingerprintLine from '@iconify-icons/ri/fingerprint-line'
import FlashlightLine from '@iconify-icons/ri/flashlight-line'
import MagicLine from '@iconify-icons/ri/magic-line'
import MouseLine from '@iconify-icons/ri/mouse-line'
import PulseLine from '@iconify-icons/ri/pulse-line'
import RestartLine from '@iconify-icons/ri/restart-line'
import Settings3Line from '@iconify-icons/ri/settings-3-line'
import WaterFlashLine from '@iconify-icons/ri/water-flash-line'

defineOptions({
  name: 'Ripple',
})

const buttonCases = [
  { label: 'Default', type: '' },
  { label: 'Primary', type: 'primary' },
  { label: 'Success', type: 'success' },
  { label: 'Info', type: 'info' },
  { label: 'Warning', type: 'warning' },
  { label: 'Danger', type: 'danger' },
] as const

const metrics = [
  {
    label: '触发方式',
    value: 'Pointer',
    description: '监听 pointerdown / pointerup，鼠标和触控都能触发。',
    icon: CursorLine,
  },
  {
    label: '扩散模式',
    value: '2',
    description: '支持点击位置扩散，也支持中心点扩散。',
    icon: PulseLine,
  },
  {
    label: '颜色来源',
    value: 'CurrentColor',
    description: '波纹颜色跟随文字色，方便用 class 接入主题。',
    icon: ContrastDropLine,
  },
]

const scenarioCards = [
  {
    title: '普通块级元素',
    description: '适合卡片、列表项、工具入口等大面积点击区域。',
    icon: MouseLine,
    className: 'surface-demo surface-demo-primary',
    ripple: undefined,
    center: false,
  },
  {
    title: '中心扩散',
    description: '适合强调确认感，比如固定操作、快捷入口和状态切换。',
    icon: FingerprintLine,
    className: 'surface-demo surface-demo-center',
    ripple: undefined,
    center: true,
  },
  {
    title: '自定义颜色',
    description: '通过 v-ripple="{ class: ... }" 让波纹继承指定文字色。',
    icon: MagicLine,
    className: 'surface-demo surface-demo-custom',
    ripple: { class: 'text-red-500' },
    center: false,
  },
]

const checklist = [
  '指令应该放在真实接收点击的元素上。',
  '如果组件内部层级较深，外层组件可能不是实际目标。',
  '行内元素需要设置 block 或 inline-block，波纹才有明确尺寸。',
  '自定义颜色本质是 currentColor，所以 class 需要影响文字色。',
]

const usageRows = [
  { label: '基础用法', code: 'v-ripple' },
  { label: '中心扩散', code: 'v-ripple.center' },
  { label: '自定义颜色', code: `v-ripple="{ class: 'text-red-500' }"` },
]
</script>

<template>
  <div class="ripple-page">
    <section class="ripple-hero">
      <div class="hero-copy">
        <span class="eyebrow">Interaction Pattern</span>
        <h1>Ripple 交互实验台</h1>
        <p>
          用同一个页面观察按钮、卡片、HTML 元素和自定义颜色在点击时的反馈。这里重点不是解释概念，而是让你直接感受到
          v-ripple 的使用边界。
        </p>
        <div class="hero-actions">
          <el-button v-ripple type="primary" size="large">
            <IconifyIconOffline :icon="WaterFlashLine" />
            试一下主按钮
          </el-button>
          <el-button v-ripple size="large" @click="void 0">
            <IconifyIconOffline :icon="ArrowRightUpLine" />
            查看示例
          </el-button>
        </div>
      </div>

      <div v-ripple.center="{ class: 'text-blue-500' }" class="hero-preview">
        <div class="preview-ring preview-ring-large" />
        <div class="preview-ring preview-ring-medium" />
        <div class="preview-core">
          <IconifyIconOffline :icon="WaterFlashLine" />
        </div>
        <div class="preview-caption">
          <span>center mode</span>
          <strong>点击此区域观察中心扩散</strong>
        </div>
      </div>
    </section>

    <section class="metric-grid">
      <article v-for="item in metrics" :key="item.label" class="metric-card">
        <span class="metric-icon">
          <IconifyIconOffline :icon="item.icon" />
        </span>
        <div>
          <span>{{ item.label }}</span>
          <strong>{{ item.value }}</strong>
          <p>{{ item.description }}</p>
        </div>
      </article>
    </section>

    <section class="content-grid">
      <article class="panel-card button-panel">
        <div class="panel-heading">
          <span class="panel-icon">
            <IconifyIconOffline :icon="FlashlightLine" />
          </span>
          <div>
            <h2>组件按钮</h2>
            <p>Element Plus 按钮可以直接挂载 v-ripple，适合高频操作按钮。</p>
          </div>
        </div>

        <div class="button-grid">
          <el-button v-for="item in buttonCases" :key="item.label" v-ripple :type="item.type || undefined" size="large">
            {{ item.label }}
          </el-button>
        </div>
      </article>

      <article class="panel-card usage-panel">
        <div class="panel-heading">
          <span class="panel-icon">
            <IconifyIconOffline :icon="CodeSSlashLine" />
          </span>
          <div>
            <h2>调用方式</h2>
            <p>三种写法覆盖大部分业务场景，复杂组件要确认真实点击层级。</p>
          </div>
        </div>

        <div class="usage-list">
          <div v-for="item in usageRows" :key="item.label" v-ripple class="usage-row">
            <span>{{ item.label }}</span>
            <code>{{ item.code }}</code>
          </div>
        </div>
      </article>
    </section>

    <section class="scenario-grid">
      <article
        v-for="item in scenarioCards"
        :key="item.title"
        v-ripple="item.center ? undefined : item.ripple"
        v-ripple.center="item.center ? item.ripple : false"
        :class="item.className"
      >
        <span class="scenario-icon">
          <IconifyIconOffline :icon="item.icon" />
        </span>
        <strong>{{ item.title }}</strong>
        <p>{{ item.description }}</p>
      </article>
    </section>

    <section class="content-grid">
      <article class="panel-card inline-panel">
        <div class="panel-heading">
          <span class="panel-icon">
            <IconifyIconOffline :icon="RestartLine" />
          </span>
          <div>
            <h2>行内元素</h2>
            <p>行内元素必须有明确盒模型，建议设置 inline-block。</p>
          </div>
        </div>

        <span v-ripple class="inline-target">inline-block target</span>
      </article>

      <article class="panel-card checklist-panel">
        <div class="panel-heading">
          <span class="panel-icon">
            <IconifyIconOffline :icon="Settings3Line" />
          </span>
          <div>
            <h2>使用边界</h2>
            <p>这些规则能避免大部分“波纹没有出现”或“位置不对”的问题。</p>
          </div>
        </div>

        <ul class="checklist">
          <li v-for="item in checklist" :key="item">
            <IconifyIconOffline :icon="CheckboxCircleLine" />
            <span>{{ item }}</span>
          </li>
        </ul>
      </article>
    </section>

    <section class="source-strip">
      <div>
        <span class="eyebrow">Source</span>
        <strong>当前页面代码位置：src/views/able/ripple.vue</strong>
      </div>
      <el-link href="https://github.com/pure-admin/vue-pure-admin/blob/main/src/views/able/ripple.vue" target="_blank">
        查看原始示例
      </el-link>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.ripple-page {
  display: flex;
  flex-direction: column;
  gap: 24px;
  color: var(--ui-text);
}

.ripple-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(320px, 0.8fr);
  gap: 24px;
  align-items: stretch;
}

.hero-copy,
.hero-preview,
.panel-card,
.metric-card,
.source-strip {
  background: var(--ui-surface);
  border: 1px solid var(--ui-border);
  border-radius: var(--ui-radius-md);
  box-shadow: var(--ui-shadow-sm);
}

.hero-copy {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 320px;
  padding: 32px;

  h1 {
    margin: 10px 0 0;
    font-size: 34px;
    font-weight: 650;
    line-height: var(--ui-leading-tight);
    color: var(--ui-text);
  }

  p {
    max-width: var(--ui-measure-md);
    margin: 14px 0 0;
    font-size: 15px;
    line-height: var(--ui-leading-reading);
    color: var(--ui-text-secondary);
  }
}

.eyebrow {
  display: inline-flex;
  width: fit-content;
  padding: 6px 10px;
  font-size: 12px;
  font-weight: 650;
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
  margin-top: 24px;
}

.hero-preview {
  position: relative;
  display: grid;
  place-items: center;
  min-height: 320px;
  overflow: hidden;
  color: var(--el-color-primary);
  cursor: pointer;
  background:
    linear-gradient(135deg, rgb(64 158 255 / 8%), transparent 38%),
    linear-gradient(180deg, var(--ui-surface), var(--ui-surface-soft));
}

.preview-ring {
  position: absolute;
  border: 1px solid rgb(64 158 255 / 18%);
  border-radius: 999px;
}

.preview-ring-large {
  width: 240px;
  height: 240px;
}

.preview-ring-medium {
  width: 150px;
  height: 150px;
  background: rgb(64 158 255 / 5%);
}

.preview-core {
  z-index: 1;
  display: grid;
  place-items: center;
  width: 76px;
  height: 76px;
  font-size: 32px;
  background: var(--ui-surface);
  border: 1px solid rgb(64 158 255 / 18%);
  border-radius: 999px;
  box-shadow: 0 16px 36px rgb(64 158 255 / 18%);
}

.preview-caption {
  position: absolute;
  bottom: 22px;
  left: 22px;
  display: flex;
  flex-direction: column;
  gap: 4px;

  span {
    font-size: 12px;
    color: var(--ui-text-tertiary);
  }

  strong {
    font-size: 15px;
    font-weight: 650;
    color: var(--ui-text);
  }
}

.metric-grid,
.scenario-grid,
.content-grid {
  display: grid;
  gap: 16px;
}

.metric-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.metric-card {
  display: grid;
  grid-template-columns: 44px minmax(0, 1fr);
  gap: 14px;
  padding: 18px;

  span {
    font-size: 13px;
    color: var(--ui-text-secondary);
  }

  strong {
    display: block;
    margin-top: 2px;
    font-size: 22px;
    font-weight: 650;
    line-height: var(--ui-leading-title);
    color: var(--ui-text);
  }

  p {
    margin: 6px 0 0;
    font-size: 13px;
    line-height: var(--ui-leading-copy);
    color: var(--ui-text-tertiary);
  }
}

.metric-icon,
.panel-icon,
.scenario-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--el-color-primary);
  background: rgb(64 158 255 / 10%);
  border-radius: var(--ui-radius-md);
}

.metric-icon {
  width: 44px;
  height: 44px;
  font-size: 20px;
}

.content-grid {
  grid-template-columns: minmax(0, 1fr) minmax(320px, 0.9fr);
}

.panel-card {
  padding: 24px;
}

.panel-heading {
  display: grid;
  grid-template-columns: 42px minmax(0, 1fr);
  gap: 14px;
  align-items: start;

  h2 {
    margin: 0;
    font-size: 20px;
    font-weight: 650;
    line-height: var(--ui-leading-title);
    color: var(--ui-text);
  }

  p {
    margin: 6px 0 0;
    font-size: 14px;
    line-height: var(--ui-leading-copy);
    color: var(--ui-text-secondary);
  }
}

.panel-icon {
  width: 42px;
  height: 42px;
  font-size: 18px;
}

.button-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin-top: 22px;

  :deep(.el-button) {
    width: 100%;
    margin-left: 0;
  }
}

.usage-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 22px;
}

.usage-row {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px;
  overflow: hidden;
  cursor: pointer;
  background: var(--ui-surface-soft);
  border: 1px solid var(--ui-border);
  border-radius: var(--ui-radius-md);

  span {
    flex: 0 0 auto;
    font-size: 13px;
    color: var(--ui-text-secondary);
  }

  code {
    min-width: 0;
    overflow: hidden;
    font-size: 13px;
    color: var(--ui-text);
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.scenario-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.surface-demo {
  display: flex;
  flex-direction: column;
  min-height: 220px;
  padding: 24px;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid var(--ui-border);
  border-radius: var(--ui-radius-md);

  strong {
    margin-top: auto;
    font-size: 18px;
    font-weight: 650;
    line-height: var(--ui-leading-title);
    color: var(--ui-text);
  }

  p {
    margin: 8px 0 0;
    font-size: 14px;
    line-height: var(--ui-leading-copy);
    color: var(--ui-text-secondary);
  }
}

.scenario-icon {
  width: 48px;
  height: 48px;
  font-size: 22px;
}

.surface-demo-primary {
  background: linear-gradient(180deg, var(--ui-surface), var(--ui-surface-soft));
}

.surface-demo-center {
  background: linear-gradient(135deg, rgb(64 158 255 / 9%), transparent 42%), var(--ui-surface);
}

.surface-demo-custom {
  color: #f56c6c;
  background: linear-gradient(135deg, rgb(245 108 108 / 10%), transparent 42%), var(--ui-surface);
}

.inline-panel,
.checklist-panel {
  min-height: 260px;
}

.inline-target {
  display: inline-block;
  padding: 18px 24px;
  margin-top: 26px;
  font-size: 15px;
  font-weight: 650;
  color: var(--el-color-primary);
  cursor: pointer;
  background: var(--ui-surface-soft);
  border: 1px solid rgb(64 158 255 / 16%);
  border-radius: var(--ui-radius-md);
}

.checklist {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 22px;

  li {
    display: grid;
    grid-template-columns: 18px minmax(0, 1fr);
    gap: 10px;
    align-items: start;
    font-size: 14px;
    line-height: var(--ui-leading-copy);
    color: var(--ui-text-secondary);

    svg {
      margin-top: 4px;
      color: var(--el-color-success);
    }
  }
}

.source-strip {
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
  padding: 18px 20px;

  strong {
    display: block;
    margin-top: 8px;
    font-size: 15px;
    font-weight: 650;
    color: var(--ui-text);
  }
}

@media screen and (width <= 1180px) {
  .ripple-hero,
  .content-grid,
  .scenario-grid,
  .metric-grid {
    grid-template-columns: 1fr;
  }

  .metric-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media screen and (width <= 768px) {
  .ripple-page {
    gap: 16px;
  }

  .hero-copy,
  .hero-preview,
  .panel-card,
  .metric-card,
  .source-strip {
    padding: 16px;
  }

  .hero-copy,
  .hero-preview {
    min-height: 260px;
  }

  .hero-copy h1 {
    font-size: 28px;
  }

  .hero-actions,
  .source-strip {
    flex-direction: column;
    align-items: stretch;
  }

  .hero-actions :deep(.el-button),
  .source-strip :deep(.el-link) {
    width: 100%;
    margin-left: 0;
  }

  .metric-grid,
  .button-grid {
    grid-template-columns: 1fr;
  }

  .preview-ring-large {
    width: 190px;
    height: 190px;
  }

  .preview-ring-medium {
    width: 122px;
    height: 122px;
  }

  .usage-row {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media screen and (width <= 420px) {
  .hero-copy,
  .hero-preview {
    min-height: 230px;
  }

  .hero-copy p,
  .panel-heading p,
  .surface-demo p {
    font-size: 13px;
  }

  .panel-heading {
    grid-template-columns: 38px minmax(0, 1fr);
  }

  .panel-icon,
  .metric-icon {
    width: 38px;
    height: 38px;
  }
}
</style>
