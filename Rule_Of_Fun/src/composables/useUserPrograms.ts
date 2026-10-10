const STORAGE_KEY = 'frontendnow_user_program'

export const useUserPrograms = () => {
  const { sessions } = useConferenceData()
  const bookmarkedIds = useState<string[]>('my-program-ids', () => [])
  const isHydrated = useState<boolean>('my-program-hydrated', () => false)

  if (import.meta.client) {
    onMounted(() => {
      if (isHydrated.value) return

      try {
      const saved = localStorage.getItem(STORAGE_KEY)
        if (saved) {
          const parsed: unknown = JSON.parse(saved)
          if (Array.isArray(parsed)) {
            const validIds = new Set(sessions.value.map(session => session.id))
            bookmarkedIds.value = [...new Set(parsed.filter(
              (id): id is string => typeof id === 'string' && validIds.has(id)
            ))]
          }
        }
      } catch {
        localStorage.removeItem(STORAGE_KEY)
      }

      isHydrated.value = true
    })

    watch(bookmarkedIds, (newIds) => {
      if (isHydrated.value) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newIds))
      }
    })
  }

  const toggleBookmark = (id: string) => {
    if (!sessions.value.some(session => session.id === id)) return

    bookmarkedIds.value = bookmarkedIds.value.includes(id)
      ? bookmarkedIds.value.filter(bookmarkedId => bookmarkedId !== id)
      : [...bookmarkedIds.value, id]
  }

  const isBookmarked = (id: string) => bookmarkedIds.value.includes(id)

  const mySessions = computed(() => {
    return sessions.value.filter(s => bookmarkedIds.value.includes(s.id))
  })

  return {
    bookmarkedIds: readonly(bookmarkedIds),
    mySessions,
    toggleBookmark,
    isBookmarked
  }
}