<script setup>
const props = defineProps({
  speaker: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <BaseCard>
    <BaseAvatar :src="props.speaker.image" />
    <h4>{{ props.speaker.name }}</h4>
    <p>{{ props.speaker.bio }}</p>
    <BaseButton>+</BaseButton>
  </BaseCard>
</template>