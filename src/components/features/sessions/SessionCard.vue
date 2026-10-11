<script setup lang="ts">
import ProgramToggleButton from '~/components/features/program/ProgramToggleButton.vue'

const props = defineProps<{ sessionId: string }>()
const { getSessionById } = useConferenceData()

const session = computed(() => getSessionById(props.sessionId))
</script>

<template>
  <BaseCard v-if="session" class="session-card">
    <div class="session-info">
      <p class="session-meta">{{ session.day }} | {{ session.startTime }} - {{ session.endTime }}</p>
      <h3>{{ session.title }}</h3>
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
</style>