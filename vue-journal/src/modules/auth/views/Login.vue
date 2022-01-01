<script setup lang="ts">
import { ref } from "vue";
import { useAuth } from "../composables/useAuth";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";

type LoginForm = {
  email: string;
  password: string;
};

const { loginUser } = useAuth();
const router = useRouter();

const userForm = ref<LoginForm>({
  email: "",
  password: "",
});

const onSubmit = async () => {
  const { ok, message } = await loginUser(userForm.value);
  if (!ok) await Swal.fire("Error", message, "error");
  else await router.push({ name: "no-entry" });
};
</script>

<template>
  <span class="login100-form-title p-b-41"> Get Into </span>
  <form
    @submit.prevent="onSubmit"
    class="login100-form validate-form p-b-33 p-t-5"
  >
    <div class="wrap-input100 validate-input" data-validate="Enter username">
      <input
        v-model="userForm.email"
        class="input100"
        type="text"
        placeholder="Email"
        required
      />
      <span class="focus-input100" data-placeholder="&#xe82a;"></span>
    </div>

    <div class="wrap-input100 validate-input" data-validate="Enter password">
      <input
        v-model="userForm.password"
        class="input100"
        type="password"
        placeholder="Password"
        required
      />
      <span class="focus-input100" data-placeholder="&#xe80f;"></span>
    </div>

    <div class="container-login100-form-btn m-t-32">
      <button type="submit" class="login100-form-btn">Login</button>
    </div>

    <div class="container-login100-form-btn m-t-32">
      <router-link :to="{ name: 'register' }">
        ¿You don't have an account?
      </router-link>
    </div>
  </form>
</template>

<style scoped></style>
