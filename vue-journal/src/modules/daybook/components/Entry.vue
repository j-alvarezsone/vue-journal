<script setup lang="ts">
import { ref, computed, PropType, toRefs } from "vue";
import { Entry } from "@/types";

const props = defineProps({
  entry: {
    type: Object as PropType<Entry>,
    required: true,
  },
});

const { entry } = toRefs(props);

const shortText = computed(() => {
  return entry.value.text.length > 130
    ? `${entry.value.text.substring(0, 130)}...`
    : entry.value.text;
});

const months = ref<string[]>([
  "January",
  "February",
  "March",
  "April",
  "May",
  "Jun",
  "Julie",
  "August",
  "September",
  "October",
  "November",
  "December",
]);
const days = ref<string[]>([
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]);

const day = computed(() => {
  const date = new Date(entry.value.date);
  return date.getDate();
});

const month = computed(() => {
  const date = new Date(entry.value.date);
  return months.value[date.getMonth()];
});

const yearDay = computed(() => {
  const date = new Date(entry.value.date);
  return `${date.getFullYear()}, ${days.value[date.getDay()]}`;
});
</script>

<template>
  <div
    class="entry-container mb-3 p-2"
    style="cursor: pointer"
    @click="$router.push({ name: 'entry', params: { id: entry.id } })"
  >
    <!-- Title -->
    <div class="entry-title d-flex align-items-center">
      <span class="text-success fs-5 fw-bold">{{ day }}</span>
      <span class="mx-1 fs-5">{{ month }}</span>
      <span class="mx-2 fw-light">{{ yearDay }}</span>
    </div>

    <div class="entry-description">
      {{ shortText }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.entry-container {
  border-bottom: 1px solid #2c3e50;
  transition: 0.2s all ease-in;

  &:hover {
    background-color: lighten($color: grey, $amount: 45);
    transition: 0.2s all ease-in;
  }

  .entry-description {
    font-size: 12px;
  }
}
</style>
