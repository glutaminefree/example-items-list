<template>
  <div class="login-form container">
    <form
      class="login-form__panel"
      @input="mayBeValidate"
      @change="mayBeValidate"
      @submit.prevent
    >
      <h1 class="title">Новый пользователь</h1>
      <div class="field">
        <label class="label">{{ validationRules.firstname.name }}</label>
        <div class="control">
          <input
            v-model="form.firstname"
            class="input"
            type="text"
            placeholder="Иван"
          />
        </div>
      </div>
      <div class="field">
        <label class="label">{{ validationRules.lastname.name }}</label>
        <div class="control">
          <input
            v-model="form.lastname"
            class="input"
            type="text"
            placeholder="Иванов"
          />
        </div>
      </div>
      <div class="field">
        <label class="label">{{ validationRules.middlename.name }}</label>
        <div class="control">
          <input
            v-model="form.middlename"
            class="input"
            type="text"
            placeholder="Иванович"
          />
        </div>
      </div>
      <div class="field">
        <label class="label">{{ validationRules.email.name }}</label>
        <div class="control">
          <input
            v-model="form.email"
            class="input"
            type="text"
            placeholder="mail@example.com"
          />
        </div>
      </div>
      <div class="field">
        <label class="label">{{ validationRules.birthday.name }}</label>
        <div class="control">
          <input
            v-model="form.birthday"
            class="input"
            type="date"
            placeholder="20.05.2000"
          />
        </div>
      </div>
      <div class="field">
        <label class="label">{{ validationRules.password.name }}</label>
        <div class="control has-icons-right">
          <input
            v-model="form.password"
            class="input"
            :type="passwordVisible ? 'text': 'password'"
          />
          <a
            class="login-form__password-switcher icon is-small is-right"
            href="#"
            @click.prevent="passwordVisible = !passwordVisible"
          >
            <i class="fas" :class="[passwordVisible ? 'fa-eye-slash' : 'fa-eye']"></i>
          </a>
        </div>
      </div>
      <div class="field">
        <div class="control">
          <button class="button is-link" @click.prevent="addNewPerson">Сохранить</button>
        </div>
      </div>
      <div class="notification is-danger" v-if="showFormErrors">
        <p
          v-for="(errorMessage, errorField) in formErrors"
          :key="`error-${errorField}`"
        >
          {{ errorMessage }}
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import mixinForm from '@/mixins/form';

export default {
  name: 'NewPerson',
  mixins: [mixinForm],
  data() {
    return {
      form: {
        firstname: '',
        lastname: '',
        middlename: '',
        birthday: '',
        email: '',
        password: '',
      },
      validationRules: {
        firstname: {
          type: 'string',
          required: true,
          name: 'Имя',
        },
        lastname: {
          type: 'string',
          required: true,
          name: 'Фамилия',
        },
        middlename: {
          type: 'string',
          required: true,
          name: 'Отчество',
        },
        birthday: {
          type: 'string',
          required: true,
          pattern: /\d{4}-\d{2}-\d{2}/,
          name: 'Дата рождения',
        },
        email: {
          type: 'email',
          required: true,
          name: 'E-mail',
        },
        password: {
          type: 'string',
          required: true,
          name: 'Пароль',
        },
      },

      passwordVisible: false,
    };
  },
  methods: {
    async addNewPerson() {
      this.validate(async () => {
        await this.$store.dispatch('addUser', this.form);
        this.$router.push('/');
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.login-form {
  padding-top: 40px;

  &__panel {
    width: 480px;
    margin: 0 auto;
    padding: 30px 15px;
    background: white;
    box-shadow: 3px 3px 5px gray;
  }
  &__password-switcher {
    pointer-events: visible;
  }
}
</style>
