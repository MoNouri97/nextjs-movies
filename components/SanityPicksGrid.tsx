import React from 'react';
import { fetchQuery } from '../lib/sanity';
import { usePaginatedQuery } from 'react-query';

import { OurPick } from '../types/OurPicks';
import { CardsGrid } from './MoviesGrid';

const PER_PAGE = 40;

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
		{
			staleTime: Infinity,
		},
	);
	let results;

	if (status === 'success') {
		results = resolvedData.data;

		setTotalPages(Math.ceil(resolvedData.total_results / PER_PAGE));
	}
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
	const [minR, maxR] = rating,
		start = PER_PAGE * (page - 1),
		end = start + PER_PAGE;

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

	const query = /* groq */ `{
		"data" : *[ ${constraints} ] [${start}...${end}] | order(${formattedSort}),
		"total_results": count(*[ ${constraints} ])
	}`;

	return fetchQuery(query);
};
