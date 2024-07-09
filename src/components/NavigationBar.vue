<script>
import AuthService from "../services/authService";

export default {
  name: "NavigationBar",
  methods: {
    logout() {
      AuthService.logout();
      this.$router.push({ name: "user-login" });
    },
  },
};
</script>

<template>
  <nav class="visually-hidden">
    <ul>
      <li><router-link to="/profile">Profile</router-link></li>
      <li><router-link to="/beneficiaries">Beneficiaries</router-link></li>
      <li><button @click="logout">Logout</button></li>
    </ul>
  </nav>
</template>
