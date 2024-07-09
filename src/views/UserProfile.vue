<script>
import AuthService from "../services/authService";

export default {
  name: "UserProfile",
  data() {
    return {
      userInfo: AuthService.getCurrentUser(),
    };
  },
  methods: {
    logout() {
      AuthService.logout();
      this.$router.push({ name: "login-page" });
    },
  },
};
</script>

<template>
  <div>
    <h1>Profile</h1>
    <p>Welcome, {{ userInfo.username }}!</p>
    <p>Your email: {{ userInfo.email }}</p>
    <button @click="logout">Logout</button>
  </div>
</template>
