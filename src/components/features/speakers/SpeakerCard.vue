<script setup lang="ts">
const props = defineProps<{ speakerId: string }>()
const { getSpeakerById } = useConferenceData()

const speaker = computed(() => getSpeakerById(props.speakerId))
</script>

<template>
  <BaseCard v-if="speaker" class="speaker-card">
    <h3 class="speaker-name">
      <NuxtLink :to="`/speakers/${speaker.id}`" class="speaker-link">
        {{ speaker.name }}
      </NuxtLink>
    </h3>
    <p class="speaker-role">{{ speaker.title }} | {{ speaker.company }}</p>  
    <p class="speaker-bio"> {{ speaker.bio }}</p>
    <p class="speaker-count"> {{ speaker.sessionIds.length }} session{{ speaker.sessionIds.length === 1 ? '' : 's' }}</p>
  </BaseCard>
</template>