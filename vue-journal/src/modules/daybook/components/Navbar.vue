<script setup lang="ts">
import { useAuthStore } from "../../../store/auth";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useAuth } from "../../auth/composables/useAuth";
import { useJournal } from "../../../store/journal";

const router = useRouter();
const { username, onLogout: logout } = useAuth();

const journal = useJournal();
const { clearEntries } = journal;

const onLogout = async () => {
  await logout();
  clearEntries();
  await router.push({ name: "login" });
};
</script>
<template>
  <nav class="navbar bg-primary">
    <a class="navbar-brand text-white">
      <img
        src="@/assets/logo.png"
        alt="Vue Logo"
        height="24"
        class="d-inline-block align-text-top mx-2"
      />
      {{ username }}
    </a>

    <div class="d-flex">
      <button class="btn btn-outline-info mx-2" @click.prevent="onLogout">
        <i class="fa fa-sign-out-alt"></i>
      </button>
    </div>
  </nav>
</template>
