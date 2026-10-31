import { computed, ref, toValue, type MaybeRefOrGetter } from 'vue'

type FilterableSession = {
	title: string
	abstract?: string
	trackId: string
	day: string
	level: string
}

export const useSessionFilter = <T extends FilterableSession>(sessions: MaybeRefOrGetter<readonly T[]>) => {
	const searchQuery = ref('')
	const selectedTrack = ref('')
	const selectedDay = ref('')
	const selectedLevel = ref('')

	const filteredSessions = computed(() => {
		const query = searchQuery.value.trim().toLocaleLowerCase()

		return toValue(sessions).filter((session) => {
			const searchableText = `${session.title} ${session.abstract ?? ''}`.toLocaleLowerCase()
			const matchesQuery = !query || searchableText.includes(query)
			const matchesTrack = !selectedTrack.value || session.trackId === selectedTrack.value
			const matchesDay = !selectedDay.value || session.day === selectedDay.value
			const matchesLevel = !selectedLevel.value || session.level === selectedLevel.value

			return matchesQuery && matchesTrack && matchesDay && matchesLevel
		})
	})

	const clearFilters = () => {
		searchQuery.value = ''
        selectedTrack.value = ''
        selectedDay.value = ''
        selectedLevel.value = ''

	}

	return { searchQuery, selectedTrack, selectedDay, selectedLevel, filteredSessions, clearFilters }
}
