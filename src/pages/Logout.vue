<template>
  <button class="button is-primary is-loading">Logout</button>
</template>

<script>
export default {
  created() {
    this.logout();
  },
  methods: {
    logout() {
      this.$store.dispatch('setAuthJwt', null);
      this.$store.commit('setUserSigned', false);
      this.$router.push('/login');
    },
  },
};
</script>
