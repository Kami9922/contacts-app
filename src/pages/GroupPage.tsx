import { memo } from 'react'
import { Alert, Col, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { GroupContactsCard } from 'src/components/GroupContactsCard'
import { ContactCard } from 'src/components/ContactCard'
import { useGetContactsQuery, useGetGroupsQuery } from 'src/store/contacts/api'

export const GroupPage = memo(() => {
	const { groupId } = useParams<{ groupId: string }>()
	const { data: contacts = [] } = useGetContactsQuery()
	const { data: groups = [] } = useGetGroupsQuery()

	const currentGroup = groups.find((g) => g.id === groupId)
	const groupContacts = currentGroup
		? contacts.filter((contact) => currentGroup.contactIds.includes(contact.id))
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
