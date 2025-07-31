import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto'

interface FilterState {
	filteredContacts: string[]
	filterParams: {
		name?: string
		groupId?: string
	}
}

const initialState: FilterState = {
	filteredContacts: [],
	filterParams: {},
}

export const contactsSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		filterContacts: (
			state,
			action: PayloadAction<{
				name?: string
				groupId?: string
				groups: GroupContactsDto[]
				allContacts: string[]
			}>
		) => {
			const { name, groupId, groups, allContacts } = action.payload
			state.filterParams = { name, groupId }

			let filteredIds = [...allContacts]

			if (groupId) {
				const groupContacts = groups.find(({ id }) => id === groupId)
				if (groupContacts) {
					filteredIds = groupContacts.contactIds
				}
			}

			state.filteredContacts = filteredIds
		},
		resetFilter: (state) => {
			state.filteredContacts = []
			state.filterParams = {}
		},
	},
})

export const { filterContacts, resetFilter } = contactsSlice.actions
export default contactsSlice.reducer
