# frontend-skills-collection skills 推荐说明

适用项目：当前仓库是 Vue 3 + Vite + TypeScript + Pinia + Vue Router + Element Plus/Tailwind + Playwright 的后台管理类项目。

阅读范围：按 `frontend-skills-collection/*/SKILL.md` 的顶层 skill 整理，未展开每个 skill 的 `references/` 子目录。推荐指数按当前项目收益排序，不代表 skill 本身质量高低。

## 已跳过范围

按你的要求，以下类型不进入推荐表：

- React/Next/Vercel 相关：`react-*`、`next-*`、`vercel-*`。
- 移动原生相关：`react-native-*`、`expo-*`、`flutter-dev`、`upgrading-expo`、`upgrading-react-native`。
- 暂不适合当前项目：`nuxt`、`unocss`、`vitepress`。
- 内容强绑定 React/Next 的泛名 skill：`saas-scaffolder`、`senior-frontend`、`web-artifacts-builder`。

有些 UI skill 示例偏 React/Tailwind/shadcn，但方法论可迁移到 Vue。我在表里标了“只取方法，不照搬技术栈”。

## 推荐指数说明

| 指数 | 含义                                   |
| ---- | -------------------------------------- |
| 5.0  | 当前项目高频刚需，建议作为默认执行准则 |
| 4.x  | 当前项目很适合，做对应任务时优先用     |
| 3.x  | 场景型有价值，按需求触发               |
| 2.x  | 暂时低频，特定条件下再用               |
| 1.x  | 当前项目基本不建议使用                 |

## 推荐表

