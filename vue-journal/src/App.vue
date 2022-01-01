<script setup lang="ts">
import { useAuth } from "./modules/auth/composables/useAuth";
import { onMounted } from "vue";

const { authStatus, checkAuthStatus } = useAuth();

onMounted(() => {
  checkAuthStatus();
});
</script>
<template>
  <h1 v-if="authStatus === 'authenticating'">{{ authStatus }}</h1>
  <router-view v-else />
</template>
