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
    component: import('@/components/HelloWorld.vue')
  },
  {
    path: '/intersection',
    name: 'intersection',
    meta: {
      parent: 'Intersection',
      title: '图片懒加载',
    },
    component: import('@/views/intersection'),
  },
]

const router = createRouter({
  // 指定路由的模式,此处使用的是hash模式
  history: createWebHashHistory(),
  // 路由地址
  routes,
})

export default router;
