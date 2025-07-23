import { memo } from 'react'
import { Col, Row } from 'react-bootstrap'
import { GroupContactsCard } from 'src/components/GroupContactsCard'
import { useAppSelector } from 'src/redux/hooks'
import { groupContactsSelector } from 'src/redux/selectors'
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto'

export const GroupListPage = memo(() => {
	const groupContactsState: GroupContactsDto[] = useAppSelector(
		groupContactsSelector
	)
	return (
		<Row xxl={4}>
			{groupContactsState.map((groupContacts) => (
				<Col key={groupContacts.id}>
					<GroupContactsCard
						groupContacts={groupContacts}
						withLink
					/>
				</Col>
			))}
		</Row>
	)
})
