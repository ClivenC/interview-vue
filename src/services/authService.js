import axios from "axios";
import router from "@/router";

const API_URL = "http://127.0.0.1:8000";

class AuthService {
  constructor() {
    this.service = axios.create();
    this.service.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401) {
          router.push("/login");
        }
        return Promise.reject(error);
      }
    );
  }

  async login(user) {
    const response = await this.service.post(`${API_URL}/token/`, {
      username: user.username,
      password: user.password,
    });
    if (response.data.access) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  }

  logout() {
    localStorage.removeItem("user");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
