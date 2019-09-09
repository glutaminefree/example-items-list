import Vue from 'vue';
import Router from 'vue-router';
import store from './store';
import PersonsList from './pages/PersonsList.vue';

Vue.use(Router);

const routerInstance = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'persons-list',
      component: PersonsList,
    },
    {
      path: '/new-person',
      name: 'new-person',
      component: () => import(/* webpackChunkName: "new-person" */ './pages/NewPerson.vue'),
    },
    {
      path: '/edit-person/:id',
      name: 'edit-person',
      component: () => import(/* webpackChunkName: "edit-person" */ './pages/EditPerson.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './pages/Login.vue'),
    },
    {
      path: '/logout',
      name: 'logout',
      component: () => import(/* webpackChunkName: "logout" */ './pages/Logout.vue'),
    },
  ],
});

routerInstance.beforeEach(async (to, from, next) => {
  if (store.userSigned || to.name === 'login') {
    next();
  } else {
    const userLoged = await store.dispatch('validateUser');

    userLoged
      ? next()
      : next('/login');
  }
});

export default routerInstance;
