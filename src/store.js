import Vue from 'vue';
import Vuex from 'vuex';
import router from './router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userSigned: false,
    users: [],
  },
  mutations: {
    setUserSigned(state, flag) {
      state.userSigned = flag;
    },
    addNewUser(state, data) {
      state.users.push(data);
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
      jwt === null
        ? localStorage.removeItem('authJwt')
        : localStorage.setItem('authJwt', jwt);
    },

    addUser({ commit }, userData) {
      // TODO: save over API

      commit('addNewUser', userData);
    },
  },
});
