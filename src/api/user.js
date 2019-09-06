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
};
