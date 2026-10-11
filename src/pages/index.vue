<script setup lang="ts">
import SessionFilterBar from '~/components/features/filter/SessionFilterBar.vue'
import SessionCard from '~/components/features/sessions/SessionCard.vue'
import HeroSection from '~/components/layout/HeroSection.vue'

const { sessions, tracks } = useConferenceData()
const { searchQuery, selectedTrack, filteredSessions } = useSessionFilter(sessions)

const trackOptions = computed(() => [
	{ label: 'All tracks', value: '' },
	...tracks.value.map(track => ({ label: track.name, value: track.id }))
])
</script>

<template>
	<section class="conference-page">
		<header class="page-header">
			<HeroSection />
			<p class="meta">{{ sessions.length }} sessions</p>
		</header>

		<SessionFilterBar
			v-model:search-query="searchQuery"
			v-model:selected-track="selectedTrack"
			:track-options="trackOptions"
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
  margin: var(--space-3) 0 0;
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
