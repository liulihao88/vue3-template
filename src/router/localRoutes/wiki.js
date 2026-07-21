const Layout = () => import('@/layout/index.vue')

export default [
  {
    path: '/wiki',
    component: Layout,
    redirect: '/wiki/home',
    meta: { title: '知识库', icon: 'ep:collection', rank: 2 },
    children: [
      {
        path: '/wiki/home',
        name: 'WikiHome',
        component: () => import('@/views/wiki/index.vue'),
        meta: { title: '团队知识库', showLink: true },
      },
    ],
  },
]
