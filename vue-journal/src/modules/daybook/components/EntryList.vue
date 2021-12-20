<script lang="ts" setup>
import { ref } from "vue";
import Entry from "./Entry.vue";
import { useJournal } from "@/store/journal";
import { storeToRefs } from "pinia";

const journal = useJournal();
const { getEntriesByTerm } = storeToRefs(journal);

const term = ref<string>("");
</script>
<template>
  <div class="entry-list-container">
    <div class="px-2 pt-2">
      <input
        type="text"
        class="form-control"
        placeholder="Buscar entrada"
        v-model="term"
      />
    </div>

    <div class="mt-2 d-flex flex-column">
      <button
        class="btn btn-primary mx-2"
        @click.prevent="$router.push({ name: 'entry', params: { id: 'new' } })"
      >
        <i class="fa fa-plus-circle"></i>
        New Entry
      </button>
    </div>

    <div class="entry-scrollarea">
      <Entry
        v-for="entry in getEntriesByTerm(term)"
        :key="entry.id"
        :entry="entry"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.entry-list-container {
  border-right: 1px solid #2c3e50;
  height: calc(100vh - 56px);
}

.entry-scrollarea {
  height: calc(100vh - 110px);
  overflow: scroll;
}
</style>
