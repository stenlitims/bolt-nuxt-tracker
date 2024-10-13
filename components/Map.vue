<template>
  <div ref="mapContainer" style="width: 100%; height: 400px;"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

const props = defineProps<{
  locations: Array<{
    latitude: number
    longitude: number
    accuracy: number
    time: number
  }>
}>()

const mapContainer = ref<HTMLElement | null>(null)
let map: any = null
let markers: any[] = []

onMounted(async () => {
  if (process.client) {
    const L = await import('leaflet')
    if (mapContainer.value && props.locations.length > 0) {
      map = L.map(mapContainer.value).setView([props.locations[0].latitude, props.locations[0].longitude], 13)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map)
      updateMarkers()
    }
  }
})

watch(() => props.locations, updateMarkers, { deep: true })

async function updateMarkers() {
  if (process.client && map) {
    const L = await import('leaflet')
    // Remove existing markers
    markers.forEach(marker => marker.remove())
    markers = []

    // Add new markers
    props.locations.forEach(location => {
      const marker = L.marker([location.latitude, location.longitude]).addTo(map)
      markers.push(marker)
    })

    // Adjust map view to fit all markers
    if (markers.length > 0) {
      const group = L.featureGroup(markers)
      map.fitBounds(group.getBounds().pad(0.1))
    }
  }
}
</script>