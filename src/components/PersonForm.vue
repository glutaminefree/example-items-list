<template>
  <div class="person-form">
    <form
      class="person-form__panel"
      @input="mayBeValidate"
      @change="mayBeValidate"
      @submit.prevent
    >
      <h1 class="title" v-if="title.length > 0">{{ title }}</h1>
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
      <password-field
        v-model="form.password"
        :label="validationRules.password.name"
      />
      <div class="field">
        <div class="control">
          <button class="button is-link" @click.prevent="saveForm">Сохранить</button>
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
import PasswordField from '@/components/PasswordField.vue';

export default {
  name: 'PersonForm',
  components: { PasswordField },
  mixins: [mixinForm],
  props: {
    title: {
      type: String,
      default: '',
    },
    data: {
      type: Object,
      default: () => ({}),
    },
  },
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
    };
  },
  created() {
    this.mayBeSetData();
  },
  methods: {
    mayBeSetData() {
      if (this.data.id) {
        this.form = this.data;
      }
    },
    saveForm() {
      this.validate(() => this.$emit('save', this.form));
    },
  },
};
</script>

<style lang="scss" scoped>
.person-form {
  padding-top: 40px;

  &__panel {
    width: 480px;
    margin: 0 auto;
    padding: 30px 15px;
    background: white;
    box-shadow: 3px 3px 5px gray;
  }
}
</style>
