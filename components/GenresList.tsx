import React from 'react';
import { useQuery } from 'react-query';
import { Button } from 'semantic-ui-react';

const fetchGenres = async (__key, endpoint) => {
	const res = await fetch(endpoint);
	return res.json();
};
export const GenresList = ({ endpoint, onChange, active }) => {
	const { data, status } = useQuery(['genres', endpoint], fetchGenres);
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
