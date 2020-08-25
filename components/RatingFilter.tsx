import React from 'react';

interface Prop {
	rating: string;
	onChange: (string) => void;
}
const RatingFilter: React.FC<Prop> = ({ rating, onChange }) => {
	const ratings = ['00', '10', '20', '30', '40', '50', '60', '70', '80', '90'];

	return (
		<div className='ratings'>
			<p>Minimum Rating : </p>
			{ratings.map((r, i) => (
				<span
					key={i}
					onClick={() => onChange(r.charAt(0))}
					className={parseInt(r) < parseInt(rating) * 10 ? 'disabled' : ''}
				>
					{r}
				</span>
			))}
		</div>
	);
};

export default RatingFilter;
