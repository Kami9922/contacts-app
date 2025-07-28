import { memo } from 'react'
import { Col, Row, Alert, Spinner } from 'react-bootstrap'
import { ContactCard } from 'src/components/ContactCard'
import {
	useGetContactsQuery,
	useGetInitialFavoritesQuery,
} from '../redux/contactsApi'

export const FavoritListPage = memo(() => {
	const { data: contacts = [], isLoading: contactsLoading } =
		useGetContactsQuery()
	const { data: favoriteIds = [], isLoading: favoritesLoading } =
		useGetInitialFavoritesQuery()

	if (contactsLoading || favoritesLoading) {
		return (
			<div className='d-flex justify-content-center mt-5'>
				<Spinner
					animation='border'
					variant='primary'
				/>
			</div>
		)
	}

	const favoriteContacts = contacts.filter((contact) =>
		favoriteIds.includes(contact.id)
	)

	if (favoriteContacts.length === 0) {
		return <Alert variant='info'>Нет избранных контактов</Alert>
	}

	return (
		<Row
			xxl={4}
			className='g-4'>
			{favoriteContacts.map((contact) => (
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
