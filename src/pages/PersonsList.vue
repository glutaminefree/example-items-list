<template>
  <div class="persons-list container">
    <h1 class="title is-1">Список пользователей</h1>

    <div class="persons-list__items">
      <collapse-transition group>
        <person
          v-for="person in usersList"
          :key="`user-${person.id}`"
          :data="person"
          class="persons-list__item"
        />
      </collapse-transition>
    </div>

    <pagination
      class="persons-list__pagination"
      v-model="currentPage"
      :total="users.length"
      :limit="pageLimit"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { CollapseTransition } from 'vue2-transitions';
import cloneDeep from 'lodash.clonedeep';
import Person from '@/components/Person.vue'
import Pagination from '@/components/Pagination.vue';

const PAGE_LIMIT = 10;

export default {
  name: 'PersonsList',
  components: {
    Person,
    Pagination,
    CollapseTransition,
  },
  data() {
    return {
      currentPage: 1,
      pageLimit: PAGE_LIMIT,
    };
  },
  computed: {
    ...mapState(['users']),

    usersList() {
      const from = this.currentPage * this.pageLimit - this.pageLimit;
      const fullList = cloneDeep(this.users);

      return fullList.splice(from, this.pageLimit);
    },
  },
  created() {
    this.getUsersList();
  },
  methods: {
    getUsersList() {
      this.$store.dispatch('getUsersList');
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.persons-list {
  margin-top: 60px;

  &__item {
    padding: 20px 0;

    &:not(:first-child) {
      border-top: 1px solid $color-border-light;
    }
  }
  &__pagination {
    margin: $margin-big 0;
  }
}
</style>
