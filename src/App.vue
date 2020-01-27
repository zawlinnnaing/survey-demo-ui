<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootswatch/4.1.3/cyborg/bootstrap.min.css"
    />
    <link rel="stylesheet" href="/style/app.css" />
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="#">
        <img src="./assets/logo.png" width="150" height="50" />
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarColor02"
        aria-controls="navbarColor02"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarColor02">
        <ul
          class="navbar-nav mr-auto"
          v-for="(index, id) in navArray"
          :key="id"
        >
          <li class="nav-item ">
            <router-link :to="{ name: index.name }" class="nav-link">{{
              index.title
            }}</router-link>
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
import CreateForm from "./components/CreateForm";

export default {
  name: "app",
  components: {
    CreateForm
  },
  created: () => {},
  data: () => {
    return {
      navArray: [{ name: "CreateForm", title: "Create survey form" }]
    };
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}
body {
  background-color: #f5f5f5 !important;
}
</style>
