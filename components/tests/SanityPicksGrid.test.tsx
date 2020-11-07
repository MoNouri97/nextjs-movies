import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, act } from '@testing-library/react';
import MovieMock from '../../lib/MovieMock';
import SanityPicksGrid from '../SanityPicksGrid';
import * as sanity from '../../lib/sanity';

describe('SanityPicksGrid Component', () => {
	const fetchQueryMock = jest
		.spyOn(sanity, 'fetchQuery')
		.mockImplementation(() =>
			Promise.resolve({ data: [MovieMock], total_results: '1' }),
		);
	beforeEach(() => {
		fetchQueryMock.mockClear();
	});

	it('Renders the the movie list as expected (one genre)', async () => {
		const props = {
			genres: [1],
			setTotalPages: jest.fn(),
			page: 1,
			rating: [5, 10],
			sort: 'asc',
		};
		await act(async () => {
			render(<SanityPicksGrid {...props} picks='gold' />);
		});
		const { debug, queryByText } = screen;
		expect(fetchQueryMock).toBeCalledTimes(1);

		// query
		const formattedGenres = `genres[].id==${props.genres[0]}`;
		const constraints = `_type == "movie" ${
			formattedGenres ? `&& ${formattedGenres} ` : ''
		}&& vote_average>${props.rating[0]} && vote_average<${props.rating[1]}`;

		// spacing is like this to match the query exactly
		const query = /* groq */ `{
		"data" : *[ ${constraints} ] [0...40] | order(${props.sort.replace('.', ' ')}),
		"total_results": count(*[ ${constraints} ])
	}`;
		expect(fetchQueryMock).toHaveBeenCalledWith(query);
		expect(queryByText(MovieMock.title)).toBeTruthy();
		expect(props.setTotalPages).toBeCalledTimes(1);
		expect(props.setTotalPages).toHaveBeenCalledWith(1);
	});
	it('Renders the the movie list as expected (2+ genre)', async () => {
		const props = {
			genres: [1, 2],
			setTotalPages: jest.fn(),
			page: 1,
			rating: [5, 10],
			sort: 'asc',
		};

		await act(async () => {
			render(<SanityPicksGrid {...props} picks='gold' />);
		});
		const { debug, queryByText } = screen;
		// debug();
		expect(fetchQueryMock).toBeCalledTimes(1);
		// query
		const formattedGenres = `genres[].id==${props.genres[0]} || genres[].id==${props.genres[1]}`;
		const constraints = `_type == "movie" ${
			formattedGenres ? `&& ${formattedGenres} ` : ''
		}&& vote_average>${props.rating[0]} && vote_average<${props.rating[1]}`;

		// spacing is like this to match the query exactly
		const query = /* groq */ `{
		"data" : *[ ${constraints} ] [0...40] | order(${props.sort.replace('.', ' ')}),
		"total_results": count(*[ ${constraints} ])
	}`;
		expect(fetchQueryMock).toHaveBeenCalledWith(query);
	});
	it('Renders the the movie list as expected (0 genres)', async () => {
		const props = {
			genres: [],
			setTotalPages: jest.fn(),
			page: 1,
			rating: [5, 10],
			sort: 'asc',
		};
		await act(async () => {
			render(<SanityPicksGrid {...props} picks='gold' />);
		});
		const { debug, queryByText } = screen;
		// debug();
		expect(fetchQueryMock).toBeCalledTimes(1);
		// query
		const formattedGenres = ``;
		const constraints = `_type == "movie" ${
			formattedGenres ? `&& ${formattedGenres} ` : ''
		}&& vote_average>${props.rating[0]} && vote_average<${props.rating[1]}`;

		// spacing is like this to match the query exactly
		const query = /* groq */ `{
		"data" : *[ ${constraints} ] [0...40] | order(${props.sort.replace('.', ' ')}),
		"total_results": count(*[ ${constraints} ])
	}`;
		expect(fetchQueryMock).toHaveBeenCalledWith(query);
	});
});
