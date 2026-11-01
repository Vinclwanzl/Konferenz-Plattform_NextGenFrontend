<script setup lang="ts">
const route = useRoute()
const { getSpeakerById, getSessionsByIds } = useConferenceData()

const speaker = computed(() => getSpeakerById(route.params.id as string))

if(!speaker.value) {
    throw createError({
        statusCode: 404,
        statusMessage: 'Speaker not found',
        fatal: true
    })
}

const sessions = computed(() => speaker.value ? getSessionsByIds(speaker.value.sessionIds) : [])

useHead(() => ({
    title: speaker.value ? `${speaker.value.name} — FrontendNow` : 'Speaker — FrontendNow'
}))

</script>

<template>
  <section v-if="speaker" class="speaker-profile">
    <p class="back-link"><NuxtLink to="/speakers">← All speakers</NuxtLink></p>

    <h1>{{ speaker.name }}</h1>
    <p class="role">{{ speaker.title }} · {{ speaker.company }}</p>
    <p class="bio">{{ speaker.bio }}</p>

    <h2>Sessions</h2>
    <ul class="session-list">
      <li v-for="session in sessions" :key="session.id">
        <NuxtLink :to="`/sessions/${session.id}`" class="session-link">
          {{ session.title }}
        </NuxtLink>
        <span class="session-meta">
          {{ session.day }} · {{ session.startTime }}–{{ session.endTime }}
        </span>
      </li>
    </ul>
  </section>
</template>