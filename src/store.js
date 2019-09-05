import Vue from 'vue';
import Vuex from 'vuex';
import router from './router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userSigned: false,
  },
  mutations: {
    setUserSigned(state, flag) {
      state.userSigned = flag;
    },
  },
  actions: {
    async validateUser({ commit }) {
      const jwt = localStorage.getItem('authJwt');

      if (jwt === null && router.currentRoute.path !== '/login') {
        router.push('/login');
        return false;
      } else {
        commit('setUserSigned', true);
        return true;
      }
    },
    setAuthJwt(a, jwt) {
      localStorage.setItem('authJwt', jwt);
    },
  },
});
