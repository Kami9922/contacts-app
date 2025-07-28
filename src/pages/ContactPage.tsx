import { Col, Row, Spinner, Alert } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { ContactCard } from 'src/components/ContactCard'
import { Empty } from 'src/components/Empty'
import { useGetContactsQuery } from '../redux/contactsApi'

export const ContactPage = () => {
	const { contactId } = useParams<{ contactId: string }>()
	const { data: contacts = [], isLoading, isError } = useGetContactsQuery()

	const contact = contacts.find((c) => c.id === contactId)

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

	if (isError) {
		return (
			<Alert
				variant='danger'
				className='mt-3'>
				Ошибка загрузки данных контакта
			</Alert>
		)
	}

	return (
		<Row xxl={3}>
			<Col className='mx-auto'>
				{contact ? <ContactCard contact={contact} /> : <Empty />}
			</Col>
		</Row>
	)
}
