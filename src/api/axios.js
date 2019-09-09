import axios from 'axios';
import router from '@/router';
import store from '@/store';

const axiosInstance = axios.create({
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  response => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      store.commit('setUserSigned', false);
      router.push('/login');
    }

    return Promise.reject(error.response);
  },
);

export default axiosInstance;
