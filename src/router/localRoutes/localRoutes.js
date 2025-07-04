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
        name: 'base',
        component: () => import('@/views/charts/base.vue'),
        meta: {
          title: 'echarts-基础图',
          showLink: VITE_HIDE_HOME === 'true' ? false : true,
        },
      },
      {
        path: '/charts/pie',
        name: 'pie',
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
        name: 'objectLine',
        component: () => import('@/views/charts/objectLine.vue'),
        meta: {
          title: 'objectLine',
          showLink: VITE_HIDE_HOME === 'true' ? false : true,
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
