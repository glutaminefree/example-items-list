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
      console.log('Error in getItems', error);
    }
  },
  async addItem(data) {
    try {
      const result = await axios.post(`${this.apiBaseUrl}/api/user`, data);

      return { success: result.status === 200 };
    } catch (error) {
      if (error.status === 409) {
        return {
          success: false,
          error: 'Email already taken'
        };
      } else {
        console.log('Error in addItem', error);
        return { success: false };
      }
    }
  },
  async removeItem(id) {
    try {
      const result = await axios.delete(`${this.apiBaseUrl}/api/user/${id}`);

      return result.status === 200;
    } catch (error) {
      console.log('Error in removeItem', error);
    }
  },
  async getItem(id) {
    try {
      const result = await axios.get(`${this.apiBaseUrl}/api/user/${id}`);

      return result.status === 200 ? result.data : null;
    } catch (error) {
      console.log('Error in getItem', error);
    }
  },
  async updateItem(data) {
    try {
      const result = await axios.patch(`${this.apiBaseUrl}/api/user/${data.id}`, data);

      return result.status === 200 && result.data.result === 'success';
    } catch (error) {
      console.log('Error in updateItem', error);
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
      console.log('Error in login', error);
    }
  },
  logout() {
    cookies.remove(this.jwtCookieName)
  },
};
