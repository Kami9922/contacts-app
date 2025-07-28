import { configureStore } from '@reduxjs/toolkit'
import contactsReducer from './reducers/contactsSlice'
import favoritesReducer from './reducers/favoritesSlice'
import groupsReducer from './reducers/groupsSlice'

export const store = configureStore({
	reducer: {
		contacts: contactsReducer,
		favorites: favoritesReducer,
		groups: groupsReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
