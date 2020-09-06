import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, act } from '@testing-library/react';
import MoviesGrid from '../MoviesGrid';
import MovieMock from '../../lib/MovieMock';

describe('MoviesGrid Component', () => {
	it('Renders the the movie list as expected', async () => {
		let res: Response;
		global.fetch = jest.fn(() =>
			Promise.resolve({
				...res,
				json: () =>
					Promise.resolve({
						results: [MovieMock],
						total_pages: 1,
					}),
			}),
		);
		const props = {
			genreID: '1',
			setTotalPages: jest.fn(),
			page: 1,
			rating: '5',
			sort: 'asc',
		};
		await act(async () => {
			render(<MoviesGrid {...props} />);
		});
		const { debug, queryByText } = screen;
		// debug();
		expect(global.fetch).toBeCalledWith(
			`/api/movies?page=${props.page}&with_genres=${props.genreID}&vote_average.gte=${props.rating}&sort_by=${props.sort}`,
		);
		expect(queryByText(MovieMock.title)).toBeTruthy();
		expect(props.setTotalPages).toBeCalledTimes(1);
		expect(props.setTotalPages).toHaveBeenCalledWith(1);
	});
});
