import { memo, useState } from 'react'
import { Col, Row, Spinner } from 'react-bootstrap'
import { ContactCard } from 'src/components/ContactCard'
import { FilterForm } from 'src/components/FilterForm'
import { useGetContactsQuery, useGetGroupsQuery } from '../redux/contactsApi'

export const ContactListPage = memo(() => {
	const [filters, setFilters] = useState<{
		name?: string
		groupId?: string | null
	}>({})

	const { data: contacts = [], isLoading: contactsLoading } =
		useGetContactsQuery()
	const { data: groups = [], isLoading: groupsLoading } = useGetGroupsQuery()

	const handleSubmit = (
		fv: Partial<{ name: string; groupId: string | null }>
	) => {
		setFilters({
			name: fv.name,
			groupId: fv.groupId,
		})
	}

	const filteredContacts = contacts.filter((contact) => {
		const nameMatch = filters.name
			? contact.name.toLowerCase().includes(filters.name.toLowerCase())
			: true

		const groupMatch = filters.groupId
			? groups.some(
					(group) =>
						group.id === filters.groupId &&
						group.contactIds.includes(contact.id)
			  )
			: true

		return nameMatch && groupMatch
	})

	if (contactsLoading || groupsLoading) {
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
					groupContactsList={groups}
					initialValues={filters}
					onSubmit={handleSubmit}
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
