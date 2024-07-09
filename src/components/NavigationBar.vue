<script>
import AuthService from "../services/authService";

export default {
  name: "NavigationBar",
  data() {
    return {
      userInfo: AuthService.getCurrentUser(),
    };
  },
  methods: {
    logout() {
      AuthService.logout();
      this.$router.push({ name: "user-login" });
    },
  },
};
</script>

<template>
  <nav>
    <ul>
      <li><router-link to="/profile">Profile</router-link></li>
      <li><router-link to="/beneficiaries">Beneficiaries</router-link></li>
      <li><button @click="logout">Logout</button></li>
      <li v-if="userInfo" class="userInfo">
        {{ userInfo.username }}
        <span>{{ userInfo.email }}</span>
      </li>
    </ul>
  </nav>
</template>
