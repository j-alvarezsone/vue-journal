<script setup lang="ts">
import Fab from "../components/Fab.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const createNewEntry = async () => {
  await router.push({ name: "entry", params: { id: "new" } });
};
</script>

<template>
  <div class="d-flex justify-content-center">
    <h1 class="align-self-center">Nothing is selected</h1>
  </div>

  <Fab @click.prevent="createNewEntry" />
</template>

<style lang="scss" scoped>
div {
  height: 100%;
}
</style>
