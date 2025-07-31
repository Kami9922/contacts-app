import { memo } from 'react'
import { Col, Row, Spinner } from 'react-bootstrap'
import { GroupContactsCard } from 'src/components/GroupContactsCard'
import { useGetGroupsQuery } from '../store/contacts/api'

export const GroupListPage = memo(() => {
	const { data: groups = [], isLoading } = useGetGroupsQuery()

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

	return (
		<Row xxl={4}>
			{groups.map((group) => (
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
