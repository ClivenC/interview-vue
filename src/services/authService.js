import axios from "axios";
import router from "@/router";

const API_URL = "http://127.0.0.1:8000";

class AuthService {
  constructor() {
    this.service = axios.create();
    this.service.interceptors.request.use(
      (config) => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && user.access) {
          config.headers["Authorization"] = `Bearer ${user.access}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    this.service.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response.status === 401) {
          console.error("Erreur 401, tentative de rafraîchissement du token");
          try {
            await this.refreshToken();
            const user = JSON.parse(localStorage.getItem("user"));
            error.config.headers["Authorization"] = `Bearer ${user.access}`;
            return this.service(error.config);
          } catch (refreshError) {
            console.error("Erreur de rafraîchissement du jeton:", refreshError);
            this.logout();
            router.push("/login");
          }
        }
        return Promise.reject(error);
      }
    );
  }

  async refreshToken() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.refresh) {
      try {
        const response = await this.service.post(`${API_URL}/token/refresh/`, {
          refresh: user.refresh,
        });
        if (response.data.access) {
          user.access = response.data.access;
          localStorage.setItem("user", JSON.stringify(user));
        } else {
          console.error(
            "Erreur lors du rafraîchissement du token: Pas d'accès"
          );
        }
      } catch (error) {
        console.error(
          "Erreur lors de la tentative de rafraîchissement du token:",
          error
        );
        throw error;
      }
    } else {
      console.error("Pas de token de rafraîchissement disponible");
    }
  }

  async login(user) {
    const response = await this.service.post(`${API_URL}/token/`, {
      username: user.username,
      password: user.password,
    });
    if (response.data.access) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    const userInfoResponse = await this.service.get(`${API_URL}/api/users/me`);

    if (userInfoResponse) {
      localStorage.setItem("userInfo", JSON.stringify(userInfoResponse.data));
    }

    router.push("/profile");
    return response.data;
  }

  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("userInfo");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("userInfo"));
  }
}

export default new AuthService();
