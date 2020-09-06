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

	it('Renders the the movie list as expected', async () => {
		const props = {
			genre: { id: '1', name: 'Genre1' },
			setTotalPages: jest.fn(),
			page: 1,
			rating: '5',
			sort: 'asc',
		};
		await act(async () => {
			render(<SanityPicksGrid {...props} picks='gold' />);
		});
		const { debug, queryByText } = screen;
		// debug();
		expect(fetchQueryMock).toBeCalledTimes(1);
		expect(fetchQueryMock).toHaveBeenCalledWith(
			`*[_type == "movie" && genres[].id==${props.genre.id} && vote_average>${props.rating} ] [0...40] | order(${props.sort})`,
		);
		fetchQueryMock.mockClear();
		fetchQueryMock.mockReset();

		expect(queryByText(MovieMock.title)).toBeTruthy();
		expect(props.setTotalPages).toBeCalledTimes(1);
		expect(props.setTotalPages).toHaveBeenCalledWith(1);
	});
});
