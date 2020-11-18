import { useState } from 'react';

export const useFilters = () => {
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(500);
	const [genres, setGenres] = useState<number[]>([16]);
	const [rating, setRating] = useState([5, 10]);
	const [sort, setSort] = useState('popularity.desc');
	const [search, setSearch] = useState('');

	return {
		page,
		setPage,
		totalPages,
		setTotalPages,
		genres,
		setGenres,
		rating,
		setRating,
		sort,
		setSort,
		search,
		setSearch,
	};
};
