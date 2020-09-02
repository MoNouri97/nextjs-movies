import React from 'react';
import { fetchQuery } from '../lib/sanity';
import { usePaginatedQuery } from 'react-query';
import Card from './Card';
import { Genre } from '../types/Genre';
const fetchSanity = async (
	__key: string,
	page: number,
	genre: Genre,
	minR: string,
	sort: string,
) => {
	const perPage = 40,
		start = perPage * (page - 1),
		end = start + perPage;
	const formattedSort = sort.replace('.', ' ');
	const query = /* groq */ `*[_type == "movie" &&
	genres[].id==${genre.id} &&
	vote_average>${minR} ]
	[${start}...${end}]
	| order(${formattedSort})`;

	return fetchQuery(query);
};
interface Props {
	page: number;
	genre: Genre;
	rating: string;
	sort: string;
	setTotalPages: (number) => void;
	picks: 'gold' | 'silver';
}

const SanityPicksGrid = ({
	page,
	genre,
	rating,
	sort,
	setTotalPages,
	picks,
}: Props) => {
	const { resolvedData, latestData, status } = usePaginatedQuery(
		[picks, page, genre, rating, sort],
		fetchSanity,
	);
	let results;

	if (status === 'success') {
		results = resolvedData;
		setTotalPages(1);
	}
	return (
		<div className='grid'>
			{resolvedData != latestData && (
				<div className='loading'>
					<span></span>
				</div>
			)}
			{resolvedData &&
				results.map((movie, i) => <Card key={i} movie={movie} />)}
		</div>
	);
};

export default SanityPicksGrid;
