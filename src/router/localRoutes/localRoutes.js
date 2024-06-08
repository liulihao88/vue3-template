const { VITE_HIDE_HOME } = import.meta.env
const Layout = () => import('@/layout/index.vue')

export default [
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
