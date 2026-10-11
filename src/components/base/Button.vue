<template>
  <button class="base-button"><slot /></button>
</template>

<style scoped>
.base-button {
  background: var(--button-primary-bg);
  color: var(--color-text-on-inverted);
  border: 1px solid transparent;
  border-radius: var(--radius-full);
  padding: var(--space-2) var(--space-4);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease;
  white-space: nowrap;
}

.base-button:hover {
  background: var(--button-primary-bg-hover);
}

.base-button:active {
  transform: translateY(1px);
}
</style>