
<template>
  <div class="base-card">
    <slot /> 
  </div>
</template>

<style scoped>
.base-card {
  background-color: var(--color-surface-default);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-md);
  padding: var(--space-4);
  box-shadow: 0 1px 0 rgba(27, 28, 29, 0.04);
}
</style>