import React from 'react';
import { Select, Form } from 'semantic-ui-react';

const option = [
	{
		key: 'popular',
		text: 'Popularity',
		value: 'popularity.desc',
	},
	{
		key: 'release',
		text: 'Release Date',
		value: 'primary_release_date.desc',
	},
	{
		key: 'revenue',
		text: 'Revenue',
		value: 'revenue.desc',
	},
];

type Props = {
	sort: string;
	onChange: (string) => void;
};
const SortBy = ({ sort, onChange }: Props) => {
	const handleChange = (e, { value }) => onChange(value);

	return (
		<div>
			<Form>
				<Form.Group>
					<Form.Field
						className='sortBy'
						control={Select}
						onChange={handleChange}
						value={sort}
						label='Sort By:'
						options={option}
					/>
				</Form.Group>
			</Form>
		</div>
	);
};

export default SortBy;
