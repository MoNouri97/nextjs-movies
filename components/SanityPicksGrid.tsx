import React from 'react';
import { fetchQuery } from '../lib/sanity';
import { usePaginatedQuery } from 'react-query';
import Card from './Card';
import { Genre } from '../types/Genre';
import { OurPick } from '../types/OurPicks';
import { CardsGrid } from './MoviesGrid';
import { useTraceUpdate } from '../dev helpers/useTrace';

interface Props {
	page: number;
	genres: number[];
	rating: number[];
	sort: string;
	setTotalPages: (number) => void;
	picks: OurPick;
}

const SanityPicksGrid = ({
	page,
	genres,
	rating,
	sort,
	setTotalPages,
	picks,
}: Props) => {
	const { resolvedData, latestData, status } = usePaginatedQuery(
		[picks, page, genres, rating, sort],
		fetchSanity,
	);
	let results;

	if (status === 'success') {
		results = resolvedData;
		setTotalPages(1);
	}
	useTraceUpdate({ page, genres, rating, sort, setTotalPages, picks });
	return <CardsGrid {...{ resolvedData, latestData, results }} />;
};

export default SanityPicksGrid;

const fetchSanity = async (
	__key: string,
	page: number,
	genres: number[],
	rating: number[],
	sort: string,
) => {
	const [minR, maxR] = rating;
	const perPage = 40,
		start = perPage * (page - 1),
		end = start + perPage;

	// sort
	const formattedSort = sort.replace('.', ' ');

	// genres
	let formattedGenres: string[] | string = [];
	for (const g of genres) {
		formattedGenres.push(`genres[].id==${g}`);
	}
	formattedGenres = formattedGenres.join(' || ');

	// rating
	const formattedRating = `vote_average>${minR} && vote_average<${maxR}`;

	// query
	const constraints = `_type == "movie" ${
		formattedGenres ? `&& ${formattedGenres} ` : ''
	}&& ${formattedRating}`;

	const query = `*[ ${constraints} ] [${start}...${end}] | order(${formattedSort})`;
	console.log(query);

	return fetchQuery(query);
};
