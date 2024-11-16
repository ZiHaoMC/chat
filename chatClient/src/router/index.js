import Vue from 'vue'
import Router from 'vue-router'
import store from './../store'
import Layout from '@/views/layout/Index.vue'; // 静态导入 Layout

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/chat', // 默认跳转到 chat 页面
      meta: {
        requiresAuth: true // 需要登录权限
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import("@/views/Login"), // 动态导入 Login 组件
      meta: {
        deepth: 0.5 // 页面层级
      }
    },
    {
      path: '/chat',
      name: 'Layout',
      component: Layout, // 静态导入 Layout 组件
      redirect: '/chat/home',
      meta: {
        requiresAuth: true, // 需要登录权限
        keepAlive: true // 页面需要缓存
      },
      children: [
        {
          path: 'home',
          name: 'Home',
          component: () => import('@/views/Index'), // 动态导入 Home 组件
          meta: {
            requiresAuth: true, // 需要登录权限
            keepAlive: true, // 页面需要缓存
            deepth: 1 // 页面层级
          },
        },
        {
          path: 'user/:id',
          name: 'UserDetails',
          component: () => import('@/views/UserDetails'), // 动态导入 UserDetails 组件
          meta: {
            requiresAuth: true // 需要登录权限
          },
        },
        {
          path: 'add',
          name: 'Add',
          component: () => import('@/views/Add'), // 动态导入 Add 组件
          meta: {
            requiresAuth: true // 需要登录权限
          },
        },
        {
          path: 'setting',
          name: 'Setting',
          component: () => import('@/views/Setting'), // 动态导入 Setting 组件
          meta: {
            requiresAuth: true // 需要登录权限
          },
        },
        {
          path: 'system',
          name: 'System',
          component: () => import('@/views/SystemNews'), // 动态导入 SystemNews 组件
          meta: {
            requiresAuth: true // 需要登录权限
          },
        },
        {
          path: 'mzone',
          name: 'MZone',
          component: () => import('@/views/MZone/index'), // 动态导入 MZone 组件
          meta: {
            requiresAuth: true // 需要登录权限
          },
        },
        {
          path: 'editor',
          name: 'Editor',
          component: () => import('@/views/MZone/editorBlog'), // 动态导入 editorBlog 组件
          meta: {
            requiresAuth: true // 需要登录权限
          },
        },
        {
          path: 'schedule',
          name: 'Schedule',
          component: () => import('@/views/Schedule'), // 动态导入 Schedule 组件
          meta: {
            requiresAuth: true // 需要登录权限
          },
        },
        {
          path: 'blog/:id',
          name: 'BlogInfo',
          component: () => import('@/views/BlogInfo'), // 动态导入 BlogInfo 组件
          meta: {
            requiresAuth: true // 需要登录权限
          }
        }
      ]
    },
    {
      path: '*',
      name: 'NotFound',
      component: () => import('@/views/404') // 动态导入 404 组件
    }
  ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  /**tips:需要在钩子函数内读取登录状态 */
  const userIsLogin = store.state.user.isLogin
  if (to.meta.requiresAuth) { // 判断目标页面是否需要登录权限
    if (userIsLogin) {
      next() // 如果已登录，直接进入目标页面
    } else {
      // alert('请先登录再进行此操作!')
      next({
        path: '/login', // 跳转到登录页面
        /** 将刚刚要去的路由path（却无权限）作为参数，方便登录成功后直接跳转到该路由 */
        query: { redirect: to.fullPath }
      })
    } 
  } else {
    next() // 如果不需要权限，直接进入页面
  }
})

export default router
