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
		@change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
	>
		<option v-for="option in options" :key="option.value" :value="option.value">
			{{ option.label }}
		</option>
	</select>
</template>
