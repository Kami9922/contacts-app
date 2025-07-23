import { useEffect, useState } from 'react'

import { Col, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { ContactDto } from 'src/types/dto/ContactDto'
import { ContactCard } from 'src/components/ContactCard'
import { Empty } from 'src/components/Empty'
import { useAppSelector } from 'src/redux/hooks'
import { contactsSelector } from 'src/redux/selectors'

export const ContactPage = () => {
	const contacts: ContactDto[] = useAppSelector(contactsSelector)
	const { contactId } = useParams<{ contactId: string }>()
	const [contact, setContact] = useState<ContactDto>()

	useEffect(() => {
		setContact(() => contacts.find(({ id }) => id === contactId))
	}, [contactId, contacts])

	return (
		<Row xxl={3}>
			<Col className={'mx-auto'}>
				{contact ? <ContactCard contact={contact} /> : <Empty />}
			</Col>
		</Row>
	)
}
