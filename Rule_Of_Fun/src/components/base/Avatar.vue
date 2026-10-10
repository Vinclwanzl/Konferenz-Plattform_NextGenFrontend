<template>
  <BaseCard>
    <BaseAvatar :src="session.image" />
    <div class="session-info">
      <h3>{{ session.title }}</h3>
    </div>
    <BaseButton>Add to my program</BaseButton>
  </BaseCard>
</template>