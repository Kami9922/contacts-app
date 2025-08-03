import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { Col, Row, Spinner } from 'react-bootstrap'
import { GroupContactsCard } from 'src/components/GroupContactsCard'
import { contactsStore } from '../store/contactsStore'

export const GroupListPage = observer(() => {
	useEffect(() => {
		if (contactsStore.groups.length === 0 && !contactsStore.groupsLoading) {
			contactsStore.fetchGroups()
		}
	}, [])

	if (contactsStore.groupsLoading) {
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
		<Row xxl={4}>
			{contactsStore.groups.map((group) => (
				<Col key={group.id}>
					<GroupContactsCard
						groupContacts={group}
						withLink
					/>
				</Col>
			))}
		</Row>
	)
})
