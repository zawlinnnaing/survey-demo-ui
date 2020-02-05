<template>
  <div class="wrapper fadeInDown">
    <link rel="stylesheet" href="/style/login.css" />
    <!-- <link rel="preload" href="/style/login.css" /> -->
    <div id="formContent">
      <!-- Tabs Titles -->

      <!-- Icon -->
      <div class="fadeIn first">
        <img src="./../assets/logo.png" id="icon" alt="Expa Icon" />
      </div>

      <!-- Login Form -->
      <form @submit.prevent="login">
        <input
          type="text"
          id="login"
          v-model="email"
          required
          class="fadeIn second"
          name="login"
          placeholder="Email"
        />
        <input
          type="password"
          id="password"
          class="fadeIn third"
          required
          v-model="password"
          name="login"
          placeholder="password"
        />
        <input type="submit" class="fadeIn fourth" value="Log In" />
      </form>

      <!-- Remind Passowrd -->
      <div id="formFooter">
        <!-- <a class="underlineHover" href="#">Forgot Password?</a> -->
        <router-link class="underlineHover" :to="{ name: 'Register' }"
          >Register</router-link
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
/* @import "../assets/style/login.css"; */
</style>

<script>
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    async login() {
      let payload = {
        email: this.email,
        password: this.password
      };
      try {
        await this.$store.dispatch("loginUser", payload);
        this.$router.push({ name: "Home" });
      } catch (e) {
        alert("Login Failed ");
        console.error(e);
        return;
      }
    }
  }
};
</script>
