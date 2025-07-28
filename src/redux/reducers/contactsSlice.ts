import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ContactDto } from 'src/types/dto/ContactDto'
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto'

interface ContactsState {
	all: ContactDto[]
	filtered: ContactDto[]
	loading: boolean
	error: string | null
}

const initialState: ContactsState = {
	all: [],
	filtered: [],
	loading: false,
	error: null,
}

export const fetchContacts = createAsyncThunk(
	'contacts/fetchContacts',
	async (_, { rejectWithValue }) => {
		try {
			const response = await fetch(
				'https://mocki.io/v1/88cf6d3f-48c0-4e8e-bbec-d89ea72325b7'
			)
			if (!response.ok) {
				throw new Error('Server error!')
			}
			const data = await response.json()
			return data as ContactDto[]
		} catch (error) {
			return rejectWithValue((error as Error).message)
		}
	}
)

export const contactsSlice = createSlice({
	name: 'contacts',
	initialState,
	reducers: {
		filterContacts: (
			state,
			action: PayloadAction<{
				name?: string
				groupId?: string
				groups: GroupContactsDto[]
			}>
		) => {
			const { name, groupId, groups } = action.payload
			let filteredContacts = [...state.all]

			if (name) {
				const searchName = name.toLowerCase()
				filteredContacts = filteredContacts.filter(({ name }) =>
					name.toLowerCase().includes(searchName)
				)
			}

			if (groupId) {
				const groupContacts = groups.find(({ id }) => id === groupId)
				if (groupContacts) {
					filteredContacts = filteredContacts.filter(({ id }) =>
						groupContacts.contactIds.includes(id)
					)
				}
			}

			state.filtered = filteredContacts
		},
		resetFilter: (state) => {
			state.filtered = [...state.all]
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchContacts.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(fetchContacts.fulfilled, (state, action) => {
				state.loading = false
				state.all = action.payload
				state.filtered = action.payload
			})
			.addCase(fetchContacts.rejected, (state, action) => {
				state.loading = false
				state.error = (action.payload as string) || 'Failed to fetch contacts'
			})
	},
})

export const { filterContacts, resetFilter } = contactsSlice.actions
export default contactsSlice.reducer
