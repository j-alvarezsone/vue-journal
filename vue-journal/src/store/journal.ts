import { defineStore } from "pinia";
import journalApi from "../api/journalApi";
import { Entry } from "@/types";

export const useJournal = defineStore("journal", {
  state: () => ({
    isLoading: true,
    entries: [] as Entry[],
  }),

  getters: {
    getEntriesByTerm:
      ({ entries }) =>
      (term = ""): Entry[] => {
        if (term.length === 0) return entries;

        return entries.filter((entry: Entry) =>
          entry.text.toLowerCase().includes(term.toLowerCase())
        ) as Entry[];
      },
    getEntriesById:
      ({ entries }) =>
      (id = "") => {
        const entry: Entry = entries.find((entry: Entry) => entry.id === id)!;
        if (!entry) return;

        return { ...entry };
      },
    setEntries: (state) => (entries: Entry[]) => {
      state.entries = [...state.entries, ...entries] as [];
      state.isLoading = false;
    },
    updateEntry:
      ({ entries }) =>
      (entry: Entry) => {
        const idx = entries.map((e: Entry) => e.id).indexOf(entry.id);
        entries[idx] = entry;
      },
  },

  actions: {
    async loadEntries() {
      try {
        const { data } = await journalApi.get("/entries.json");
        const entries: Entry[] = [];
        for (let id of Object.keys(data)) {
          entries.push({
            id,
            ...data[id],
          });
        }
        this.setEntries(entries);
      } catch (err) {
        console.log(err);
      }
    },
    async upDateEntry(entry: Entry) {
      try {
        const { id, date, picture, text } = entry;
        const dataToSave = { date, picture, text };
        const resp = await journalApi.put(`/entries/${id}.json`, dataToSave);
        console.log(resp);
        this.updateEntry({ ...entry });
      } catch (err) {
        console.log(err);
      }
    },
  },
});