const { VITE_HIDE_HOME } = import.meta.env
const Layout = () => import('@/layout/index.vue')

export default {
  path: '/',
  name: 'Home',
  component: Layout,
  redirect: '/compsCollection',
  meta: {
    icon: 'ep:home-filled',
    title: '组件集合',
    rank: 0,
  },
  children: [
    {
      path: '/compsCollection',
      name: 'CompsCollection',
      component: () => import('@/views/compsCollection/index.vue'),
      meta: {
        title: '组件集合',
        showLink: VITE_HIDE_HOME === 'true' ? false : true,
      },
    },
  ],
} satisfies RouteConfigsTable
