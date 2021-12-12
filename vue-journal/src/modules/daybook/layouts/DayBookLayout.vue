<script setup lang="ts">
import { onMounted, toRefs } from "vue";
import Navbar from "../components/Navbar.vue";
import EntryList from "../components/EntryList.vue";
import { useJournal } from "@/store/journal";

const journal = useJournal();
const { loadEntries } = journal;
const { isLoading } = toRefs(journal);

onMounted(() => {
  loadEntries();
});
</script>

<template>
  <Navbar />

  <div v-if="isLoading" class="row justify-content-md-center">
    <div class="col-3 alert-info text-center mt-5">
      Wait please...
      <h3 class="mt-2">
        <i class="fa fa-spin fa-sync"></i>
      </h3>
    </div>
  </div>

  <div v-else class="d-flex">
    <div class="col-4">
      <EntryList />
    </div>
    <div class="col">
      <router-view />
    </div>
  </div>
</template>