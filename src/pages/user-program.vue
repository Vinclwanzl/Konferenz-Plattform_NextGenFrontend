<script setup lang="ts">
import SessionCard from '~/components/features/sessions/SessionCard.vue'

const { isHydrated, mySessions } = useUserPrograms()
</script>

<template>
	<section>
		<h1>My Program</h1>
		<p v-if="!isHydrated">Loading your program...</p>
		<template v-else>
			<p v-if="mySessions.length === 0">No sessions saved yet.</p>
			<SessionCard v-for="session in mySessions" :key="session.id" :session-id="session.id" />
		</template>
	</section>
</template>