import { configureStore } from '@reduxjs/toolkit'
import { contactsApi } from './contacts/api'
import filterReducer from './contacts/slice'

export const store = configureStore({
	reducer: {
		[contactsApi.reducerPath]: contactsApi.reducer,
		filter: filterReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(contactsApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
