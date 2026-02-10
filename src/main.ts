import App from './App.vue'
import router from './router'
import { setupStore } from '@/store'
import { getPlatformConfig } from './config'
import { MotionPlugin } from '@vueuse/motion'
import { useEcharts } from '@/plugins/echarts'
import { createApp, type Directive } from 'vue'
import { useElementPlus } from '@/plugins/elementPlus'
import { injectResponsiveStorage } from '@/utils/responsive'

import '@/assets/style/index.scss'

import 'virtual:svg-icons-register'

import Table from '@pureadmin/table'
// import PureDescriptions from "@pureadmin/descriptions";

// 引入重置样式
import './style/reset.scss'
// 导入公共样式
import './style/index.scss'
// 一定要在main.ts中导入tailwind.css，防止vite每次hmr都会请求src/style/index.scss整体css文件导致热更新慢的问题
import './style/tailwind.css'
import 'element-plus/dist/index.css'
// 导入字体图标
import './assets/iconfont/iconfont.js'
import './assets/iconfont/iconfont.css'

const app = createApp(App)

// 自定义指令
import * as directives from '@/directives'
Object.keys(directives).forEach((key) => {
  app.directive(key, (directives as { [key: string]: Directive })[key])
})

// 全局注册@iconify/vue图标库
import { IconifyIconOffline, IconifyIconOnline, FontIcon } from './components/ReIcon'
app.component('IconifyIconOffline', IconifyIconOffline)
app.component('IconifyIconOnline', IconifyIconOnline)
app.component('FontIcon', FontIcon)

// 全局注册按钮级别权限组件
import { Auth } from '@/components/ReAuth'
app.component('Auth', Auth)
import AutoImportComps from '@/utils/autoImportComps.js'
app.use(AutoImportComps)

import VChart from 'vue-echarts'
app.component('v-chart', VChart)

// 全局注册vue-tippy
import 'tippy.js/dist/tippy.css'
import 'tippy.js/themes/light.css'
import VueTippy from 'vue-tippy'
app.use(
  VueTippy,
  // optional
  {
    directive: 'tippy', // => v-tippy
    component: 'tippy', // => <tippy/>
    componentSingleton: 'tippy-singleton', // => <tippy-singleton/>,
    defaultProps: {
      placement: 'auto-end',
      allowHTML: true,
    }, // => Global default options * see all props
  },
)

import OeosComponents, { utils } from 'oeos-components'
import 'oeos-components/dist/style.css'
Object.keys(utils).forEach((v) => {
  app.config.globalProperties[v] = utils[v]
})
app.use(OeosComponents)
import * as gFunc from '@/utils/gFunc.js'
Object.keys(gFunc).forEach((v) => {
  app.config.globalProperties[v] = gFunc[v]
})

// 在main.js中按下引入
import TuiPlus from '@wocwin/t-ui-plus'
import '@wocwin/t-ui-plus/lib/style.css'
app.use(TuiPlus)

getPlatformConfig(app).then(async (config) => {
  setupStore(app)
  app.use(router)
  await router.isReady()
  injectResponsiveStorage(app, config)
  app
    .use(MotionPlugin)
    .use(useElementPlus)
    .use(Table)
    // .use(PureDescriptions)
    .use(useEcharts)
  app.mount('#app')
})
