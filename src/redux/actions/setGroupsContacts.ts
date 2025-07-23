import { GroupContactsDto } from 'src/types/dto/GroupContactsDto'
import { ACTION_TYPE } from './actionType'

export const setGroupContacts = (groupContacts: GroupContactsDto[]) => ({
	type: ACTION_TYPE.SET_GROUPS_CONTACTS,
	payload: groupContacts,
})
