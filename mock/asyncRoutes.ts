// 模拟后端动态生成路由
import { defineFakeRoute } from 'vite-plugin-fake-server/client'

/**
 * roles：页面级别权限，这里模拟二种 "admin"、"common"
 * admin：管理员角色
 * common：普通角色
 */
const permissionRouter = [
  {
    path: '/permission',
    meta: {
      title: '权限管理',
      icon: 'ep:lollipop',
      rank: 10,
    },
    children: [
      {
        path: '/permission/page/index2',
        name: 'PermissionPage2',
        meta: {
          title: '页面权限2',
          roles: ['admin', 'common'],
        },
      },
      {
        path: '/permission/page/index',
        name: 'PermissionPage',
        meta: {
          title: '页面权限',
          roles: ['admin', 'common'],
        },
      },

      {
        path: '/permission/button/index',
        name: 'PermissionButton',
        meta: {
          title: '按钮权限',
          roles: ['admin', 'common'],
          auths: ['permission:btn:add', 'permission:btn:edit', 'permission:btn:delete'],
        },
      },
      {
        path: '/permission/button/index2',
        name: 'PermissionButton2',
        meta: {
          title: '按钮权限2',
          roles: ['admin', 'common'],
          auths: ['permission:btn:add', 'permission:btn:edit', 'permission:btn:delete'],
        },
      },
    ],
  },
  {
    path: '/p2',
    meta: {
      title: '权限管理2',
      icon: 'ep:lollipop',
      rank: 11,
    },
    children: [
      {
        path: '/p2/page/index3',
        name: 'Page1',
        meta: {
          title: '页面权限333',
          roles: ['admin', 'common'],
        },
      },
      {
        path: '/p2/button/index4',
        name: 'Page2',
        meta: {
          title: '页面权限444',
          roles: ['admin', 'common'],
        },
      },
    ],
  },
]

export default defineFakeRoute([
  {
    url: '/get-async-routes',
    method: 'get',
    response: () => {
      return {
        success: true,
        data: permissionRouter,
      }
    },
  },
])
