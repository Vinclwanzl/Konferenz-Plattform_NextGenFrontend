import { computed, ref, toValue, type MaybeRefOrGetter } from 'vue'

type FilterableSession = {
	title: string
	abstract?: string
	trackId: string
}

export const useSessionFilter = <T extends FilterableSession>(sessions: MaybeRefOrGetter<readonly T[]>) => {
	const searchQuery = ref('')
	const selectedTrack = ref('')

	const filteredSessions = computed(() => {
		const query = searchQuery.value.trim().toLocaleLowerCase()

		return toValue(sessions).filter((session) => {
			const searchableText = `${session.title} ${session.abstract ?? ''}`.toLocaleLowerCase()
			const matchesQuery = !query || searchableText.includes(query)
			const matchesTrack = !selectedTrack.value || session.trackId === selectedTrack.value

			return matchesQuery && matchesTrack
		})
	})

	const clearFilters = () => {
		searchQuery.value = ''
		selectedTrack.value = ''
	}

	return { searchQuery, selectedTrack, filteredSessions, clearFilters }
}
