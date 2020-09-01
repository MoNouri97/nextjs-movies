import React from 'react';
import { usePaginatedQuery } from 'react-query';
import Card from './Card';

const fetchMovies = async (
	__key: string,
	page: number,
	genre: string,
	minR: string,
	sort: string,
) => {
	let info = '';
	if (genre) info += '&with_genres=' + genre;
	if (minR) info += '&vote_average.gte=' + minR;
	if (sort) info += '&sort_by=' + sort;
	const res = await fetch(`/api/movies?page=${page}${info}`);
	return res.json();
};

interface Props {
	page: number;
	genreID: string;
	rating: string;
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

export default MoviesGrid;
