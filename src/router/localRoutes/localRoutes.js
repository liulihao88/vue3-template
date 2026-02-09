const { VITE_HIDE_HOME } = import.meta.env
const Layout = () => import('@/layout/index.vue')

export default [
  {
    path: '/handleJson',
    component: Layout,
    redirect: '/handleJson/vueJsonPretty',
    meta: {
      icon: 'ep:home-filled',
      title: '处理json',
    },
    children: [
      {
        path: '/handleJson/vueJsonPretty',
        name: 'vueJsonPretty',
        component: () => import('@/views/handleJson/vueJsonPretty.vue'),
        meta: {
          title: 'vue-json-pretty',
          showLink: VITE_HIDE_HOME === 'true' ? false : true,
        },
      },
      {
        path: '/handleJson/vue3AceEditor',
        name: 'vue3AceEditor',
        component: () => import('@/views/handleJson/vue3AceEditor.vue'),
        meta: {
          title: 'vue3AceEditor',
          showLink: VITE_HIDE_HOME === 'true' ? false : true,
        },
      },
    ],
  },
  {
    path: '/charts',
    component: Layout,
    redirect: '/charts/vueJsonPretty',
    meta: {
      icon: 'ep:home-filled',
      title: '图表相关',
    },
    children: [
      {
        path: '/charts/base',
        name: 'chartsBase',
        component: () => import('@/views/charts/base.vue'),
        meta: {
          title: 'echarts-基础图',
          showLink: VITE_HIDE_HOME === 'true' ? false : true,
        },
      },
      {
        path: '/charts/pie',
        name: 'chatrsPie',
        component: () => import('@/views/charts/pie.vue'),
        meta: {
          title: 'echarts-饼图',
          showLink: VITE_HIDE_HOME === 'true' ? false : true,
        },
      },
      {
        path: '/charts/antvG2',
        name: 'antvG2',
        component: () => import('@/views/charts/antvG2.vue'),
        meta: {
          title: 'antvG2-马赛克图',
          showLink: VITE_HIDE_HOME === 'true' ? false : true,
        },
      },
      {
        path: '/charts/objectLine',
        name: 'chatrsObjectLine',
        component: () => import('@/views/charts/objectLine.vue'),
        meta: {
          title: 'objectLine',
          showLink: VITE_HIDE_HOME === 'true' ? false : true,
        },
      },
    ],
  },
  {
    path: '/components',
    component: Layout,
    redirect: '/components/base',
    meta: {
      icon: 'ep:home-filled',
      title: '常用组件',
    },
    children: [
      {
        path: '/components/base',
        name: 'components',
        component: () => import('@/views/components/base/index.vue'),
        meta: {
          title: '常用组件',
        },
      },
      {
        path: '/components/cropping',
        name: 'cropping',
        component: () => import('@/views/components/cropping/index.vue'),
        meta: {
          title: '图片裁剪',
        },
      },
      {
        path: '/components/dynamic-button',
        name: 'dynamicButton',
        component: () => import('@/views/components/dynamic-button/index.vue'),
        meta: {
          title: '动态按钮',
        },
      },
      {
        path: '/components/split-pane',
        name: 'SplitPane',
        component: () => import('@/views/components/split-pane.vue'),
        meta: {
          title: '切割面板',
        },
      },
      {
        path: '/components/timeline',
        name: 'Timeline',
        component: () => import('@/views/components/timeline.vue'),
        meta: {
          title: '时间轴',
        },
      },
    ],
  },
  {
    path: '/usually',
    component: Layout,
    redirect: '/usually/base',
    meta: {
      icon: 'ep:home-filled',
      title: '常用插件或方法',
    },
    children: [
      {
        path: '/usually/base',
        name: 'base',
        component: () => import('@/views/usually/base/index.vue'),
        meta: {
          title: '常用插件或方法',
        },
      },
      {
        path: '/usually/algorithm',
        name: 'algorithm',
        component: () => import('@/views/usually/algorithm/index.vue'),
        meta: {
          title: '算法',
        },
      },
      {
        path: '/usually/vue-office',
        name: 'vueOffice',
        meta: {
          title: '@vue-office插件',
        },
        children: [
          {
            path: '/usually/vue-office/pdf',
            name: 'vueOfficePdf',
            component: () => import('@/views/usually/vue-office/vue-office-pdf/index.vue'),
            meta: {
              title: 'pdf组件',
            },
          },
          {
            path: '/usually/vue-office/excel',
            name: 'vueOfficeExcel',
            component: () => import('@/views/usually/vue-office/vue-office-excel/index.vue'),
            meta: {
              title: 'excel组件',
            },
          },
        ],
      },
      {
        path: '/usually/vee-validate',
        name: 'VeeValidate',
        component: () => import('@/views/usually/vee-validate/index.vue'),
        meta: {
          title: 'vee-validate插件',
        },
      },
      {
        path: '/usually/pdfjs',
        name: 'Pdfjs',
        component: () => import('@/views/usually/pdf-js/index.vue'),
        meta: {
          title: 'pdf-js插件',
        },
      },
    ],
  },
  {
    path: '/vueuse',
    component: Layout,
    redirect: '/vueuse/home',
    meta: {
      icon: 'ep:home-filled',
    },
    children: [
      {
        path: '/vueuse/home',
        name: 'vueuse',
        component: () => import('@/views/vueuse/index.vue'),
        meta: {
          title: 'vueuse',
          showLink: VITE_HIDE_HOME === 'true' ? false : true,
        },
      },
    ],
  },
  {
    path: '/form',
    component: Layout,
    redirect: '/form/oForm',
    meta: {
      icon: 'ep:home-filled',
      title: 'form表单',
    },
    children: [
      {
        path: '/form/oForm',
        name: 'form',
        component: () => import('@/views/form/oForm.vue'),
        meta: {
          title: 'oForm表单',
          showLink: VITE_HIDE_HOME === 'true' ? false : true,
        },
      },
      {
        path: '/form/loopForm',
        name: 'loopForm',
        component: () => import('@/views/form/loopForm.vue'),
        meta: {
          title: '循环表单',
        },
      },
      {
        path: '/form/remoteForm',
        name: 'remoteForm',
        component: () => import('@/views/form/remoteForm.vue'),
        meta: {
          title: '接口请求表单',
        },
      },
    ],
  },
  {
    path: '/test',
    component: Layout,
    redirect: '/test/t1',
    meta: {
      icon: 'ep:home-filled',
      title: '测试页',
      rank: 0,
    },
    children: [
      {
        path: '/test/t1',
        name: 'T1',
        component: () => import('@/views/test/t1.vue'),
        meta: {
          title: '测试页1',
          showLink: VITE_HIDE_HOME === 'true' ? false : true,
        },
      },
    ],
  },
  {
    path: '/t2',
    component: Layout,
    redirect: '/test/t2',
    meta: {
      icon: 'ep:home-filled',
      title: '测试页',
      rank: 0,
    },
    children: [
      {
        path: '/test/t2',
        name: 'T2',
        component: () => import('@/views/test/t2.vue'),
        meta: {
          title: '测试页2',
          showLink: VITE_HIDE_HOME === 'true' ? false : true,
        },
      },
    ],
  },
  {
    path: '/t3',
    component: Layout,
    redirect: '/test/t3',
    meta: {
      icon: 'ep:home-filled',
      title: '测试页',
      rank: 0,
    },
    children: [
      {
        path: '/test/t3',
        name: 'T3',
        component: () => import('@/views/test/t3.vue'),
        meta: {
          title: '测试页3',
          showLink: VITE_HIDE_HOME === 'true' ? false : true,
        },
      },
      {
        path: '/baidu',
        name: 'http://www.baidu.com',
        meta: {
          title: '百度',
          roles: ['admin', 'common'],
        },
      },
    ],
  },
  {
    path: '/t4',
    component: Layout,
    redirect: '/test/t4',
    meta: {
      icon: 'ep:home-filled',
      title: '测试页',
      rank: 0,
    },
    children: [
      {
        path: '/test/t4',
        name: 'T4',
        component: () => import('@/views/test/t4.vue'),
        meta: {
          title: '测试页4',
          showLink: VITE_HIDE_HOME === 'true' ? false : true,
        },
      },
    ],
  },
  {
    path: '/t5',
    component: Layout,
    redirect: '/test/t5',
    meta: {
      icon: 'ep:home-filled',
      title: '测试页',
      rank: 0,
    },
    children: [
      {
        path: '/test/t5',
        name: 'T5',
        component: () => import('@/views/test/t5.vue'),
        meta: {
          title: '测试页5',
          showLink: VITE_HIDE_HOME === 'true' ? false : true,
        },
      },
    ],
  },
]
