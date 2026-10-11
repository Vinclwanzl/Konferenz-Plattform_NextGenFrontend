<template>
	<header class="site-header">
		<NuxtLink to="/" class="brand" aria-label="FrontendNow home">
			<img src="/placeholder-circle.png" alt="FrontendNow" class="brand-mark" />
		</NuxtLink>
		<nav aria-label="Main navigation" class="main-nav">
			<NuxtLink to="/">Overview</NuxtLink>
			<NuxtLink to="/speakers">Speakers</NuxtLink>
			<NuxtLink to="/user-program">My Program</NuxtLink>
		</nav>
	</header>
</template>

<style scoped>
.site-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-4) var(--space-4) var(--space-3);
  background: var(--color-surface-canvas);
}

.brand {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  text-decoration: none;
}

.brand-mark {
  display: block;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  object-fit: cover;
  background: var(--color-surface-raised);
}

.main-nav {
  display: flex;
  gap: var(--space-4);
}

.main-nav a {
  color: var(--color-text-secondary);
  text-decoration: none;
  font-size: var(--font-size-sm);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.main-nav a:hover,
.main-nav a.router-link-active {
  color: var(--color-text-primary);
}
</style>
