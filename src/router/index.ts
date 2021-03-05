import {createRouter, createWebHashHistory} from 'vue-router';
import 'vue-router';

export const routes = [
  {
    path: '/',
    name: 'index',
    meta: {
      parent: '简介',
      title: 'Index',
    },
    component: () => import('@/components/HelloWorld.vue')
  },
  {
    path: '/lazy-image',
    name: 'lazyImage',
    meta: {
      parent: 'Intersection',
      title: '图片懒加载',
    },
    component: () => import('@/views/intersection/lazy-image'),
  },
  {
    path: '/scroll-list',
    name: 'scrollList',
    meta: {
      title: '无限滚动',
    },
    component: () => import('@/views/intersection/scroll-list'),
  },
  {
    path: '/transition',
    name: 'transition',
    meta: {
      title: '动画加载',
    },
    component: () => import('@/views/intersection/transition'),
  },
  // {
  //   path: '/virtual-list',
  //   name: 'virtualList',
  //   meta: {
  //     title: '虚拟列表',
  //   },
  //   component: () => import('@/views/intersection/virtual-list'),
  // },
  // {
  //   path: '/virtual-list',
  //   name: 'virtualList',
  //   meta: {
  //     title: '页内导航',
  //   },
  //   component: () => import('@/views/intersection/active-tab'),
  // },
  {
    path: '/data-attribute',
    name: 'dataAttribute',
    meta: {
      parent: 'data- Attributes',
      title: 'data- Attributes',
    },
    component: () => import('@/views/data-attribute/index.vue'),
  },
  {
    path: '/css-flex',
    name: 'cssFlex',
    meta: {
      parent: 'CSS',
      title: 'Flex - 动画',
    },
    component: () => import('@/views/css-pages/flex-items.vue'),
  },
]

const router = createRouter({
  // 指定路由的模式,此处使用的是hash模式
  history: createWebHashHistory(),
  // 路由地址
  routes,
})

export default router;
