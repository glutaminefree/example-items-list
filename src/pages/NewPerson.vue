<template>
  <div class="new-person container">
    <person-form
      title="Новый пользователь"
      @save="addNewPerson"
    />
  </div>
</template>

<script>
import PersonForm from '@/components/PersonForm.vue';

export default {
  name: 'NewPerson',
  components: { PersonForm },
  methods: {
    async addNewPerson(formData) {
      await this.$store.dispatch('addUser', formData);
      this.$router.push('/');
    },
  },
};
</script>
