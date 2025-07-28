import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ContactDto } from 'src/types/dto/ContactDto'

export const fetchInitialFavorites = createAsyncThunk(
	'favorites/fetchInitialFavorites',
	async () => {
		const response = await fetch(
			'https://mocki.io/v1/88cf6d3f-48c0-4e8e-bbec-d89ea72325b7'
		)
		const contacts: ContactDto[] = await response.json()
		return contacts.slice(0, 4).map((contact) => contact.id)
	}
)

const initialState: {
	ids: string[]
	loading: boolean
	error: string | null
} = {
	ids: [],
	loading: false,
	error: null,
}

export const favoritesSlice = createSlice({
	name: 'favorites',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchInitialFavorites.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(fetchInitialFavorites.fulfilled, (state, action) => {
				state.loading = false
				state.ids = action.payload
			})
			.addCase(fetchInitialFavorites.rejected, (state, action) => {
				state.loading = false
				state.error = action.error.message || 'Failed to fetch favorites'
			})
	},
})

export default favoritesSlice.reducer
