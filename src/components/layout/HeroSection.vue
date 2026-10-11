<script setup lang="ts">
import heroPlaceholder from '~/assets/images/HerosectionPlaceholder.png'

const { conference } = useConferenceData()
</script>

<template>
	<div class="hero-section">
		<div class="hero-heading">
			<h1>{{ conference.name }}</h1>
			<p class="tagline">{{ conference.tagline }}</p>
		</div>
		<img
			class="hero-placeholder"
			:src="heroPlaceholder"
			alt="Abstract placeholder artwork for the conference hero"
		/>
	</div>
</template>

<style scoped>
.hero-section {
	display: grid;
	gap: var(--space-6);
}

.hero-heading {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: var(--space-6);
}

h1 {
	margin: 0;
	color: var(--color-text-primary);
	font-size: clamp(5rem, 12vw, 18rem);
	line-height: 0.88;
	letter-spacing: -0.08em;
	font-weight: 700;
	white-space: nowrap;
}

.tagline {
	margin: 0;
	max-width: 320px;
	color: var(--color-text-secondary);
	font-size: clamp(1.5rem, 2vw, 2.5rem);
	line-height: 1.1;
	text-align: left;
	font-weight: 400;
}

.hero-placeholder {
	display: block;
	width: 100%;
	height: auto;
}

@media (max-width: 760px) {
	.hero-heading {
		align-items: flex-start;
		flex-direction: column;
		gap: var(--space-3);
	}

	h1 {
		font-size: clamp(4rem, 18vw, 8rem);
		white-space: normal;
	}
}
</style>