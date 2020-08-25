import React from 'react';
import { Select, Form } from 'semantic-ui-react';

const option = [
	{
		key: 'popular',
		text: 'Popularity',
		value: 'popular',
	},
	{
		key: 'release',
		text: 'Release Date',
		value: 'release',
	},
	{
		key: 'revenue',
		text: 'Revenue',
		value: 'revenue',
	},
];
const SortBy = () => {
	return (
		<div>
			<Form>
				<Form.Group>
					<Form.Field
						className='sortBy'
						control={Select}
						defaultValue='popular'
						label='Sort By:'
						options={option}
					/>
				</Form.Group>
			</Form>
		</div>
	);
};

export default SortBy;
