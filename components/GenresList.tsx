import React from 'react';
import { useQuery } from 'react-query';
import { Button } from 'semantic-ui-react';

const fetchGenres = async () => {
	const res = await fetch('/api/genres');
	return res.json();
};
export const GenresList = ({ onChange, active }) => {
	const { data, status } = useQuery(['genres'], fetchGenres);
	return (
		<div className='genres'>
			{status === 'success' &&
				data.genres.map(genre => {
					return (
						<Button
							className='genre'
							key={genre.id}
							onClick={() => onChange(genre)}
							toggle
							active={genre.id == active}
						>
							{genre.name}
						</Button>
					);
				})}
		</div>
	);
};
