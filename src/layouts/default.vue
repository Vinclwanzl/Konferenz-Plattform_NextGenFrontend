<!-- layouts/default.vue -->
<template>
  <div class="app-layout">
    <LayoutDefaultHeader />

    <main class="app-main">
      <slot />
    </main>

    <LayoutDefaultFooter />
  </div>
</template>

<style scoped>
.app-layout {
  min-height: 100vh;
  background: var(--color-surface-canvas);
  color: var(--color-text-primary);
}

.app-main {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-6) var(--space-4) var(--space-8);
}
</style>