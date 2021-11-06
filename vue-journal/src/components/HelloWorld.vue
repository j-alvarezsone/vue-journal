<script setup>
import { ref } from 'vue';

const props = defineProps({
  msg: {
    type: String,
    required: true,
    default: 'hola mundo',
  },
});

const count = ref(0);
</script>

<template>
  <h1>{{ msg }}</h1>
  <h1>{{ count }}</h1>
  <button class="btn btn-primary" @click="() => count++">increment</button>
  <button class="btn btn-secondary" @click="() => (count = 0)">reset</button>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
