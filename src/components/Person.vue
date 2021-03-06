<template>
  <div class="person">
    <div class="person__box">
      <span class="person__avatar icon is-large">
        <i class="fas fa-3x fa-user-circle"></i>
      </span>
      <div class="person__data">
        <h2 class="person__name">
          <router-link
            class="person__name-link"
            :to="{name: 'edit-person', params: {id: data.id}}"
          >
            {{ fullName }}
          </router-link>
        </h2>
        <a class="person__email" :href="`mailto:${data.email}`">
          {{ data.email }}
        </a>
      </div>

      <div class="person__actions">
        <a
          class="person__action button is-warning"
          href="#"
          @click.prevent="openModal(data)"
        >Сменить пароль</a>
        <a
          class="person__action button is-danger"
          :class="{'is-loading': removingInProgress}"
          href="#"
          @click.prevent="removeUser(data.id)"
        >Удалить</a>
      </div>
    </div>

    <fade-transition>
      <div class="modal is-active" v-if="modalVisible">
        <div class="modal-background" @click="closeModal"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">
              Новый пароль для пользователя {{ fullName }}
            </p>
            <button
              class="delete"
              aria-label="close"
              @click="closeModal"
            ></button>
          </header>
          <section class="modal-card-body">
            <password-field v-model="newPassword" label="Задайте новый пароль" />
          </section>
          <footer class="modal-card-foot">
            <button
              class="button is-link"
              :class="{'is-loading': passwordUpdatingInProgress}"
              :disabled="newPassword.length === 0"
              @click="updateUserPassword"
            >
              Сохранить
            </button>
            <button class="button is-warning" @click="closeModal">
              Отменить
            </button>
          </footer>
        </div>
      </div>
    </fade-transition>

    <fade-transition>
      <div class="person__error-notify notification is-danger" v-if="errorNotifyVisible">
        <button class="delete" @click="errorNotifyVisible = false"></button>
        <span>{{ errorNotifyText }}</span>
      </div>
    </fade-transition>
  </div>
</template>

<script>
import { FadeTransition } from 'vue2-transitions';
import PasswordField from '@/components/PasswordField.vue';

const TRY_LATER = 'Попробуйте повторить позже или обратитесь в службу поддержки.';
const PERSON_REMOVING_ERROR = `Ошибка удаления пользователя. ${TRY_LATER}`;
const PASSWORD_UPDATING_ERROR = `Ошибка обновления пароля. ${TRY_LATER}`;

export default {
  name: 'Person',
  components: { FadeTransition, PasswordField },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      modalVisible: false,
      removingInProgress: false,
      newPassword: '',
      passwordUpdatingInProgress: false,
      errorNotifyText: '',
      errorNotifyVisible: false,
    };
  },
  computed: {
    fullName() {
      return `${this.data.firstname} ${this.data.lastname}`;
    },
  },
  methods: {
    goToEdit() {
      this.$router.push(`/edit-person/${this.data.id}`);
    },

    openModal() {
      this.modalVisible = true;
    },
    closeModal() {
      this.modalVisible = false;
      this.newPassword = '';
    },

    removeUser() {
      this.removingInProgress = true;

      this.$nextTick(() => {
        this.$store
          .dispatch('removeUser', this.data.id)
          .catch(() => {
            this.removingInProgress = false;
            this.errorNotifyText = PERSON_REMOVING_ERROR;
            this.errorNotifyVisible = true;
          });
      });
    },
    async updateUserPassword() {
      if (this.passwordUpdatingInProgress) {
        return false;
      }

      this.passwordUpdatingInProgress = true;

      const success = await this.$store.dispatch('updateUserData', {
        id: this.data.id,
        password: this.newPassword,
      });

      if (success) {
        this.passwordUpdatingInProgress = false;
        this.modalVisible = false;
      } else {
        this.errorNotifyText = PASSWORD_UPDATING_ERROR;
        this.errorNotifyVisible = true;
      }

      return true;
    },
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.person {
  &__box {
    display: flex;
    align-items: center;
  }
  &__avatar {
    margin-right: $margin;
    color: #e2e2e8;
  }
  &__name {
    &-link {
      border-bottom: 1px solid transparent;
      font-size: 20px;
      color: $color-link;
      transition: border-color $transition-duration;

      &:hover {
        border-color: $color-link;
      }
    }
  }
  &__email {
    border-bottom: 1px solid transparent;
    font-size: 16px;
    color: $color-text;
    transition: border-color $transition-duration;

    &:hover {
      border-color: $color-text;
    }
  }
  &__actions {
    display: flex;
    align-items: center;
    margin-left: auto;
  }
  &__action {
    &:not(:last-child) {
      margin-right: $margin-small;
    }
  }
  &__error-notify {
    position: fixed;
    bottom: 30px;
    right: 30px;
  }
}
</style>
