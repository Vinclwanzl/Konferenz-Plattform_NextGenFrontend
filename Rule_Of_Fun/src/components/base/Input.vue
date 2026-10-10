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
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-pill);
  background-color: var(--color-surface);
  color: var(--color-text-primary);
}
</style>