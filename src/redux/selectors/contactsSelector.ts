import { RootState } from '../store'

export const contactsSelector = ({ contacts }: RootState) => contacts.all
