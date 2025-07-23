import { RootState } from '../store'

export const filteredContactsSelector = ({ contacts }: RootState) =>
	contacts.filtered
