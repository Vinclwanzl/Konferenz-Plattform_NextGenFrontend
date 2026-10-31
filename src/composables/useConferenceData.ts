import conferenceData from '~/assets/conference-data.json'
import type { ConferenceData, Session, Speaker } from '~/types/conference'

export const useConferenceData = () => {
	const data = useState<ConferenceData>('conference-data', () => conferenceData)
	const sessionMap = computed(() =>
		Object.fromEntries(
			data.value.sessions.map((session) => [session.id, session] as [string, Session])
		)
	)


	const getSessionById = (id: string) => sessionMap.value[id]
	const getSessionsByIds = (ids: string[]) =>
		ids
			.map((id) => getSessionById(id))
			.filter((session): session is Session => Boolean(session))

	const speakerMap = computed(() => 
	Object.fromEntries(
		data.value.speakers.map((speaker) => [speaker.id, speaker] as [string, Speaker])
	))

	const getSpeakerById = (id: string) => speakerMap.value[id] 

	return {
		conference: computed(() => data.value.conference),
		tracks: computed(() => data.value.tracks),
		rooms: computed(() => data.value.rooms),
		speakers: computed(() => data.value.speakers),
		sessions: computed(() => data.value.sessions),
		sessionMap,
		speakerMap,
		getSessionById,
		getSessionsByIds,
		getSpeakerById
	}
}
