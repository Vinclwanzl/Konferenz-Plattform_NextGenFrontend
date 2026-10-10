<template>
  <button class="base-button"><slot /></button>
</template>

<style scoped>
.base-button {
  background-color: var(--color-surface-primary);
  padding: var(--spacing-sm) var(--spacing-md);
}
</style>