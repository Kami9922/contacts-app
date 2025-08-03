import { makeAutoObservable } from 'mobx'
import { ContactDto } from 'src/types/dto/ContactDto'
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto'

const CONTACTS_URL = 'https://mocki.io/v1/88cf6d3f-48c0-4e8e-bbec-d89ea72325b7'
const GROUPS_URL = 'https://mocki.io/v1/0a5ddcdb-3a44-43db-9301-3745ace627e2'

interface ContactsStore {
	contacts: ContactDto[]
	groups: GroupContactsDto[]
	favoriteIds: string[]

	contactsLoading: boolean
	groupsLoading: boolean
	favoritesLoading: boolean

	contactsError: string | null
	groupsError: string | null
	favoritesError: string | null

	filterParams: {
		name?: string
		groupId: string | null
	}

	fetchContacts: () => Generator<Promise<Response>, void, any>
	fetchGroups: () => Generator<Promise<Response>, void, any>
	fetchFavorites: () => Generator<Promise<Response>, void, any>

	setFilter: (name?: string, groupId?: string | null) => void

	filteredContacts: ContactDto[]
	favoriteContacts: ContactDto[]
}

export const contactsStore = makeAutoObservable<ContactsStore>({
	contacts: [],
	groups: [],
	favoriteIds: [],

	contactsLoading: false,
	groupsLoading: false,
	favoritesLoading: false,

	contactsError: null,
	groupsError: null,
	favoritesError: null,

	filterParams: {
		name: undefined,
		groupId: null,
	},

	*fetchContacts() {
		this.contactsLoading = true
		this.contactsError = null
		try {
			const res = yield fetch(CONTACTS_URL)
			if (!res.ok) throw new Error('Failed to fetch contacts')
			const data: ContactDto[] = yield res.json()
			this.contacts = data
		} catch (error: any) {
			this.contactsError = error.message
		} finally {
			this.contactsLoading = false
		}
	},

	*fetchGroups() {
		this.groupsLoading = true
		this.groupsError = null
		try {
			const res = yield fetch(GROUPS_URL)
			if (!res.ok) throw new Error('Failed to fetch groups')
			const data: GroupContactsDto[] = yield res.json()
			this.groups = data
		} catch (error: any) {
			this.groupsError = error.message
		} finally {
			this.groupsLoading = false
		}
	},

	*fetchFavorites() {
		this.favoritesLoading = true
		this.favoritesError = null
		try {
			const res = yield fetch(CONTACTS_URL)
			if (!res.ok) throw new Error('Failed to fetch favorites')
			const data: ContactDto[] = yield res.json()
			this.favoriteIds = data.slice(0, 4).map((contact) => contact.id)
		} catch (error: any) {
			this.favoritesError = error.message
		} finally {
			this.favoritesLoading = false
		}
	},

	setFilter(name?: string, groupId?: string | null) {
		this.filterParams = { name, groupId: groupId ?? null }
	},

	get filteredContacts() {
		const { name, groupId } = this.filterParams
		let filtered = this.contacts

		if (name) {
			const lowerName = name.toLowerCase()
			filtered = filtered.filter((contact: ContactDto) =>
				contact.name.toLowerCase().includes(lowerName)
			)
		}

		if (groupId) {
			const group = this.groups.find((group) => group.id === groupId)
			if (group) {
				filtered = filtered.filter((contact: ContactDto) =>
					group.contactIds.includes(contact.id)
				)
			} else {
				filtered = []
			}
		}

		return filtered
	},

	get favoriteContacts() {
		return this.contacts.filter((contact: ContactDto) =>
			this.favoriteIds.includes(contact.id)
		)
	},
})
