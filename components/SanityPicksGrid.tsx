import React from 'react';
import { fetchQuery } from '../lib/sanity';
import { usePaginatedQuery } from 'react-query';
import Card from './Card';
import { Genre } from '../types/Genre';
import { OurPick } from '../types/OurPicks';
import { CardsGrid } from './MoviesGrid';

const fetchSanity = async (
	__key: string,
	page: number,
	genre: Genre,
	rating: number[],
	sort: string,
) => {
	const [minR, maxR] = rating;
	const perPage = 40,
		start = perPage * (page - 1),
		end = start + perPage;
	const formattedSort = sort.replace('.', ' ');
	const query = /* groq */ `*[_type == "movie" && genres[].id==${genre.id} && vote_average>${minR} && vote_average<${maxR} ] [${start}...${end}] | order(${formattedSort})`;

	return fetchQuery(query);
};

interface Props {
	page: number;
	genre: Genre;
	rating: number[];
	sort: string;
	setTotalPages: (number) => void;
	picks: OurPick;
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
	return <CardsGrid {...{ resolvedData, latestData, results }} />;
};

export default SanityPicksGrid;
