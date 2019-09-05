<template>
  <div class="login-form container">
    <div class="login-form__panel">
      <h1 class="title">Новый пользователь</h1>
      <div class="field">
        <label class="label has-text-left">Имя</label>
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
        <label class="label has-text-left">Фамилия</label>
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
        <label class="label has-text-left">Отчество</label>
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
        <label class="label has-text-left">E-mail</label>
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
        <label class="label has-text-left">Дата рождения</label>
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
        <label class="label has-text-left">Пароль</label>
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
          <button class="button is-link">Сохранить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'new',
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

      passwordVisible: false,
    };
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
