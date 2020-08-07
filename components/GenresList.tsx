import React from 'react';
import { useQuery } from 'react-query';

const fetchGenres = async () => {
	const res = await fetch(
		'https://api.themoviedb.org/3/genre/movie/' +
			'list?api_key=5c36791d98d96dc9af65af5475e4d14e&language=en-US',
	);
	return res.json();
};

export const GenresList = () => {
	const { data, status } = useQuery('genres', fetchGenres);
	console.log(data);

	return (
		<div className='genres'>
			{status === 'success' &&
				data.genres.map(genre => {
					return <span key={genre.id}>{genre.name}</span>;
				})}
		</div>
	);
};
