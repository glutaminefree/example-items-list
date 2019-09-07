<template>
  <button class="button is-primary is-loading">Logout</button>
</template>

<script>
import apiUser from '@/api/user';

export default {
  created() {
    this.logout();
  },
  methods: {
    logout() {
      apiUser.logout();
      this.$store.commit('setUserSigned', false);
      this.$router.push('/login');
    },
  },
};
</script>
