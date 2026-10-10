<!-- layouts/default.vue -->
<template>
  <div class="app-layout">
    <LayoutTheHeader /> 
    
    <main>
      <slot /> 
    </main>
    
    <LayoutTheFooter />
  </div>
</template>