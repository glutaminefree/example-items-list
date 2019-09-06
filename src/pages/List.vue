<template>
  <div class="list">
    list will be here
  </div>
</template>

<script>
export default {
  name: 'list',
  created() {
    this.$store.dispatch('getUsersList');
  },
};
</script>
