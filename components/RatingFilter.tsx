import React from 'react';
import { Button, Form } from 'semantic-ui-react';

import { Slider } from 'baseui/slider';
const MySlider = () => {
	const [value, setValue] = React.useState([25, 75]);
	return <Slider value={value} onChange={({ value }) => setValue(value)} />;
};

interface Prop {
	rating: string;
	onChange: (newRating: string) => void;
}
const RatingFilter: React.FC<Prop> = ({ rating, onChange }) => {
	return (
		<div className='ratings'>
			<Form>
				<Form.Field>
					<label>Minimum Rating : </label>
					<Slider
						max={9}
						min={0}
						value={[parseInt(rating), 9]}
						onChange={({ value }) => console.log(value)}
					/>
				</Form.Field>
			</Form>
		</div>
	);
};

export default RatingFilter;
