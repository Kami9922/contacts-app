import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { Col, Row, Spinner } from 'react-bootstrap'
import { ContactCard } from 'src/components/ContactCard'
import { FilterForm } from 'src/components/FilterForm'
import { contactsStore } from '../store/contactsStore'

export const ContactListPage = observer(() => {
	const [initialized, setInitialized] = useState(false)

	useEffect(() => {
		if (!initialized) {
			contactsStore.fetchContacts()
			contactsStore.fetchGroups()
			setInitialized(true)
		}
	}, [initialized])

	const handleSubmit = (
		fv: Partial<{ name: string; groupId: string | null }>
	) => {
		contactsStore.setFilter(fv.name, fv.groupId ?? null)
	}

	if (contactsStore.contactsLoading || contactsStore.groupsLoading) {
		return (
			<div className='d-flex justify-content-center mt-5'>
				<Spinner
					animation='border'
					variant='primary'
				/>
			</div>
		)
	}

	return (
		<Row xxl={1}>
			<Col className='mb-3'>
				<FilterForm
					groupContactsList={contactsStore.groups}
					initialValues={contactsStore.filterParams}
					onSubmit={handleSubmit}
				/>
			</Col>
			<Col>
				<Row
					xxl={4}
					className='g-4'>
					{contactsStore.filteredContacts.map((contact) => (
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
