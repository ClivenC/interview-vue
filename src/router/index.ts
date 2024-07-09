import { createRouter, createWebHistory } from "vue-router";
import UserLogin from "@/views/UserLogin.vue";
import UserProfile from "@/views/UserProfile.vue";
import ShowBeneficiaries from "@/views/ShowBeneficiaries.vue";
import AuthService from "@/services/authService";

const routes = [
  {
    path: "/",
    redirect: () => {
      const user = AuthService.getCurrentUser();
      return user ? { name: "user-beneficiaries" } : { name: "user-login" };
    },
  },
  {
    path: "/login",
    name: "user-login",
    component: UserLogin,
  },
  {
    path: "/profile",
    name: "user-profile",
    component: UserProfile,
    meta: { requiresAuth: true },
  },
  {
    path: "/beneficiaries",
    name: "user-beneficiaries",
    component: ShowBeneficiaries,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const user = AuthService.getCurrentUser();
  if (to.matched.some((record) => record.meta.requiresAuth) && !user) {
    next({ name: "user-login" });
  } else {
    next();
  }
});

export default router;
