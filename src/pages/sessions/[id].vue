<script setup lang="ts">
import ProgramToggleButton from '~/components/features/program/ProgramToggleButton.vue'

const route = useRoute()
const { getSessionById, getSpeakerById, tracks, rooms } = useConferenceData()

const sessionId = computed(() =>
	typeof route.params.id === 'string' ? route.params.id : ''
)
const session = computed(() => getSessionById(sessionId.value))

if (!session.value) {
	throw createError({
		statusCode: 404,
		statusMessage: 'Session not found',
		fatal: true
	})
}

const track = computed(() =>
	tracks.value.find(item => item.id === session.value?.trackId)
)
const room = computed(() =>
	rooms.value.find(item => item.id === session.value?.roomId)
)
const speakers = computed(() =>
	(session.value?.speakerIds ?? [])
		.map(getSpeakerById)
		.filter((speaker): speaker is NonNullable<typeof speaker> => Boolean(speaker))
)

useHead(() => ({
	title: session.value ? `${session.value.title} — FrontendNow` : 'Session — FrontendNow'
}))
</script>

<template>
	<article v-if="session" class="session-detail">
		<div class="session-toolbar">
			<p class="back-link">
				<NuxtLink to="/">← All sessions</NuxtLink>
			</p>
			<ProgramToggleButton :session-id="session.id" />
		</div>

		<p class="session-meta">
			{{ session.day }} · {{ session.startTime }}–{{ session.endTime }}
		</p>
		<h1>{{ session.title }}</h1>
		<p class="session-tags">
			{{ track?.name }} · {{ session.level }} · {{ session.format }}
		</p>

		<section aria-labelledby="abstract-heading">
			<h2 id="abstract-heading">Abstract</h2>
			<p>{{ session.abstract }}</p>
		</section>

		<dl class="session-details">
			<div>
				<dt>Day</dt>
				<dd>{{ session.day }}</dd>
			</div>
			<div>
				<dt>Time</dt>
				<dd>{{ session.startTime }}–{{ session.endTime }}</dd>
			</div>
			<div>
				<dt>Room</dt>
				<dd>{{ room?.name }}</dd>
			</div>
			<div>
				<dt>Track</dt>
				<dd>{{ track?.name }}</dd>
			</div>
			<div>
				<dt>Level</dt>
				<dd>{{ session.level }}</dd>
			</div>
			<div>
				<dt>Format</dt>
				<dd>{{ session.format }}</dd>
			</div>
		</dl>

		<section aria-labelledby="speakers-heading">
			<h2 id="speakers-heading">Speakers</h2>
			<ul>
				<li v-for="speaker in speakers" :key="speaker.id">
					<NuxtLink :to="`/speakers/${speaker.id}`">
						{{ speaker.name }}
					</NuxtLink>
					<span> · {{ speaker.title }}, {{ speaker.company }}</span>
				</li>
			</ul>
		</section>
	</article>
</template>

<style scoped>
.session-detail {
	max-width: 760px;
	margin: 0 auto;
}

.session-toolbar {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: var(--space-3);
	margin-bottom: var(--space-4);
}

.back-link,
.session-meta,
.session-tags {
	color: var(--color-text-muted);
	font-size: var(--font-size-sm);
}

.back-link {
	margin: 0;
}

.session-meta {
	margin-bottom: var(--space-2);
}

h1 {
	margin: 0;
	color: var(--color-text-primary);
	font-size: var(--font-size-3xl);
	line-height: var(--line-height-tight);
}

.session-tags {
	margin: var(--space-3) 0 var(--space-6);
}

.session-details {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
	gap: var(--space-4);
	margin: var(--space-6) 0;
}

.session-details div {
	padding: var(--space-3);
	background: var(--color-surface-raised);
}

dt {
	color: var(--color-text-muted);
	font-size: var(--font-size-sm);
}

dd {
	margin: var(--space-1) 0 0;
	color: var(--color-text-primary);
}

@media (max-width: 480px) {
	.session-toolbar {
		align-items: flex-start;
		flex-wrap: wrap;
	}
}
</style>
