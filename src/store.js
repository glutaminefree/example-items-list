import Vue from 'vue';
import Vuex from 'vuex';
import cookie from 'js-cookie';
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
    updateUserData(state, data) {
      state.users.some((user, i, allUsers) => {
        if (user.id === data.userId) {
          Object.assign(allUsers[i], data.userData);
          return true;
        }
      });
    },
  },
  actions: {
    validateUser({ commit }) {
      const jwt = cookie.get(apiUser.jwtCookieName);

      if (jwt === undefined && router.currentRoute.path !== '/login') {
        return false;
      } else {
        commit('setUserSigned', true);
        return true;
      }
    },

    async addUser({ commit }, userData) {
      const result = await apiUser.addItem(userData);

      if (result.success) {
        commit('addNewUser', userData);
      }

      return result;
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
    async getUserData({ commit }, userId) {
      const userData = await apiUser.getItem(userId);
      commit('updateUserData', { userId, userData });

      return userData;
    },
    async updateUserData({ commit }, userData) {
      const result = await apiUser.updateItem(userData);

      if (result) {
        commit('updateUserData', {
          userId: userData.id,
          userData,
        });
        return true;
      }

      return false;
    },
  },
});
