import Vue from 'vue';
import Router from 'vue-router';
import store from './store';
import List from './pages/List.vue';

Vue.use(Router);

const routerInstance = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'list',
      component: List,
    },
    {
      path: '/new',
      name: 'new',
      component: () => import(/* webpackChunkName: "new" */ './pages/New.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './pages/Login.vue'),
    },
  ],
});

routerInstance.beforeEach((to, from, next) => {
  store.userSigned || to.name === 'login'
    ? next()
    : store.dispatch('validateUser').then(next);
});

export default routerInstance;
