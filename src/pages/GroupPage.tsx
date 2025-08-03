import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { Alert, Col, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { GroupContactsCard } from 'src/components/GroupContactsCard'
import { ContactCard } from 'src/components/ContactCard'
import { contactsStore } from '../store/contactsStore'

export const GroupPage = observer(() => {
	const { groupId } = useParams<{ groupId: string }>()

	useEffect(() => {
		if (contactsStore.groups.length === 0 && !contactsStore.groupsLoading) {
			contactsStore.fetchGroups()
		}
		if (contactsStore.contacts.length === 0 && !contactsStore.contactsLoading) {
			contactsStore.fetchContacts()
		}
	}, [])

	const currentGroup = contactsStore.groups.find((g) => g.id === groupId)
	const groupContacts = currentGroup
		? contactsStore.contacts.filter((contact) =>
				currentGroup.contactIds.includes(contact.id)
		  )
		: []

	if (!currentGroup) {
		return <Alert variant='warning'>Группа не найдена</Alert>
	}

	return (
		<Row className='g-4'>
			<Col xxl={12}>
				<Row xxl={3}>
					<Col className='mx-auto'>
						<GroupContactsCard
							groupContacts={currentGroup}
							withLink={false}
						/>
					</Col>
				</Row>
			</Col>
			<Col>
				<Row
					xxl={4}
					className='g-4'>
					{groupContacts.length > 0 ? (
						groupContacts.map((contact) => (
							<Col key={contact.id}>
								<ContactCard
									contact={contact}
									withLink
								/>
							</Col>
						))
					) : (
						<Alert variant='info'>В группе нет контактов</Alert>
					)}
				</Row>
			</Col>
		</Row>
	)
})
