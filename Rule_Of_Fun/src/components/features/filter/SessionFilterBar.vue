<script setup lang="ts">
type TrackOption = {
  label: string
  value: string
}

defineProps<{ trackOptions: TrackOption[] }>()

const searchQuery = defineModel<string>('searchQuery', { default: '' })
const selectedTrack = defineModel<string>('selectedTrack', { default: '' })
</script>

<template>
  <div class="filter-bar">
    <BaseInput
      v-model="searchQuery"
      aria-label="Search sessions"
      placeholder="Search sessions..."
    />
    <BaseSelect
      v-model="selectedTrack"
      aria-label="Filter by track"
      :options="trackOptions"
    />
  </div>
</template>