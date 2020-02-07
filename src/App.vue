<template>
  <div id="app">
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
    />
    <link rel="stylesheet" href="/style/app.css" />
    <nav class="navbar navbar-expand-lg navbar-light">
      <router-link class="navbar-brand" :to="{}">
        <img src="./assets/logo.png" width="150" height="50" />
      </router-link>
      <div class="collapse navbar-collapse" id="navbarColor02">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item " v-for="(index, id) in navArray" :key="id">
            <router-link :to="{ name: index.name }" class="nav-link">{{
              index.title
            }}</router-link>
          </li>
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link
              class="nav-link"
              v-if="!loggedIn"
              :to="{ name: 'Login' }"
              >Login</router-link
            >
          </li>
          <!-- <li class="nav-item">
            <router-link
              class="nav-link"
              v-if="!loggedIn"
              :to="{ name: 'Register' }"
              >Register</router-link
            >
          </li> -->
          <li class="nav-item" v-if="loggedIn">
            <p class="nav-link">{{ adminName }}</p>
          </li>
          <li class="nav-item" v-if="loggedIn">
            <a class="nav-link" @click="logoutAdmin">Logout</a>
          </li>
        </ul>
      </div>
    </nav>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  computed: {
    loggedIn() {
      return this.$store.state.auth.loggedIn;
    },
    adminName() {
      return this.$store.state.auth.name;
    }
  },
  components: {},
  created: () => {},
  data: () => {
    return {
      navArray: [
        { name: "CreateForm", title: "Create survey form" },
        { name: "Forms", title: "Forms" }
      ]
    };
  },
  methods: {
    async logoutAdmin() {
      try {
        await this.$store.dispatch("auth/logoutUser");
        alert("Logout suceessfully.");
        this.$router.push({ name: "Login" });
      } catch (e) {
        alert(e);
        console.error(e);
        return;
      }
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
nav {
  position: sticky !important;
  top: 0;
  z-index: 100;
  background-color: #e3f2fd;
  box-shadow: 4px 2px 4px #757575;
}
body {
  background-color: #f5f5f5 !important;
}
</style>
