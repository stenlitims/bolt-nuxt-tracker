<template>
  <div>
    <h1>Geolocation Map</h1>
    <Map v-if="locations.length" :locations="locations" />
    <p v-else>No location data available</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const locations = ref([])

onMounted(async () => {
  const { data } = await useFetch('/api/location')
  locations.value = data.value
})
</script>