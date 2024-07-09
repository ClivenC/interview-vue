declare module "@/services/authService" {
  interface User {
    username: string;
    password: string;
  }

  interface AuthResponse {
    access: string;
  }

  class AuthService {
    login(user: User): Promise<AuthResponse>;

    logout(): void;

    getCurrentUser(): AuthResponse | null;
  }

  const authService: AuthService;
  export default authService;
}
