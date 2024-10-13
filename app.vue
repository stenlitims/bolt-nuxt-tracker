<template>
  <div>
    <Map style="height: 100vh" v-if="locations.length" :locations="locations" />
    <p v-else>No location data available</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const locations = ref([]);

onMounted(async () => {
  const { data } = await useFetch("/api/location");
  locations.value = data.value.data;
});
</script>

<style>
body {
  margin: 0;
  font-family: system-ui, sans-serif;
  color: #333;
}
</style>
