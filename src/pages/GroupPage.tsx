import { memo } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { GroupContactsCard } from 'src/components/GroupContactsCard'
import { Empty } from 'src/components/Empty'
import { ContactCard } from 'src/components/ContactCard'
import { useAppSelector } from 'src/redux/hooks'
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto'
import { ContactDto } from 'src/types/dto/ContactDto'
import { contactsSelector, groupContactsSelector } from 'src/redux/selectors'

export const GroupPage = memo(() => {
	const { groupId } = useParams<{ groupId: string }>()

	const allContacts: ContactDto[] = useAppSelector(contactsSelector)
	const groupContacts: GroupContactsDto[] = useAppSelector(
		groupContactsSelector
	)

	const currentGroup = groupContacts.find(({ id }) => id === groupId)

	const groupContactsList = currentGroup
		? allContacts.filter((contact) =>
				currentGroup.contactIds.includes(contact.id)
		  )
		: []

	return (
		<Row className='g-4'>
			{currentGroup ? (
				<>
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
							{groupContactsList.length > 0 ? (
								groupContactsList.map((contact) => (
									<Col key={contact.id}>
										<ContactCard
											contact={contact}
											withLink
										/>
									</Col>
								))
							) : (
								<Empty />
							)}
						</Row>
					</Col>
				</>
			) : (
				<Empty />
			)}
		</Row>
	)
})
