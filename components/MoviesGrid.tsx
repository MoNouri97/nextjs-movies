import React from 'react';
import { usePaginatedQuery } from 'react-query';
import Card from './Card';
import { Header } from 'semantic-ui-react';

const fetchMovies = async (
	__key: string,
	page: number,
	genre: string,
	rating: number[],
	sort: string,
) => {
	let info = '';
	if (genre) info += '&with_genres=' + genre;
	if (rating) {
		const [minR, maxR] = rating;
		info += '&vote_average.gte=' + minR;
		info += '&vote_average.lte=' + maxR;
	}
	if (sort) info += '&sort_by=' + sort;
	const res = await fetch(`/api/movies?page=${page}${info}`);
	return res.json();
};

interface Props {
	page: number;
	genreID: string;
	rating: number[];
	sort: string;
	setTotalPages: (number) => void;
}

const MoviesGrid = ({ setTotalPages, page, genreID, rating, sort }: Props) => {
	const { resolvedData, latestData, status } = usePaginatedQuery(
		['movies', page, genreID, rating, sort],
		fetchMovies,
	);

	let results = [];

	if (status === 'success') {
		results = resolvedData.results;
		setTotalPages(resolvedData.total_pages);
	}
	return <CardsGrid {...{ resolvedData, latestData, results }} />;
};

export default MoviesGrid;

export const CardsGrid = ({ resolvedData, latestData, results }) => {
	return (
		<div className='grid'>
			{resolvedData != latestData && (
				<div className='loading'>
					<span></span>
				</div>
			)}
			{resolvedData &&
				(results.length > 0 ? (
					results.map((movie, i) => <Card key={i} movie={movie} />)
				) : (
					<h1 style={{ gridColumn: 'span 2', textAlign: 'center' }}>
						Oops No results{':('}
					</h1>
				))}
		</div>
	);
};
