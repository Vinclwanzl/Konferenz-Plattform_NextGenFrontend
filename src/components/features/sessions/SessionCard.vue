<script setup lang="ts">
import ProgramToggleButton from '~/components/features/program/ProgramToggleButton.vue'

const props = defineProps<{ sessionId: string }>()
const { getSessionById, tracks, rooms } = useConferenceData()

const session = computed(() => getSessionById(props.sessionId))

const trackName = computed(() =>
    tracks.value.find(track => track.id === session.value?.trackId)?.name
)
const roomName = computed(() =>
    rooms.value.find(room => room.id === session.value?.roomId)?.name
)

</script>

<template>
  <BaseCard v-if="session" class="session-card">
    <div class="session-info">
      <p class="session-meta">
        {{ session.day }} | {{ session.startTime }} - {{ session.endTime }} | {{ roomName }}
      </p>
      <h3>
        <NuxtLink :to="`/sessions/${session.id}`" class="session-link">
          {{ session.title }}
        </NuxtLink>

        <p class="session-tags">{{ trackName }} | {{ session.level }} | {{ session.format }}</p>
      </h3>
    </div>
    <ProgramToggleButton :session-id="session.id" />
  </BaseCard>
</template>

<style scoped>
.session-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
}

.session-info {
  flex: 1;
}

.session-meta {
  margin: 0 0 var(--space-2);
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

h3 {
  margin: 0;
  color: var(--color-text-primary);
  font-size: var(--font-size-xl);
  line-height: var(--line-height-tight);
} 

.session-tags {
  margin: var(--space-2) 0 0;
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
  letter-spacing: 0.04em;
}

.session-link {
  color: var(--color-text-primary);
  text-decoration: none;
}

.session-link:hover,
.session-link:focus-visible {
  text-decoration: underline;
  color: var(--color-text-secondary);
}
</style>