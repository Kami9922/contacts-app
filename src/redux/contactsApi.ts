import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ContactDto } from 'src/types/dto/ContactDto'
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto'

export const contactsApi = createApi({
	reducerPath: 'contactsApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://mocki.io/v1/' }),
	tagTypes: ['Contact', 'Favorite', 'Group'],
	endpoints: (builder) => ({
		getContacts: builder.query<ContactDto[], void>({
			query: () => '88cf6d3f-48c0-4e8e-bbec-d89ea72325b7',
			providesTags: ['Contact'],
		}),

		getGroups: builder.query<GroupContactsDto[], void>({
			query: () => '0a5ddcdb-3a44-43db-9301-3745ace627e2',
			providesTags: ['Group'],
		}),

		getInitialFavorites: builder.query<string[], void>({
			query: () => '88cf6d3f-48c0-4e8e-bbec-d89ea72325b7',
			transformResponse: (response: ContactDto[]) =>
				response.slice(0, 4).map((contact) => contact.id),
			providesTags: ['Favorite'],
		}),
	}),
})

export const {
	useGetContactsQuery,
	useGetGroupsQuery,
	useGetInitialFavoritesQuery,
} = contactsApi
