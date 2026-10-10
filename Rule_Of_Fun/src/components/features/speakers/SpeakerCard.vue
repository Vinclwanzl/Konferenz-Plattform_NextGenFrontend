<template>
  <BaseCard>
    <BaseAvatar :src="speaker.image" />
    <h4>{{ speaker.name }}</h4>
    <p>{{ speaker.bio }}</p>
    <BaseButton>+</BaseButton>
  </BaseCard>
</template>