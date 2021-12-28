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

        return entries.filter((entry) =>
          entry.text.toLowerCase().includes(term.toLowerCase())
        );
      },
    getEntriesById:
      ({ entries }) =>
      (id = "") => {
        const entry = entries.find((entry) => entry.id === id);
        if (!entry) return;

        return { ...entry };
      },
    setEntries: (state) => (entries: Entry[]) => {
      state.entries = [...state.entries, ...entries] as Entry[];
      state.isLoading = false;
    },
    updateEntry:
      ({ entries }) =>
      (entry: Entry) => {
        const idx = entries.map((e) => e.id).indexOf(entry.id);
        entries[idx] = entry;
      },
    addEntry: (state) => (entry: Entry) => {
      state.entries = [entry, ...state.entries] as Entry[];
    },
    deleteEntry1: (state) => (id: string) => {
      state.entries = state.entries.filter((entry) => entry.id !== id);
    },
  },

  actions: {
    async loadEntries() {
      try {
        const { data } = await journalApi.get("/entries.json");

        if (!data) {
          this.setEntries([]);
          return;
        }
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

        await journalApi.put(`/entries/${id}.json`, dataToSave);
        this.updateEntry({ ...entry });
      } catch (err) {
        console.log(err);
      }
    },
    async createEntry(entry: Entry) {
      try {
        const { date, picture, text, id } = entry;
        const dataToSave = {
          date,
          picture,
          text,
          id,
        };

        const { data } = await journalApi.post(`/entries.json`, dataToSave);
        dataToSave.id = data.name;

        this.addEntry(dataToSave);

        return data.name;
      } catch (err) {
        console.log(err);
      }
    },
    async deleteEntry(id: string) {
      try {
        await journalApi.delete(`/entries/${id}.json`);

        this.deleteEntry1(id);
        return id;
      } catch (err) {
        console.log(err);
      }
    },
  },
});
