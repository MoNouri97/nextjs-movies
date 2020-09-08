import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import Card from '../Card';
import MovieMock from '../../lib/MovieMock';

describe('Card Component', () => {
	it('Renders the the movie info as expected', async () => {
		const movie = MovieMock;
		const {
			debug,
			queryByAltText,
			queryByText,
			container,
			queryByRole,
		} = render(<Card movie={movie} />);
		expect(queryByText(movie.title)).toBeTruthy();
		expect(queryByAltText('poster')).toBeTruthy();
		expect(queryByText('no poster available')).toBeFalsy();
		expect(queryByAltText('poster').getAttribute('src')).toBe(
			`https://image.tmdb.org/t/p/w200/${movie.poster_path}`,
		);
		expect(queryByText((movie.vote_average * 10).toString())).toBeTruthy();
	});
});
