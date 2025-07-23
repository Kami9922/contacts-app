import { DATA_CONTACT } from 'src/__data__'
import { ACTION_TYPE } from '../actions/actionType'

const initialState = {
	all: DATA_CONTACT,
	filtered: DATA_CONTACT,
}

export function contactsReducer(state = initialState, action: any) {
	switch (action.type) {
		case ACTION_TYPE.SET_CONTACTS:
			return {
				...state,
				all: action.payload,
			}
		default:
			return state
	}
}
