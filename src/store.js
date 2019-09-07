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
    removeUser(state, userId) {
      state.users = state.users.filter(u => u.id !== userId);
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

    async addUser({ commit }, userData) {
      const result = await apiUser.addItem(userData);

      if (result) {
        commit('addNewUser', userData);
      }
    },
    async removeUser({ commit }, userId) {
      const result = await apiUser.removeItem(userId);

      if (result) {
        commit('removeUser', userId);
      }
    },
    async getUsersList({ commit }) {
      const users = await apiUser.getItems();
      commit('setUsersList', users && users.data);
    },
  },
});
