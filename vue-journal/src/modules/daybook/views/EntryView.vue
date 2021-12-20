<script setup lang="ts">
import { ref, toRefs, onMounted, computed, watch } from "vue";
import { useJournal } from "@/store/journal";
import { useRouter } from "vue-router";
import Fab from "../components/Fab.vue";
import getDateMonthYear from "../helpers/getDayMonthYear";
import { Entry } from "@/types";
import { storeToRefs } from "pinia";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const { id } = toRefs(props);
const { getEntriesById } = storeToRefs(useJournal());
const { upDateEntry } = useJournal();
const router = useRouter();

const entry = ref<Entry | null>(null);

const day = computed(() => {
  const { day } = getDateMonthYear(entry.value?.date as string);
  return day;
});
const month = computed(() => {
  const { month } = getDateMonthYear(entry.value?.date as string);
  return month;
});
const yearDay = computed(() => {
  const { year } = getDateMonthYear(entry.value?.date as string);
  return year;
});

const loadEntry = () => {
  let getEntry;
  if (id.value === "new") {
    getEntry = {
      text: "",
      date: new Date().getTime(),
    };
  } else {
    getEntry = getEntriesById.value(id.value);
    if (!getEntry) return router.push({ name: "no-entry" });
  }

  entry.value = getEntry;
};

const saveEntry = async () => {
  // Actualizar
  if (entry.value?.id) {
    await upDateEntry(entry.value as Entry);
  } else {
    // Crear una nueva entrada
    console.log("Creando nueva entrada");
  }
};

onMounted(() => {
  loadEntry();
});

watch(
  () => id.value,
  () => {
    loadEntry();
  }
);
</script>

<template>
  <template v-if="entry">
    <div class="entry-title d-flex justify-content-between p-2">
      <div>
        <span class="text-success fs-3 fw-bold">{{ day }}</span>
        <span class="mx-1 fs-3">{{ month }}</span>
        <span class="mx-2 fs-4 fw-light">{{ yearDay }}</span>
      </div>

      <div>
        <button class="btn btn-danger mx-2">
          Delete
          <i class="fa fa-trash-alt"></i>
        </button>

        <button class="btn btn-primary">
          Upload photo
          <i class="fa fa-upload"></i>
        </button>
      </div>
    </div>

    <hr />
    <div class="d-flex flex-column px-3 h-75">
      <textarea v-model="entry.text" placeholder="¿What happened today?">
      </textarea>
    </div>

    <img
      src="https://www.robertlandscapes.com/wp-content/uploads/2014/11/landscape-322100_1280.jpg"
      alt="entry-picture"
      class="img-thumbnail"
    />
  </template>

  <Fab icon="fa-save" @on-save="saveEntry" />
</template>

<style lang="scss" scoped>
textarea {
  font-size: 20px;
  border: none;
  height: 100%;

  &:focus {
    outline: none;
  }
}

img {
  width: 200px;
  position: fixed;
  bottom: 150px;
  right: 20px;
  box-shadow: 0 5px 10px rgba($color: #000000, $alpha: 0.2);
}
</style>
