<script setup lang="ts">
defineProps<{
  modelValue: string
  placeholder?: string
}>()

defineEmits(['update:modelValue'])
</script>

<template>
  <input
    :value="modelValue"
    :placeholder="placeholder"
    class="base-input"
    type="text"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>

<style scoped>
.base-input {
  width: 100%;
  padding: var(--space-2) var(--space-4);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-full);
  background-color: var(--color-surface-default);
  color: var(--color-text-primary);
  font-size: var(--font-size-base);
}

.base-input::placeholder {
  color: var(--color-text-muted);
}

.base-input:focus {
  outline: 2px solid var(--focus-ring);
  outline-offset: 2px;
}
</style>