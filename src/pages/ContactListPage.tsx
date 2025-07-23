import { memo } from 'react'

import { Col, Row } from 'react-bootstrap'
import { ContactCard } from 'src/components/ContactCard'
import { FilterForm, FilterFormValues } from 'src/components/FilterForm'
import { setContacts } from 'src/redux/actions/setContacts'
import { useAppDispatch, useAppSelector } from 'src/redux/hooks'
import {
	contactsSelector,
	filteredContactsSelector,
	groupContactsSelector,
} from 'src/redux/selectors'
import { ContactDto } from 'src/types/dto/ContactDto'
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto'

export const ContactListPage = memo(() => {
	const filteredContacts = useAppSelector(filteredContactsSelector)
	const contacts: ContactDto[] = useAppSelector(contactsSelector)
	const groupContactsState: GroupContactsDto[] = useAppSelector(
		groupContactsSelector
	)

	const dispatch = useAppDispatch()

	const onSubmit = (fv: Partial<FilterFormValues>) => {
		let findContacts: ContactDto[] = filteredContacts

		if (fv.name) {
			const fvName = fv.name.toLowerCase()
			findContacts = findContacts.filter(
				({ name }) => name.toLowerCase().indexOf(fvName) > -1
			)
		}

		if (fv.groupId) {
			const groupContacts = groupContactsState.find(
				({ id }) => id === fv.groupId
			)

			if (groupContacts) {
				findContacts = findContacts.filter(({ id }) =>
					groupContacts.contactIds.includes(id)
				)
			}
		}

		dispatch(setContacts(findContacts))
	}

	return (
		<Row xxl={1}>
			<Col className='mb-3'>
				<FilterForm
					groupContactsList={groupContactsState}
					initialValues={{}}
					onSubmit={onSubmit}
				/>
			</Col>
			<Col>
				<Row
					xxl={4}
					className='g-4'>
					{contacts.map((contact) => (
						<Col key={contact.id}>
							<ContactCard
								contact={contact}
								withLink
							/>
						</Col>
					))}
				</Row>
			</Col>
		</Row>
	)
})
