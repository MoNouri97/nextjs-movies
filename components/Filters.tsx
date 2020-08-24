import React from 'react';
import { Button } from 'semantic-ui-react';

interface Prop {
	rating: string;
	onChange: (string) => void;
}
const Filters: React.FC<Prop> = ({ rating, onChange }) => {
	const ratings = ['00', '10', '20', '30', '40', '50', '60', '70', '80', '90'];

	return (
		<>
			<Button>Click Here</Button>
		</>
		// <div className='ratings'>
		// 	<p>Minimum Rating : </p>
		// 	{ratings.map((r, i) => (
		// 		<span
		// 			key={i}
		// 			onClick={() => onChange(r.charAt(0))}
		// 			className={parseInt(r) < parseInt(rating) * 10 ? 'disabled' : ''}
		// 		>
		// 			{r}
		// 		</span>
		// 	))}
		// </div>
	);
};

export default Filters;
