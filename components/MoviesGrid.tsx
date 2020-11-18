import React from 'react';
import { usePaginatedQuery } from 'react-query';
import { Movie } from '../types/Movie';
import Card from './Card';

const fetchMovies = async (
	__key: string,
	page: number,
	genres: number[],
	rating: number[],
	sort: string,
) => {
	let info = '';

	if (genres) info += '&with_genres=' + genres.join('|');
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
	genres: number[];
	rating: number[];
	sort: string;
	setTotalPages: (number) => void;
	watched: any[];
}

const MoviesGrid = ({
	setTotalPages,
	page,
	genres,
	rating,
	sort,
	watched,
}: Props) => {
	const { resolvedData, latestData, status } = usePaginatedQuery(
		['movies', page, genres, rating, sort],
		fetchMovies,
		{
			staleTime: Infinity,
		},
	);
	const isWatched = (movie: Movie) => {
		for (const w of watched) {
			if (movie.id == w.tmdbId) {
				return true;
			}
		}
		return false;
	};
	let results = [];

	if (status === 'success') {
		results = resolvedData.results;
		if (watched) {
			results = results.filter((movie: Movie) => !isWatched(movie));
		}
		setTotalPages(resolvedData.total_pages);
	}
	return <CardsGrid {...{ resolvedData, latestData, results }} />;
};

export default MoviesGrid;

export const CardsGrid = ({ resolvedData, latestData, results }) => {
	return (
		<>
			{resolvedData && (
				<p style={{ textAlign: 'center' }}>
					{resolvedData.total_results} results were found
				</p>
			)}
			<div className='grid'>
				{resolvedData != latestData && (
					<div className='loading'>
						<span></span>
					</div>
				)}
				{resolvedData &&
					(results?.length > 0 ? (
						results.map((movie, i) => <Card key={i} movie={movie} />)
					) : (
						<h1 style={{ gridColumn: 'span 2', textAlign: 'center' }}>
							Please change your search criteria and try again
						</h1>
					))}
			</div>
		</>
	);
};
