import { memo, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { GroupContactsCard } from 'src/components/GroupContactsCard'
import { useAppDispatch, useAppSelector } from 'src/redux/hooks'
import { groupContactsSelector } from 'src/redux/selectors'
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto'
import { fetchGroups } from '../redux/reducers'

export const GroupListPage = memo(() => {
	const groupContactsState: GroupContactsDto[] = useAppSelector(
		groupContactsSelector
	)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(fetchGroups())
	}, [dispatch])

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
