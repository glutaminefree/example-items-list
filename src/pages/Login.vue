<template>
  <div class="login-form container">
    <form class="login-form__panel" @submit.prevent>
      <h1 class="title">Авторизация</h1>
      <div class="field">
        <label class="label has-text-left">E-mail</label>
        <div class="control">
          <input
            v-model="form.email"
            class="input"
            type="email"
            placeholder="mail@example.com"
          />
        </div>
      </div>
      <div class="field">
        <label class="label has-text-left">Пароль</label>
        <div class="control has-icons-right">
          <input
            v-model="form.password"
            class="input"
            type="password"
          />
        </div>
      </div>
      <div class="field">
        <div class="control">
          <button
            class="button is-link"
            @click.prevent="signIn"
          >Войти</button>
        </div>
      </div>
      <collapse-transition>
        <div
          class="notification is-danger"
          v-if="loginFailed"
        >
          Пользователь с таким E-mail и паролем не найден.
        </div>
      </collapse-transition>
    </form>
  </div>
</template>

<script>
import { CollapseTransition } from 'vue2-transitions';
import apiUser from '@/api/user';

export default {
  name: 'login',
  components: { CollapseTransition },
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      loginFailed: false,
    };
  },
  methods: {
    async signIn() {
      const okAuth = await apiUser.login(this.form);

      this.loginFailed = !okAuth;

      if (okAuth) {
        this.$router.push('/');
      }
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
