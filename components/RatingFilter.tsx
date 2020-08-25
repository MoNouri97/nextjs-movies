import React from 'react';
import { Button } from 'semantic-ui-react';

interface Prop {
	rating: string;
	onChange: (string) => void;
}
const RatingFilter: React.FC<Prop> = ({ rating, onChange }) => {
	const ratings = ['00', '10', '20', '30', '40', '50', '60', '70', '80', '90'];
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log(e.target.value);
		onChange(e.target.value + '');
	};
	return (
		<div className='ratings'>
			<p>Minimum Rating : </p>
			<Button.Group>
				{ratings.map((r, i) => (
					<Button
						key={i}
						onClick={() => onChange(r.charAt(0))}
						active={parseInt(r) < parseInt(rating) * 10 ? false : true}
					>
						{r}
					</Button>
				))}
			</Button.Group>
			{/* {ratings.map((r, i) => (
				<span
					key={i}
					onClick={() => onChange(r.charAt(0))}
					className={parseInt(r) < parseInt(rating) * 10 ? 'disabled' : ''}
				>
					{r}
				</span>
			))} */}
		</div>
	);
};

export default RatingFilter;
