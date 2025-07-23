import { ContactDto } from 'src/types/dto/ContactDto'
import { ACTION_TYPE } from './actionType'

export const setContacts = (allContacts: ContactDto[]) => ({
	type: ACTION_TYPE.SET_CONTACTS,
	payload: allContacts,
})
