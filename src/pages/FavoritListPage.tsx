import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { Col, Row, Spinner, Alert } from 'react-bootstrap'
import { ContactCard } from 'src/components/ContactCard'
import { contactsStore } from '../store/contactsStore'

export const FavoritListPage = observer(() => {
	useEffect(() => {
		if (contactsStore.contacts.length === 0 && !contactsStore.contactsLoading) {
			contactsStore.fetchContacts()
		}
		if (
			contactsStore.favoriteIds.length === 0 &&
			!contactsStore.favoritesLoading
		) {
			contactsStore.fetchFavorites()
		}
	}, [])

	if (contactsStore.contactsLoading || contactsStore.favoritesLoading) {
		return (
			<div className='d-flex justify-content-center mt-5'>
				<Spinner
					animation='border'
					variant='primary'
				/>
			</div>
		)
	}

	if (contactsStore.favoritesError) {
		return (
			<Alert
				variant='danger'
				className='mt-3'>
				Ошибка загрузки избранных контактов
			</Alert>
		)
	}

	const favoriteContacts = contactsStore.favoriteContacts

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
