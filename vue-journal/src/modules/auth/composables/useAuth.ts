import { useAuthStore } from "../../../store/auth";
import { User } from "../../../types";
import { computed } from "vue";
import { storeToRefs } from "pinia";

const useAuth = () => {
  const auth = useAuthStore();

  const { createUser, signInUser, checkAuthentication, logout, user } = auth;
  const { currentStatus } = storeToRefs(auth);

  const createU = async (user: User) => {
    return await createUser(user);
  };

  const loginUser = async (user: User) => {
    return await signInUser(user);
  };

  const checkAuthStatus = async () => {
    return await checkAuthentication();
  };

  const onLogout = async () => {
    return await logout();
  };

  return {
    createU,
    checkAuthStatus,
    loginUser,
    onLogout,
    authStatus: computed(() => currentStatus),
    username: computed(() => user.name),
  };
};

export { useAuth };
