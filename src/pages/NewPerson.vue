<template>
  <div class="new-person container">
    <person-form
      title="Новый пользователь"
      @save="addNewPerson"
    />

    <fade-transition>
      <div class="new-person__error notification is-danger" v-if="errorNotifyVisible">
        <button class="delete" @click="errorNotifyVisible = false"></button>
        <span>{{ errorNotifyText }}</span>
      </div>
    </fade-transition>
  </div>
</template>

<script>
import { FadeTransition } from 'vue2-transitions';
import PersonForm from '@/components/PersonForm.vue';

export default {
  name: 'NewPerson',
  components: { PersonForm, FadeTransition },
  data() {
    return {
      errorNotifyText: '',
      errorNotifyVisible: false,
    };
  },
  methods: {
    async addNewPerson(formData) {
      const result = await this.$store.dispatch('addUser', formData);

      if (result.success) {
        this.$router.push('/');
      } else if (result.error && result.error === 'Email already taken') {
        this.errorNotifyText = 'Пользователь с таким email уже существует';
        this.errorNotifyVisible = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.new-person {
  &__error {
    position: fixed;
    right: 30px;
    bottom: 30px;
  }
}
</style>
