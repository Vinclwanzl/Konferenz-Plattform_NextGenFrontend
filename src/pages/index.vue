<script setup lang="ts">
import SessionFilterBar from '~/components/features/filter/SessionFilterBar.vue'
import SessionCard from '~/components/features/sessions/SessionCard.vue'
import HeroSection from '~/components/layout/HeroSection.vue'

const { sessions, tracks, conference } = useConferenceData()
const { searchQuery, selectedTrack, selectedDay, selectedLevel, hasActiveFilters, filteredSessions, clearFilters } = useSessionFilter(sessions)

const trackOptions = computed(() => [
	{ label: 'All tracks', value: '' },
	...tracks.value.map(track => ({ label: track.name, value: track.id }))
])

const dayOptions = computed(() => [
    { label: 'All days', value: '' },
    ...conference.value.dates.map(date => ({ label: date, value: date }))
])

const levelOptions = computed(() => [
    { label: 'All levels', value: '' },
    ...[...new Set(sessions.value.map(session => session.level))].map(level => ({
        label: level,
        value: level
    }))
])
</script>

<template>
	<section class="conference-page">
		<header class="page-header">
			<HeroSection />
			<p class="meta">{{ sessions.length }} total sessions</p>
		</header>

		<SessionFilterBar
			v-model:search-query="searchQuery"
			v-model:selected-track="selectedTrack"
			v-model:selected-day="selectedDay"
    		v-model:selected-level="selectedLevel"
   			:track-options="trackOptions"
    		:day-options="dayOptions"
    		:level-options="levelOptions"
			@clear="clearFilters"
		/>

		<p class="status" role="status">
			{{ filteredSessions.length }} session{{ filteredSessions.length === 1 ? '' : 's' }} shown
		</p>

		<div v-if="filteredSessions.length" class="session-list">
			<SessionCard
				v-for="session in filteredSessions"
				:key="session.id"
				:session-id="session.id"
			/>
		</div>

		<p v-else-if="hasActiveFilters" class="empty">
    		No sessions match the selected filters.
		</p>
	</section>
</template>

<style scoped>
.conference-page {
  display: block;
}

.page-header {
  margin-bottom: var(--space-6);
}

.meta,
.status {
  margin: var(--space-3) 0;
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.session-list {
  display: grid;
  gap: var(--space-4);
}
</style>
