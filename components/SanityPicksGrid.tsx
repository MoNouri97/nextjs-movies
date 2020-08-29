import React from 'react';
import { fetchQuery } from '../lib/sanity';
import { usePaginatedQuery } from 'react-query';
import Card from './Card';
const fetchSanity = async (
	__key: string,
	page: number,
	genre: string,
	minR: string,
	sort: string,
) => {
	const query = /* groq */ `*[_type == "movie"]`;
	return fetchQuery(query);
};
interface Props {
	page: number;
	genreID: string;
	rating: string;
	sort: string;
	setTotalPages: (number) => void;
	picks: 'gold' | 'silver';
}

const SanityPicksGrid = ({
	page,
	genreID,
	rating,
	sort,
	setTotalPages,
	picks,
}: Props) => {
	const { resolvedData, latestData, status } = usePaginatedQuery(
		[picks, page, genreID, rating, sort],
		fetchSanity,
	);
	let results = [];

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
