import axios from 'axios';

const apiBaseUrl = process.env.VUE_APP_API_USER_URL;

export default {
  async getItems() {
    const result = await axios.get(`${apiBaseUrl}/api/users`);

    return result.status === 200 ? result.data : [];
  },
  async addItem(data) {
    const result = await axios.post(`${apiBaseUrl}/api/user`, data);

    return result.status === 200;
  },

  /**
   * login - send auth data to check
   *
   * @param  {type} data Object Fields for sending
   * @return {type}      Object Contain success flag
   */
  async login(data) {
    const result = await axios.post(`${apiBaseUrl}/api/login`, data);

    if (result.data.success && result.data.jwt) {
      localStorage.setItem('authJwt', result.data.jwt);
      return true;
    }

    return false;
  },
  logout() {
    localStorage.removeItem('authJwt');
  },
};