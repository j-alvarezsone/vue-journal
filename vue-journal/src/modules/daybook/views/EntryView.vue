<script setup lang="ts">
import { ref, toRefs, onMounted, computed, watch } from "vue";
import { useJournal } from "@/store/journal";
import { useRouter } from "vue-router";
import Fab from "../components/Fab.vue";
import getDateMonthYear from "../helpers/getDayMonthYear";
import { Entry } from "@/types";
import { storeToRefs } from "pinia";
import Swal from "sweetalert2";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const { id } = toRefs(props);
const { getEntriesById } = storeToRefs(useJournal());
const { upDateEntry, createEntry, deleteEntry } = useJournal();
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
  await Swal.fire({
    title: "Please Wait!",
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
      Swal.close();
    },
  });

  // Actualizar
  if (entry.value?.id) {
    await upDateEntry(entry.value as Entry);
  } else {
    // Crear una nueva entrada
    const id = await createEntry(entry.value as Entry);
    await router.push({ name: "entry", params: { id } });
  }
  await Swal.fire("Saved", "Your entry has been saved", "success");
};

const onDelateEntry = async () => {
  const { isConfirmed } = await Swal.fire({
    title: "Are you sure?",
    text: "Once deleted, it cannot be recovered",
    showDenyButton: true,
    confirmButtonText: "Yes, I'm sure",
  });
  if (isConfirmed) {
    await Swal.fire({
      title: "Wait please",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        Swal.close();
      },
    });

    await deleteEntry(entry.value?.id as string);
    await router.push({ name: "no-entry" });
    await Swal.fire("Deleted", "", "success");
  }
};

const localImage = ref(null as any);
const file = ref(null as any);

const onSelectedImage = (e) => {
  const files = e.target.files[0];
  if (!files) {
    localImage.value = null;
    file.value = null;
    return;
  }
  file.value = files;
  const reader = new FileReader();
  reader.onload = () => (localImage.value = reader.result);
  reader.readAsDataURL(files);
};

const imageSelector = ref<HTMLImageElement>(null as any);

const onSelectImage = () => {
  imageSelector.value.click();
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
        <input
          v-show="false"
          type="file"
          @change="onSelectedImage"
          ref="imageSelector"
          accept="image/png, image/jpeg"
        />
        <button
          v-if="entry.id"
          class="btn btn-danger mx-2"
          @click.prevent="onDelateEntry"
        >
          Delete
          <i class="fa fa-trash-alt"></i>
        </button>

        <button class="btn btn-primary" @click.prevent="onSelectImage">
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

    <!--    <img-->
    <!--      src="https://www.robertlandscapes.com/wp-content/uploads/2014/11/landscape-322100_1280.jpg"-->
    <!--      alt="entry-picture"-->
    <!--      class="img-thumbnail"-->
    <!--    />-->
    <img
      v-if="localImage"
      :src="localImage"
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
