<template>
  <nav
    v-if="pages > 1"
    class="persons-list__pagination pagination is-right"
    role="navigation"
    aria-label="pagination"
  >
    <a
      :disabled="prevPageDisabled"
      class="pagination-previous"
      @click="prevPage"
    >
      Назад
    </a>
    <a
      :disabled="nextPageDisabled"
      class="pagination-next"
      @click="nextPage"
    >
      Вперёд
    </a>
    <ul class="pagination-list">
      <li v-for="(page, i) in links" :key="`pl-${page}-${i}`">
        <a
          v-if="page !== '...'"
          class="pagination-link"
          :class="{'is-current': page === currentPage}"
          @click.prevent="goToPage(page)"
        >
          {{ page }}
        </a>
        <span v-else class="pagination-ellipsis">&hellip;</span>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    value: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    limit: {
      type: Number,
      default: 10,
    },
  },
  data() {
    return {
      currentPage: this.value,
    };
  },
  computed: {
    pages() {
      return Math.ceil(this.total / this.limit);
    },

    links() {
      const delta = 2;

      const left = this.currentPage - delta;
      const right = this.currentPage + delta + 1;

      const range = [];
      const rangeWithDots = [];

      for (let i = 1; i <= this.pages; i++) {
        if (i == 1 || i == this.pages || i >= left && i < right) {
          range.push(i);
        }
      }

      let prevNum;

      for (let num of range) {
        if (prevNum) {
          if (num - prevNum === 2) {
            rangeWithDots.push(prevNum + 1);
          } else if (num - prevNum !== 1) {
            rangeWithDots.push('...');
          }
        }

        rangeWithDots.push(num);

        prevNum = num;
      }

      return rangeWithDots;
    },

    prevPageDisabled() {
      return this.currentPage === 1;
    },
    nextPageDisabled() {
      return this.currentPage === this.pages;
    },
  },
  methods: {
    prevPage() {
      this.currentPage -= 1;
      this.emitUpdate();
    },
    nextPage() {
      this.currentPage += 1;
      this.emitUpdate();
    },
    goToPage(pageNum) {
      if (this.currentPage !== pageNum) {
        this.currentPage = pageNum;
        this.emitUpdate();
      }
    },

    emitUpdate() {
      this.$emit('input', this.currentPage);
    },
  },
};
</script>
