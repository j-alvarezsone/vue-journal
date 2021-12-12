<script setup lang="ts">
const props = defineProps({
  icon: {
    type: String,
    default: "fa-plus",
  },
});

const emit = defineEmits(["onSave"]);
</script>

<template>
  <button class="btn btn-primary" @click.prevent="emit('onSave')">
    <i class="fa fa-2x" :class="props.icon"></i>
  </button>
</template>

<style lang="scss" scoped>
button {
  border-radius: 100%;
  bottom: 20px;
  height: 80px;
  position: fixed;
  right: 20px;
  width: 80px;
}
</style>