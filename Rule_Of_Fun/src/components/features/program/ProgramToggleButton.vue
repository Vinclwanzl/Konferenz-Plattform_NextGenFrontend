<script setup lang="ts">
const props = defineProps<{ sessionId: string }>()
const { isBookmarked, toggleBookmark } = useUserPrograms()

const bookmarked = computed(() => isBookmarked(props.sessionId))
</script>

<template>
	<BaseButton
		type="button"
		:aria-pressed="bookmarked"
		@click="toggleBookmark(sessionId)"
	>
		{{ bookmarked ? 'Remove from my program' : 'Add to my program' }}
	</BaseButton>
</template>
