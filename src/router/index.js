import Vue from 'vue';
import VueRouter from 'vue-router';

//安装路由插件
Vue.use(VueRouter);

const routes = [
  {
    path: '',
    redirect: '/home',
  },
  {
    path: '/home',
    component: () => import('../views/home/Home'),
  },
  {
    path: '/category',
    component: () => import('../views/category/Category'),
  },
  {
    path: '/shopcart',
    component: () => import('../views/shopcart/ShopCart'),
  },
  {
    path: '/profile',
    component: () => import('../views/profile/Profile'),
  },
  {
    path: '/detail/:iid',
    component: () => import('../views/detail/Detail'),
  }
]

const router = new VueRouter({
  //地址栏不显示hash值，即没有'#'
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
