import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { Col, Row, Spinner, Alert } from 'react-bootstrap'
import { ContactCard } from 'src/components/ContactCard'
import { Empty } from 'src/components/Empty'
import { useParams } from 'react-router-dom'
import { contactsStore } from '../store/contactsStore'

export const ContactPage = observer(() => {
	const { contactId } = useParams<{ contactId: string }>()

	useEffect(() => {
		if (contactsStore.contacts.length === 0 && !contactsStore.contactsLoading) {
			contactsStore.fetchContacts()
		}
	}, [])

	if (contactsStore.contactsLoading) {
		return (
			<div className='d-flex justify-content-center mt-5'>
				<Spinner
					animation='border'
					variant='primary'
				/>
			</div>
		)
	}

	if (contactsStore.contactsError) {
		return (
			<Alert
				variant='danger'
				className='mt-3'>
				Ошибка загрузки данных контакта
			</Alert>
		)
	}

	const contact = contactsStore.contacts.find((c) => c.id === contactId)

	return (
		<Row xxl={3}>
			<Col className='mx-auto'>
				{contact ? <ContactCard contact={contact} /> : <Empty />}
			</Col>
		</Row>
	)
})
