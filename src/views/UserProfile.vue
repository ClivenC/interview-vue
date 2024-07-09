<script>
import AuthService from "../services/authService";

export default {
  name: "UserProfile",
  components: {
  },
  data() {
    return {
      user: AuthService.getCurrentUser(),
    };
  },
  methods: {
    logout() {
      AuthService.logout();
      this.$router.push({ name: "user-profile" });
    },
  },
};
</script>

<template>
  <div>
    <h1>Profile</h1>
    <p>Welcome, {{ user.username }}!</p>
    <button @click="logout">Logout</button>
  </div>
</template>
