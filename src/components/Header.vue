<template>
  <nav
    v-if="$store.state.userSigned"
    class="navbar"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="container flex">
      <div class="navbar-brand">
        <router-link class="navbar-item" to="/">
          <img src="../assets/logo.png" alt="" />
        </router-link>
        <router-link class="navbar-item is-title" to="/">
          <span>Items List Example</span>
        </router-link>
      </div>

      <router-link class="navbar-item" to="/">Список пользователей</router-link>
      <router-link class="navbar-item" to="/new-person">Добавить пользователя</router-link>

      <div class="navbar-end">
        <router-link class="navbar-item" to="/logout">Выход</router-link>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.navbar {
  padding: 16px 0;
  background-color: #010123;

  &-brand {
    margin-right: $margin-big;
  }
  &-item {
    padding: 0;
    color: #7a858f;

    & + #{&} {
      margin-left: $margin;

      &.is-title {
        margin-left: $margin-small;
        font-weight: bold;
      }
    }

    @at-root a#{&}:hover,
    &.router-link-active {
      background-color: transparent;
      color: #dfdfe3;
    }
  }
  &-separator {
    align-self: center;
    padding: 0 12px;
    color: #7a858f;
  }
}
</style>
