<script setup lang="ts">
import { RouterView } from "vue-router";
import Navbar from "./components/NavigationBar.vue";
</script>

<template>
  <Navbar />
  <RouterView />
</template>

<style>
@import "@/assets/css/base.css";
</style>
