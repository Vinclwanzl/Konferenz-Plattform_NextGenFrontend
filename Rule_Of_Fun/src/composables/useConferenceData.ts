import conferenceData from '~/assets/conference-data.json'
import type { ConferenceData } from '~/types/conference'

export const useConferenceData = () => {
	const data = useState<ConferenceData>('conference-data', () => conferenceData)

	return {
		conference: computed(() => data.value.conference),
		tracks: computed(() => data.value.tracks),
		rooms: computed(() => data.value.rooms),
		speakers: computed(() => data.value.speakers),
		sessions: computed(() => data.value.sessions)
	}
}
