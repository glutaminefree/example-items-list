<template>
  <div id="app">
    <nav
      v-if="$store.state.userSigned"
      class="navbar is-light"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="container flex">
        <div class="navbar-brand">
          <router-link class="navbar-item" to="/">
            <img src="./assets/logo.png" alt="" />
          </router-link>
        </div>

        <router-link class="navbar-item" to="/list">Список пользователей</router-link>
        <span class="navbar-separator">|</span>
        <router-link class="navbar-item" to="/new">Добавить пользователя</router-link>

        <div class="navbar-end">
          <router-link class="navbar-item" to="/logout">Выход</router-link>
        </div>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<style lang="scss" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.navbar {
  padding: 16px 0;

  &-separator {
    align-self: center;
    padding: 0 12px;
  }
}
</style>
