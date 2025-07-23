import { memo } from 'react'

import { Col, Row } from 'react-bootstrap'
import { ContactCard } from 'src/components/ContactCard'
import { useAppSelector } from 'src/redux/hooks'
import { contactsSelector, favoritesSelector } from 'src/redux/selectors'
import { ContactDto } from 'src/types/dto/ContactDto'

export const FavoritListPage = memo(() => {
	const contacts: ContactDto[] = useAppSelector(contactsSelector)
	const favoriteContacts = useAppSelector(favoritesSelector)

	const favoriteContactsList = contacts.filter(({ id }) =>
		favoriteContacts.includes(id)
	)

	return (
		<Row
			xxl={4}
			className='g-4'>
			{favoriteContactsList.map((contact) => (
				<Col key={contact.id}>
					<ContactCard
						contact={contact}
						withLink
					/>
				</Col>
			))}
		</Row>
	)
})
