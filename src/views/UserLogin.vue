<script>
import AuthService from "../services/authService";

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      AuthService.login({ username: this.username, password: this.password })
        .then(() => {
          this.$router.push({ name: "user-beneficiaries" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<template>
  <div class="login">
    <h1>Connectez vous à Reconnect</h1>
    <form class="form-login" @submit.prevent="login">
      <label for="username">Identifiant: </label>
      <input type="text" v-model="username" />
      <label for="password">Mot de passe: </label>
      <input type="password" v-model="password" />
      <button type="submit">Login</button>
    </form>
  </div>
</template>
<style src="@/assets/css/login.css"></style>
