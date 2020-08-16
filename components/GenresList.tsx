import React from 'react';
import { useQuery } from 'react-query';

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
						<span
							key={genre.id}
							onClick={() => onChange(genre)}
							className={active == genre.id ? 'active' : ''}
						>
							{genre.name}
						</span>
					);
				})}
		</div>
	);
};
