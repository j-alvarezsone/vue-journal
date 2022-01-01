import { defineStore } from "pinia";
import { authApi } from "../api/authApi";
import { User } from "../types";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    status: "authenticating",
    user: null as any,
    idToken: null as any,
    refreshToken: null as any,
  }),

  getters: {
    currentStatus: (state) => {
      return state.status;
    },
    username: (state) => {
      return state.user?.name;
    },
  },

  actions: {
    loginUser({ user, idToken, refreshToken }) {
      if (idToken) {
        localStorage.setItem("idToken", idToken);
        this.idToken = idToken;
      }
      if (refreshToken) {
        localStorage.setItem("refreshToken", refreshToken);
        this.refreshToken = refreshToken;
      }
      this.user = user;
      this.status = "authenticated";
    },
    logout() {
      localStorage.removeItem("idToken");
      localStorage.removeItem("refreshToken");

      this.idToken = null;
      this.refreshToken = null;
      this.user = null;
      this.status = "not-authenticated";
    },
    async createUser(user: User) {
      const { name, email, password } = user;

      try {
        const { data } = await authApi.post(":signUp", {
          email,
          password,
          returnSecureToken: true,
        });

        const { idToken, refreshToken } = data;
        await authApi.post(":update", {
          displayName: name,
          idToken,
        });

        delete user.password;
        this.loginUser({ user, idToken, refreshToken });

        return {
          ok: true,
        };
      } catch (error: any) {
        console.log(error.message);

        return {
          ok: false,
          message: error.response.data.error.message,
        };
      }
    },
    async signInUser(user: User) {
      const { email, password } = user;

      try {
        const { data } = await authApi.post(":signInWithPassword", {
          email,
          password,
          returnSecureToken: true,
        });

        const { displayName, idToken, refreshToken } = data;
        user.name = displayName;

        this.loginUser({ user, idToken, refreshToken });

        return {
          ok: true,
        };
      } catch (error: any) {
        console.log(error.message);

        return {
          ok: false,
          message: error.response.data.error.message,
        };
      }
    },
    async checkAuthentication() {
      const idToken = localStorage.getItem("idToken");
      const refreshToken = localStorage.getItem("refreshToken");

      if (!idToken) {
        this.logout();
        return {
          ok: false,
          message: "There is no token",
        };
      }

      try {
        const { data } = await authApi.post(":lookup", {
          idToken,
        });

        const { displayName, email } = data.users[0];

        const user = {
          name: displayName as string,
          email: email as string,
        };

        this.loginUser({ user, idToken, refreshToken });

        return {
          ok: true,
        };
      } catch (error: any) {
        this.logout;
        return {
          ok: false,
          message: error.response.data.error.message,
        };
      }
    },
  },
});
