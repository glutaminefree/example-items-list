import cookies from 'js-cookie';
import axios from './axios';

export default {
  apiBaseUrl: process.env.VUE_APP_API_USER_URL,
  jwtCookieName: 'authJwt',

  async getItems() {
    try {
      const result = await axios.get(`${this.apiBaseUrl}/api/users`);

      return result.status === 200 ? result.data : [];
    } catch (error) {
      console.log('Error in getItems', error.message);
    }
  },
  async addItem(data) {
    try {
      const result = await axios.post(`${this.apiBaseUrl}/api/user`, data);

      return result.status === 200;
    } catch (error) {
      console.log('Error in addItem', error.message);
    }
  },
  async removeItem(id) {
    try {
      const result = await axios.delete(`${this.apiBaseUrl}/api/user/${id}`);

      return result.status === 200;
    } catch (error) {
      console.log('Error in removeItem', error.message);
    }
  },
  async getItem(id) {
    try {
      const result = await axios.get(`${this.apiBaseUrl}/api/user/${id}`);

      return result.status === 200 ? result.data : null;
    } catch (error) {
      console.log('Error in getItem', error.message);
    }
  },
  async updateItem(data) {
    try {
      const result = await axios.patch(`${this.apiBaseUrl}/api/user/${data.id}`, data);

      return result.status === 200 && result.data.result === 'success';
    } catch (error) {
      console.log('Error in updateItem', error.message);
    }
  },

  /**
   * login - send auth data to check
   *
   * @param  {type} data Object Fields for sending
   * @return {type}      Object Contain success flag
   */
  async login(data) {
    try {
      const result = await axios.post(`${this.apiBaseUrl}/api/login`, data);

      if (result.data.success && result.data.jwt) {
        cookies.set(this.jwtCookieName, result.data.jwt);
        return true;
      }

      return false;
    } catch (error) {
      console.log('Error in login', error.message);
    }
  },
  logout() {
    cookies.remove(this.jwtCookieName)
  },
};
