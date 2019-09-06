import Vue from 'vue';
import Vuex from 'vuex';
import router from './router';
import apiUser from './api/user';

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
    setUsersList(state, data) {
      state.users = data;
    },
  },
  actions: {
    async validateUser({ commit }) {
      const jwt = localStorage.getItem('authJwt');

      if (jwt === null && router.currentRoute.path !== '/login') {
        router.push('/login');
        return false;
      } else {
        // TODO: add jwt verification

        commit('setUserSigned', true);
        return true;
      }
    },
    setAuthJwt(a, jwt) {
      jwt === null
        ? localStorage.removeItem('authJwt')
        : localStorage.setItem('authJwt', jwt);
    },

    async addUser({ commit }, userData) {
      const saveResult = await apiUser.addItem(userData);

      if (saveResult.status === 200) {
        commit('addNewUser', userData);
      }
    },
    async getUsersList({ commit }) {
      const users = await apiUser.getItems();
      commit('setUsersList', users && users.data);
    },
  },
});
