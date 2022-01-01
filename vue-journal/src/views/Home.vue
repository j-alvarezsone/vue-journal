<script setup lang="ts"></script>
<template>
  <div class="d-flex justify-content-center align-items-center flex-column">
    <h1>Enter login</h1>

    <button class="btn btn-primary" @click="$router.push({ name: 'login' })">
      Login
    </button>
  </div>
</template>
