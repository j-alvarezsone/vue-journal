<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

const goToDaybook = () => router.push('/daybook');
</script>
<template>
  <h1>Hola desde Home</h1>
  <button @click="goToDaybook">Go to dayBook</button>
</template>
