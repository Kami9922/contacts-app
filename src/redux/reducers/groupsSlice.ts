import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto'

interface GroupsState {
	items: GroupContactsDto[]
	loading: boolean
	error: string | null
}

const initialState: GroupsState = {
	items: [],
	loading: false,
	error: null,
}

export const fetchGroups = createAsyncThunk('groups/fetchGroups', async () => {
	const response = await fetch(
		'https://mocki.io/v1/0a5ddcdb-3a44-43db-9301-3745ace627e2'
	)
	return (await response.json()) as GroupContactsDto[]
})

export const groupsSlice = createSlice({
	name: 'groups',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchGroups.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(fetchGroups.fulfilled, (state, action) => {
				state.loading = false
				state.items = action.payload
			})
			.addCase(fetchGroups.rejected, (state, action) => {
				state.loading = false
				state.error = action.error.message || 'Failed to fetch groups'
			})
	},
})

export default groupsSlice.reducer
