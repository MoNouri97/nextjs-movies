import React from 'react';

interface Prop {
	rating: string;
	setRating: (string) => void;
}
const Filters: React.FC<Prop> = ({ rating, setRating }) => {
	const ratings = ['00', '10', '20', '30', '40', '50', '60', '70', '80', '90'];

	return (
		<div className='ratings'>
			<p>Minimum Rating : </p>
			{ratings.map((r, i) => (
				<span
					key={i}
					onClick={() => setRating(r.charAt(0))}
					className={parseInt(r) < parseInt(rating) * 10 ? 'disabled' : ''}
				>
					{r}
				</span>
			))}
		</div>
	);
};

export default Filters;