| 推荐指数 | Skill                                                            | 作用                                                                                                                 | 当前项目建议                                                                                                      |
| -------- | ---------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| 5.0      | `vue-best-practices` / `vue-best-practices-hyf0`                 | Vue 3 最完整的实践清单，覆盖响应式、组件、Props/Emits、模板、插槽、组合式 API、KeepAlive、Transition、性能等常见坑。 | 做任何 `.vue`、组合式 API、组件重构时优先用。主版本更全，`hyf0` 版本可作为流程化补充。                            |
| 5.0      | `vue`                                                            | Vue 3 官方风格参考，强调 `<script setup lang="ts">`、宏、响应式、watch、内置组件。                                   | 和 `vue-best-practices` 搭配使用，适合具体写组件和查 API 用法。                                                   |
| 4.9      | `vite`                                                           | Vite 配置、插件、`import.meta.glob`、资源处理、构建、SSR、Rolldown 迁移。                                            | 当前项目就是 Vite，改 `vite.config.ts`、构建优化、资源加载时优先用。注意文档偏新版本，迁移建议要结合当前 Vite 5。 |
| 4.8      | `typescript-advanced-types`                                      | 泛型、条件类型、映射类型、模板字面量类型、类型推导和类型测试。                                                       | 适合修复类型债、抽公共类型、优化 store/API/组件 Props 类型。不要为了炫技过度复杂化业务类型。                      |
| 4.8      | `vue-debug-guides`                                               | Vue 3 调试指南，覆盖响应式、computed、watch、模板、事件、v-model、生命周期、Teleport、Suspense、TS 等运行时问题。    | 排查 Vue 报错、页面不更新、watch 异常、组件事件错乱时非常适合。                                                   |
| 4.7      | `debug-pro`                                                      | 通用 7 步调试流程：复现、隔离、假设、插桩、验证、修复、回归测试。                                                    | 项目全局查 bug 时适合先用它定流程，再结合 Vue/Vite/Playwright 专项 skill。                                        |
| 4.7      | `pinia`                                                          | Pinia 官方风格指南，覆盖 setup store、`storeToRefs()`、插件、HMR、测试、组件外使用 store。                           | 当前项目已有 Pinia，优化 store 结构、修复响应式丢失、写 store 测试时优先用。                                      |
| 4.6      | `vue-pinia-best-practices`                                       | Pinia 常见坑清单：active pinia、setup store 返回值、解构丢响应、URL 状态等。                                         | 比 `pinia` 更偏“踩坑修复”，适合审查现有 store。                                                                   |
| 4.6      | `vue-router-best-practices` / `vue-router-best-practices-hyf0`   | Vue Router 4 守卫、参数变化、生命周期、重定向循环、清理副作用。                                                      | 当前项目路由复杂，做权限、菜单、标签页、动态路由时很有用。                                                        |
| 4.5      | `vue-testing-best-practices` / `vue-testing-best-practices-hyf0` | Vue 测试策略，覆盖 Vitest、Vue Test Utils、异步、Pinia、Suspense、Teleport、E2E。                                    | 组件测试首选，强调黑盒测试和异步稳定性。                                                                          |
| 4.5      | `vitest`                                                         | Vite 原生单测框架，覆盖配置、CLI、断言、mock、覆盖率、测试环境、类型测试。                                           | 给组件、composable、store 写单测时用。                                                                            |
| 4.4      | `playwright-pro` / `cs-playwright-pro`                           | 生产级 Playwright E2E 工具包，强调 locator 规则、反脆弱测试、CI、trace、fix flaky。                                  | 当前项目已有 Playwright，跑 E2E、修 flaky、补关键流程测试时优先用。                                               |
| 4.2      | `playwright`                                                     | 浏览器自动化、截图、表单、抓取、基础 E2E。                                                                           | 更适合一次性验证、截图检查、页面自动操作；正式测试套件优先 `playwright-pro`。                                     |
| 4.2      | `responsive-design`                                              | 响应式布局、容器查询、流式字号、Grid/Flex、断点策略、响应式表格。                                                    | 适配 375px 和桌面时很适合，尤其是后台页面、表格、导航折叠。                                                       |
| 4.1      | `refactoring-ui`                                                 | 视觉层级、间距、色彩、阴影、卡片、按钮、表格清晰度。                                                                 | 当前项目做 UI 统一和页面打磨时收益高，偏基础审美和组件层级。                                                      |
| 4.1      | `ui-design-system`                                               | 设计 token、组件规范、颜色/字号/间距/阴影、交付文档。                                                                | 当你想把零散页面风格收束成统一系统时使用。                                                                        |
| 4.0      | `web-typography`                                                 | 字体选择、字号层级、行高、长文本可读性、字体加载性能。                                                               | 中文后台界面建议取“层级、行高、阅读宽度、数字对齐”这些规则，不盲目引入外部字体。                                  |
| 4.0      | `microinteractions`                                              | 上传、生成、下载、loading、hover、状态反馈、表单验证等细节设计。                                                     | 当前项目做交互反馈、按钮状态、异步流程体验时很适合。                                                              |
| 3.9      | `web-component-design`                                           | React/Vue/Svelte 组件 API、组合模式、slot、组件库设计。                                                              | 适合抽公共组件、统一 Props 命名、设计插槽和状态。示例有 React，Vue 部分可取。                                     |
| 3.9      | `web-design-guidelines`                                          | UI/UX/accessibility 审查规则。                                                                                       | 做页面验收、无障碍检查、交互一致性检查时适合。                                                                    |
| 3.8      | `improve-codebase-architecture`                                  | 从代码库中找“浅模块”、耦合点、测试困难点，生成架构改进候选。                                                         | 比较适合先做全局架构体检，不建议直接大改代码。                                                                    |
| 3.8      | `clean-architecture`                                             | 依赖规则、边界、实体/用例、适配器、SOLID。                                                                           | 适合做模块边界和业务逻辑下沉时参考；对纯前端页面不要套得太重。                                                    |
| 3.8      | `code-reviewer-2` / `cs-code-reviewer`                           | PR/代码质量审查，关注复杂度、风险、SOLID、坏味道、安全问题。                                                         | 做合并前审查、全局质量巡检时适合。                                                                                |
| 3.7      | `pr-review-expert`                                               | 更系统的 PR 审查，包含影响面、安全、破坏性变更、测试覆盖。                                                           | 适合大 PR、共享模块、权限/路由/store 等高影响改动。                                                               |
| 3.7      | `high-perf-browser`                                              | 浏览器网络、资源加载、缓存、Core Web Vitals、实时通信。                                                              | 构建体积、首屏、字体/图片、缓存策略优化时用。                                                                     |
| 3.6      | `cs-performance-profiler`                                        | 性能分析流程，强调先测量再优化。                                                                                     | 页面卡顿、构建慢、Node 脚本慢时可用，但需配合具体工具数据。                                                       |
| 3.6      | `analytics-tracking` / `cs-analytics-tracking`                   | GA4/GTM/事件命名/转化跟踪/UTM/数据质量。                                                                             | 如果项目要做用户行为埋点或运营分析时用；内部后台若不需要分析可暂缓。                                              |
| 3.5      | `webapp-testing`                                                 | 用 Playwright 验证本地 web app，包含启动服务、截图、控制台日志、DOM 探查。                                           | 适合本地冒烟和视觉回归辅助；正式 E2E 仍用项目 Playwright 配置。                                                   |
| 3.5      | `browser-use`                                                    | 通过 `browser-use` CLI 做浏览器导航、点击、输入、截图、抽取。                                                        | 只有本机装了 `browser-use` 才好用；否则优先 Playwright。                                                          |
| 3.4      | `browser`                                                        | Puppeteer 风格的基础浏览器读取和渲染。                                                                               | 能力比较基础，当前项目用 Playwright 更顺手。                                                                      |
| 3.4      | `audit-website`                                                  | 用 squirrelscan 做网站 SEO、性能、安全、内容等审计。                                                                 | 适合部署后的网站体检；本地后台开发阶段收益一般。                                                                  |
| 3.4      | `ui-ux-pro-max`                                                  | UI/UX 方向、用户流程、信息架构、设计系统、可访问性、实现计划。                                                       | 适合从“页面怎么设计”到“怎么落代码”的综合方案。                                                                    |
| 3.3      | `frontend-design`                                                | 通用前端设计流程：布局、主题、动画、实现。                                                                           | 轻量设计任务可用，规则比 `refactoring-ui` 更泛。                                                                  |
| 3.3      | `superdesign`                                                    | 现代 UI 设计指导，适合 landing/dashboard/interface。                                                                 | 可作为视觉灵感，不宜替代项目已有设计系统。                                                                        |
| 3.2      | `frontend-design-ultimate`                                       | 强表现力静态页面设计，强调大胆视觉、动效、移动端模式。                                                               | 只取设计方法和审美检查，不照搬 React/Tailwind/shadcn 栈。适合单页视觉升级。                                       |
| 3.2      | `top-design`                                                     | Awwwards 风格高表现页面，强调戏剧化排版、滚动、动效、品牌体验。                                                      | 适合展示型页面，不太适合常规后台管理页。                                                                          |
| 3.1      | `epic-design`                                                    | 2.5D、滚动叙事、视差、沉浸式动效。                                                                                   | 适合活动页/展示页，不适合高密度后台表格页。                                                                       |
| 3.1      | `architecture-blueprint-generator`                               | 生成项目架构蓝图文档，识别技术栈、模式、组件、数据流、决策记录。                                                     | 适合沉淀项目架构文档，最好在架构稳定后用。                                                                        |
| 3.0      | `architecture-diagram-generator`                                 | 根据描述生成暗色主题架构图 HTML/SVG。                                                                                | 适合画系统图、模块关系图、部署图。                                                                                |
| 3.0      | `senior-architect`                                               | 系统架构评估、ADR、依赖分析、技术决策、架构图。                                                                      | 中大型改造或技术选型时用；日常页面开发暂缓。                                                                      |
| 3.0      | `tech-stack-evaluator`                                           | 技术栈对比、TCO、生态健康、安全、迁移评估。                                                                          | 当你考虑换库、升级框架、替换组件库时用。                                                                          |
| 2.9      | `breakdown-feature-implementation`                               | 把功能拆成实施计划。                                                                                                 | 大功能开始前可用，但它偏通用 prompt，不如直接结合项目上下文拆解。                                                 |
| 2.9      | `modern-javascript-patterns`                                     | ES6+、async/await、解构、函数式模式、模块化。                                                                        | 适合老 JS 改现代写法；当前 TS/Vue 项目属于补充。                                                                  |
| 2.8      | `fullstack-dev`                                                  | 后端架构、API、认证、错误处理、日志、前后端集成。                                                                    | 如果要扩展 Express/API 服务可用；纯前端任务不需要。                                                               |
| 2.8      | `senior-fullstack`                                               | 全栈脚手架、代码质量、栈选择。                                                                                       | 当前仓库不是全栈主项目，除非新建服务，否则暂缓。                                                                  |
| 2.7      | `monorepo-navigator`                                             | monorepo 导航、包关系、任务工具选择。                                                                                | 当前项目不是明显 monorepo，暂时低频。                                                                             |
| 2.7      | `turborepo`                                                      | Turborepo 任务、缓存、filter、CI、包边界。                                                                           | 只有迁成 monorepo 或引入 Turbo 后才建议用。                                                                       |
| 2.6      | `frontend-dev`                                                   | 大型视觉页面、动效、AI 资产、文案、生成式艺术等综合流程。                                                            | 默认技术栈偏 React/Next，当前 Vue 项目只取设计/动效/资产思路。                                                    |
| 2.5      | `vue-jsx-best-practices`                                         | Vue JSX 语法和配置注意点。                                                                                           | 当前项目多数是 SFC，只有写 TSX/JSX 组件时才用。                                                                   |
| 2.4      | `aionui-cowork-desktop`                                          | OpenClaw/AionUi 桌面协作、多 agent、远程救援。                                                                       | 和当前代码质量/页面开发关系很弱，除非你要搭 agent 工作台。                                                        |

## 我建议的执行顺序

如果要继续“全局治理”当前项目，优先级建议是：

1. `vue-best-practices` + `vue`
2. `vite`
3. `typescript-advanced-types`
4. `vue-debug-guides` + `debug-pro`
5. `pinia` + `vue-pinia-best-practices`
6. `vue-router-best-practices`
7. `vue-testing-best-practices` + `vitest`
8. `playwright-pro`
9. `responsive-design` + `refactoring-ui`
10. `ui-design-system` + `web-typography` + `microinteractions`

架构类建议先用 `improve-codebase-architecture` 做审计，再决定是否用 `clean-architecture` 落具体边界。设计类建议先用 `refactoring-ui` 和 `responsive-design` 打基础，再按页面需要选择 `frontend-design-ultimate`、`top-design` 或 `epic-design`。
