<template>
  <div class="new-person container">
    <person-form
      v-if="user.id"
      :data="user"
      :title="formTitle"
      @save="updatePerson"
    />
    <progress
      v-else
      class="progress is-small is-primary"
      max="100"
    ></progress>
  </div>
</template>

<script>
import PersonForm from '@/components/PersonForm.vue';

export default {
  name: 'EditPerson',
  components: { PersonForm },
  data() {
    return {
      user: {},
    };
  },
  computed: {
    formTitle() {
      const userFullName = '';
      return `Редактирование пользователя ${userFullName}`;
    },
  },
  created() {
    this.mayBeGetPersonData();
  },
  methods: {
    async mayBeGetPersonData() {
      if (!this.$route.params.id) {
        throw new Error ('Invalid user id');
      }

      this.user = await this.$store.dispatch('getUserData', this.$route.params.id);
    },
    async updatePerson(formData) {
      const success = await this.$store.dispatch('updateUserData', {
        id: this.user.id,
        ...formData,
      });

      if (success) {
        this.$router.push('/');
      }
    },
  },
};
</script>
