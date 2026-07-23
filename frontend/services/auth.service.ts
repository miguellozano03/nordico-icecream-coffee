import { authClient } from "@/lib/auth-client";

export const authService = {
  login(email: string, password: string) {
    return authClient.signIn.email({ email, password });
  },

  logout: () => authClient.signOut(),
};
