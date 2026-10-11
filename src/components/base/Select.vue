<script setup lang="ts">
type SelectOption = {
	label: string
	value: string
}

defineProps<{
	modelValue: string
	options: SelectOption[]
}>()

defineEmits<{
	'update:modelValue': [value: string]
}>()
</script>

<template>
	<select
		:value="modelValue"
		class="base-select"
		@change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
	>
		<option v-for="option in options" :key="option.value" :value="option.value">
			{{ option.label }}
		</option>
	</select>
</template>

<style scoped>
.base-select {
	min-width: 220px;
	padding: var(--space-2) var(--space-4);
	border: 1px solid var(--color-border-default);
	border-radius: var(--radius-full);
	background-color: var(--color-surface-default);
	color: var(--color-text-primary);
	font-size: var(--font-size-base);
}
</style>
