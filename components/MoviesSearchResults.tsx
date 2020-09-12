import React, { useState } from 'react';
import { usePaginatedQuery, useQuery } from 'react-query';
import { Movie } from '../types/Movie';
import { CardsGrid } from './MoviesGrid';

const fetchSearch = async (_key, query: string, page: number) => {
	return (
		await fetch(`api/search?query=${query}&page=${page}&full=true`)
	).json();
};
interface Props {
	searchQuery: string;
	page: number;
	setTotalPages: (newNbr: number) => void;
}
const MoviesSearchResults = ({ searchQuery, page, setTotalPages }: Props) => {
	if (!searchQuery?.trim().length) {
		setTotalPages(0);

		return (
			<h1 style={{ gridColumn: 'span 2', textAlign: 'center' }}>
				Please Type Something To Search . . .
			</h1>
		);
	}
	const { resolvedData, latestData, status } = usePaginatedQuery(
		['search', searchQuery, page],
		fetchSearch,
	);
	let results = [];
	if (status === 'success') {
		results = resolvedData.results;
		setTotalPages(resolvedData.total_pages);
	}

	return <CardsGrid {...{ resolvedData, latestData, results }} />;
};

export default MoviesSearchResults;
