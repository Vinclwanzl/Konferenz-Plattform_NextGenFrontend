<script setup lang="ts">
import SessionFilterBar from '~/components/features/filter/SessionFilterBar.vue'
import SessionCard from '~/components/features/sessions/SessionCard.vue'

const { conference, sessions, tracks } = useConferenceData()
const { searchQuery, selectedTrack, filteredSessions } = useSessionFilter(sessions)

const trackOptions = computed(() => [
	{ label: 'All tracks', value: '' },
	...tracks.value.map(track => ({ label: track.name, value: track.id }))
])
</script>

<template>
	<section>
		<h1>{{ conference.name }}</h1>
		<p>{{ conference.tagline }}</p>
		<p>{{ sessions.length }} sessions</p>

		<SessionFilterBar
			v-model:search-query="searchQuery"
			v-model:selected-track="selectedTrack"
			:track-options="trackOptions"
		/>

		<p role="status">{{ filteredSessions.length }} sessions shown</p>
		<SessionCard v-for="session in filteredSessions" :key="session.id" :session="session" />
	</section>
</template>
