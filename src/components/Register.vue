<template>
  <div class="wrapper fadeInDown">
    <div id="formContent">
      <!-- Tabs Titles -->
      <link rel="stylesheet" href="/style/login.css" />

      <!-- Icon -->
      <div class="fadeIn first">
        <img src="./../assets/logo.png" id="icon" alt="Expa Icon" />
      </div>

      <!-- Login Form -->
      <form @submit.prevent="register">
        <input
          type="text"
          id="name"
          required
          class="fadeIn second"
          name="name"
          placeholder="Name"
          v-model="name"
        />
        <p class="helper-text">Eg. Jane Doe</p>
        <input
          type="text"
          id="email"
          required
          class="fadeIn second"
          name="Email"
          placeholder="Email"
          v-model="email"
        />
        <p class="helper-text">Eg. janedoe@example.com</p>
        <input
          type="password"
          id="password"
          required
          class="fadeIn third"
          name="passowrd"
          placeholder="Password"
          v-model="password"
        />
        <p class="helper-text">Minimum 8 charactors</p>
        <input
          type="password"
          required
          id="confirm-password"
          class="fadeIn third"
          name="confirm-passowrd"
          v-model="confirmPassword"
          placeholder="Confirm password"
        />
        <input type="submit" class="fadeIn fourth" value="Register" />
      </form>

      <!-- Remind Passowrd -->
      <div id="formFooter">
        <!-- <a class="underlineHover" href="#">Forgot Password?</a> -->
        <router-link class="underlineHover" :to="{ name: 'Login' }"
          >Log In</router-link
        >
      </div>
    </div>
  </div>
</template>

<style scoped></style>

<script>
import { createNamespacedHelpers } from "vuex";
export default {
  data() {
    return {
      confirmPassword: "",
      email: "",
      name: "",
      password: ""
    };
  },
  created() {},
  methods: {
    async register() {
      if (this.confirmPassword !== this.password) {
        alert("Password not equal. ");
        return;
      }
      let data = {
        email: this.email,
        name: this.name,
        password: this.password
      };
      try {
        await this.$store.dispatch("auth/registerUser", data);
      } catch (e) {
        alert("Registration failed");
        console.error(e);
        return;
      }
    }
  }
};
</script>
