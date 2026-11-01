<script setup lang="ts">
import SpeakerCard from '~/components/features/speakers/SpeakerCard.vue'

const { speakers } = useConferenceData()

useHead({ title: 'Speakers — FrontendNow' })
</script>

<template>
  <section class="speakers-page">
    <h1>Speakers</h1>
    <p class="meta">{{ speakers.length }} speakers</p>

    <div class="speaker-grid">
      <SpeakerCard
        v-for="speaker in speakers"
        :key="speaker.id"
        :speaker-id="speaker.id"
      />
    </div>
  </section>
</template>
