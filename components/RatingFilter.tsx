import React from 'react';
import { Button, Form } from 'semantic-ui-react';

import { Slider } from 'baseui/slider';
const MySlider = () => {
	const [value, setValue] = React.useState([25, 75]);
	return <Slider value={value} onChange={({ value }) => setValue(value)} />;
};

interface Prop {
	rating: number[];
	onChange: (newRating: number[]) => void;
}
const RatingFilter: React.FC<Prop> = ({ rating, onChange }) => {
	return (
		<div className='ratings'>
			<Form>
				<Form.Field>
					<label>Minimum Rating : </label>
					<Slider
						max={10}
						min={0}
						step={0.1}
						value={rating}
						onChange={({ value }) => onChange(value)}
					/>
				</Form.Field>
			</Form>
		</div>
	);
};

export default RatingFilter;
