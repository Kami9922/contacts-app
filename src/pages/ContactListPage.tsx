import { memo, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { ContactCard } from 'src/components/ContactCard'
import { FilterForm, FilterFormValues } from 'src/components/FilterForm'
import { useAppDispatch, useAppSelector } from 'src/redux/hooks'
import { filterContacts, fetchContacts, fetchGroups } from '../redux/reducers'
import {
	filteredContactsSelector,
	groupContactsSelector,
} from 'src/redux/selectors'

export const ContactListPage = memo(() => {
	const filteredContacts = useAppSelector(filteredContactsSelector)
	const groupContactsState = useAppSelector(groupContactsSelector)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(fetchContacts())
		dispatch(fetchGroups())
	}, [dispatch])

	const onSubmit = (fv: Partial<FilterFormValues>) => {
		dispatch(
			filterContacts({
				name: fv.name,
				groupId: fv.groupId,
				groups: groupContactsState,
			})
		)
	}

	return (
		<Row xxl={1}>
			<Col className='mb-3'>
				<FilterForm
					groupContactsList={groupContactsState}
					initialValues={{}}
					onSubmit={onSubmit}
				/>
			</Col>
			<Col>
				<Row
					xxl={4}
					className='g-4'>
					{filteredContacts.map((contact) => (
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
