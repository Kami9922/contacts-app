import { memo, useEffect } from 'react'
import { Col, Row, Spinner, Alert } from 'react-bootstrap'
import { ContactCard } from 'src/components/ContactCard'
import { useAppDispatch, useAppSelector } from 'src/redux/hooks'
import { filteredContactsSelector } from 'src/redux/selectors'
import { fetchInitialFavorites, fetchContacts } from '../redux/reducers'

export const FavoritListPage = memo(() => {
	const dispatch = useAppDispatch()

	const contacts = useAppSelector(filteredContactsSelector)
	const {
		ids: favoriteIds,
		loading: favoritesLoading,
		error: favoritesError,
	} = useAppSelector((state) => state.favorites)
	const { loading: contactsLoading, error: contactsError } = useAppSelector(
		(state) => state.contacts
	)

	useEffect(() => {
		dispatch(fetchContacts())
		dispatch(fetchInitialFavorites())
	}, [dispatch])

	const isLoading = contactsLoading || favoritesLoading
	const error = contactsError || favoritesError

	const favoriteContactsList = isLoading
		? []
		: contacts.filter((contact) => favoriteIds.includes(contact.id))

	if (isLoading) {
		return (
			<div className='d-flex justify-content-center mt-5'>
				<Spinner
					animation='border'
					variant='primary'
				/>
			</div>
		)
	}

	if (error) {
		return <Alert variant='danger'>Ошибка загрузки данных: {error}</Alert>
	}

	if (!isLoading && favoriteContactsList.length === 0) {
		return (
			<Alert variant='info'>
				Нет избранных контактов. Добавьте контакты в избранное.
			</Alert>
		)
	}

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
