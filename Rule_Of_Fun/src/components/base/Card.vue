
<template>
  <div class="base-card">
    <slot /> 
  </div>
</template>

<style scoped>
.base-card {
  background-color: var(--color-surface); /* Verwaltet das Kasten-Styling */
  border: 1px solid var(--color-border);
  border-radius: var(--spacing-xs);
  padding: var(--spacing-md);
}
</style>