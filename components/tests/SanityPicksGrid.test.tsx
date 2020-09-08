import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, act } from '@testing-library/react';
import MovieMock from '../../lib/MovieMock';
import SanityPicksGrid from '../SanityPicksGrid';
import * as sanity from '../../lib/sanity';

describe('SanityPicksGrid Component', () => {
	const fetchQueryMock = jest
		.spyOn(sanity, 'fetchQuery')
		.mockImplementation(() => Promise.resolve([MovieMock]));
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
		// debug();
		expect(fetchQueryMock).toBeCalledTimes(1);
		expect(fetchQueryMock).toHaveBeenCalledWith(
			`*[ _type == "movie" && genres[].id==${props.genres[0]} && vote_average>${props.rating[0]} && vote_average<${props.rating[1]} ] [0...40] | order(${props.sort})`,
		);

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
		expect(fetchQueryMock).toHaveBeenCalledWith(
			`*[ _type == "movie" && genres[].id==${props.genres[0]} || genres[].id==${props.genres[1]} && vote_average>${props.rating[0]} && vote_average<${props.rating[1]} ] [0...40] | order(${props.sort})`,
		);
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
		expect(fetchQueryMock).toHaveBeenCalledWith(
			`*[ _type == "movie" && vote_average>${props.rating[0]} && vote_average<${props.rating[1]} ] [0...40] | order(${props.sort})`,
		);
	});
});
