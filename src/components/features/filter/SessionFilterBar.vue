<script setup lang="ts">
type TrackOption = {
  label: string
  value: string
}

defineProps<{ 
  trackOptions: TrackOption[]
  dayOptions: TrackOption[]
  levelOptions: TrackOption[]
}>()

const searchQuery = defineModel<string>('searchQuery', { default: '' })
const selectedTrack = defineModel<string>('selectedTrack', { default: '' })
const selectedDay = defineModel<string>('selectedDay', {default: '' })
const selectedLevel = defineModel<string>('selectedLevel', {default: '' })

const emit = defineEmits<{ clear: [] }>()
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
     <BaseSelect
      v-model="selectedDay"
      aria-label="Filter by day"
      :options="dayOptions"
    />
     <BaseSelect
      v-model="selectedLevel"
      aria-label="Filter by level"
      :options="levelOptions"
    />    

    <BaseButton
      type="button"
      aria-label="Reset all filters"
      @click="$emit('clear')"
    >
      Reset
    </BaseButton>

  </div>
</template>

<style scoped>
.filter-bar {
  display: flex;
  gap: var(--space-3);
  align-items: center;
  margin: var(--space-4) 0 var(--space-6);
}

.filter-bar > * {
  flex: 1;
}

.filter-bar > :last-child {
  flex: 0 0 220px;
}
</style>