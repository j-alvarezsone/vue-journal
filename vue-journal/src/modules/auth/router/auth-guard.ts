import { useAuthStore } from "../../../store/auth";

const isAuthenticatedGuard = async (to, from, next) => {
  const auth = useAuthStore();
  const { checkAuthentication } = auth;
  const { ok } = await checkAuthentication();

  if (ok) next();
  else next({ name: "login" });
};

export { isAuthenticatedGuard };
