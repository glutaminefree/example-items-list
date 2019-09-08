<template>
  <div class="persons-list container">
    <h1 class="title is-1">Список пользователей</h1>

    <div class="persons-list__items">
      <collapse-transition group>
        <person
          v-for="person in users"
          :key="`user-${person.id}`"
          :data="person"
        />
      </collapse-transition>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { CollapseTransition } from 'vue2-transitions';
import Person from '@/components/Person.vue'

export default {
  name: 'PersonsList',
  components: { Person, CollapseTransition },
  computed: {
    ...mapState(['users']),
  },
  created() {
    this.$store.dispatch('getUsersList');
  },
};
</script>

<style lang="scss" scoped>
.persons-list {
  margin-top: 60px;
}
</style>
