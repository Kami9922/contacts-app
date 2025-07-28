import { Formik } from 'formik'
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap'
import { memo } from 'react'
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto'

export interface FilterFormValues {
	name: string
	groupId: string | null
}

interface FilterFormProps {
	onSubmit: (values: Partial<FilterFormValues>) => void
	initialValues?: Partial<FilterFormValues>
	groupContactsList: GroupContactsDto[]
}

export const FilterForm = memo<FilterFormProps>(
	({ onSubmit, initialValues = {}, groupContactsList }) => {
		return (
			<Formik
				initialValues={{ name: '', groupId: null, ...initialValues }}
				onSubmit={(values) => {
					onSubmit({
						name: values.name || '',
						groupId: values.groupId,
					})
				}}>
				{({ handleChange, handleSubmit, values, setFieldValue }) => (
					<Form
						onSubmit={handleSubmit}
						onChange={handleSubmit}>
						<Row
							xxl={4}
							className='g-4'>
							<Col>
								<InputGroup className='mb-3'>
									<Form.Control
										name='name'
										onChange={handleChange}
										value={values.name || ''}
										placeholder='name'
										aria-label='name'
									/>
								</InputGroup>
							</Col>
							<Col>
								<Form.Select
									name='groupId'
									value={values.groupId || ''}
									onChange={(e) => {
										const value = e.target.value === '' ? null : e.target.value
										setFieldValue('groupId', value)
										handleSubmit()
									}}
									aria-label='Поиск по группе'>
									<option value=''>Open this select menu</option>
									{groupContactsList.map((group) => (
										<option
											key={group.id}
											value={group.id}>
											{group.name}
										</option>
									))}
								</Form.Select>
							</Col>
							<Col>
								<Button
									variant='primary'
									type='submit'>
									Apply
								</Button>
							</Col>
						</Row>
					</Form>
				)}
			</Formik>
		)
	}
)
