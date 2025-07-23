import { createStore, combineReducers } from 'redux'
import { contactsReducer } from './reducers/contactsReducer'
import { groupsReducer } from './reducers/groupContactsReducer'
import { favoritesReducer } from './reducers/favoriteContactsReducer'

const rootReducer = combineReducers({
	contacts: contactsReducer,
	favorites: favoritesReducer,
	groups: groupsReducer,
})

export const store = createStore(rootReducer)

export type RootState = ReturnType<typeof rootReducer>
