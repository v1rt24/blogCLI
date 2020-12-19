import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home'),
  },
  {
    path: '/ad/:id',
    name: 'Ad',
    component: () => import(/* webpackChunkName: "ad" */ '../views/Ad'),
  },
  {
    path: '/list',
    name: 'List',
    component: () => import(/* webpackChunkName: "list" */ '../views/AdList'),
  },
  {
    path: '/new',
    name: 'New',
    component: () => import(/* webpackChunkName: "new" */ '../views/NewAdd'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login'),
  },
  {
    path: '/registration',
    name: 'Registration',
    component: () => import(/* webpackChunkName: "registration" */ '../views/Registration'),
  },
  {
    path: '/orders',
    name: 'Orders',
    component: () => import(/* webpackChunkName: "orders" */ '../views/Orders'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
