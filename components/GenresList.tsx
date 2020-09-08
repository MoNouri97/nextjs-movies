import React from 'react';
import { useQuery } from 'react-query';
import { Button } from 'semantic-ui-react';
import { Genre } from '../types/Genre';

const fetchGenres = async () => {
	const res = await fetch('/api/genres');
	return res.json();
};
interface Prop {
	onChange: (genre: number) => void;
	active: number[];
}
export const GenresList = ({ onChange, active }: Prop) => {
	const { data, status } = useQuery(['genres'], fetchGenres);
	return (
		<div className='genres'>
			{status === 'success' &&
				data.genres.map((genre: Genre) => {
					return (
						<Button
							className='genre'
							key={genre.id}
							onClick={() => onChange(genre.id)}
							toggle
							active={active.indexOf(genre.id) > -1}
						>
							{genre.name}
						</Button>
					);
				})}
		</div>
	);
};
