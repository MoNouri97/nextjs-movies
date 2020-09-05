import React from 'react';
import { Button, Form } from 'semantic-ui-react';

interface Prop {
	rating: string;
	onChange: (newRating: string) => void;
}
const RatingFilter: React.FC<Prop> = ({ rating, onChange }) => {
	const ratings = ['00', '10', '20', '30', '40', '50', '60', '70', '80', '90'];

	return (
		<div className='ratings'>
			<Form>
				<Form.Field>
					<label>Minimum Rating : </label>

					<Button.Group>
						{ratings.map((r, i) => (
							<Button
								toggle
								key={i}
								onClick={() => onChange(r.charAt(0))}
								active={parseInt(r) < parseInt(rating) * 10 ? false : true}
							>
								{r}
							</Button>
						))}
					</Button.Group>
				</Form.Field>
			</Form>
		</div>
	);
};

export default RatingFilter;
