<script setup lang="ts">
import ProgramToggleButton from '~/components/features/program/ProgramToggleButton.vue'
import type { Session } from '~/types/conference'

defineProps<{ session: Session }>()
</script>

<template>
  <BaseCard>
    <div class="session-info">
      <h3>{{ session.title }}</h3>
      <p>{{ session.day }} | {{ session.startTime }} - {{ session.endTime }}</p>
    </div>
    <ProgramToggleButton :session-id="session.id" />
  </BaseCard>
</template>