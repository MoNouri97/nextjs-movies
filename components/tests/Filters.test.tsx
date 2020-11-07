import {
	render,
	fireEvent,
	cleanup,
	act,
	screen,
} from '@testing-library/react';

import SortBy from '../SortBy';
import { GenresList } from '../GenresList';
import RatingFilter from '../RatingFilter';

describe('All Filters ', () => {
	afterEach(() => {
		cleanup();
	});

	describe('SortBy Component', () => {
		const onChange = jest.fn();
		const sort = 'popularity.desc';
		afterEach(() => {
			cleanup();
		});

		it('Renders the sort', () => {
			const { debug, queryAllByText, queryAllByRole } = render(
				<SortBy {...{ sort, onChange }} />,
			);
			const btn = queryAllByRole('alert')[0];
			const option = queryAllByRole('option');
			expect(btn.textContent).toBe('Popularity');

			expect(queryAllByText('Popularity')).toBeTruthy();
			expect(queryAllByText('Revenue')).toBeTruthy();
			expect(queryAllByText('Release Date')).toBeTruthy();
		});
		it('Can Select an option', () => {
			const { debug, queryAllByRole } = render(
				<SortBy {...{ sort, onChange }} />,
			);
			const btn = queryAllByRole('alert')[0];
			const option = queryAllByRole('option');
			fireEvent.click(btn);
			fireEvent.click(option[2]);

			expect(onChange).toBeCalledTimes(1);
			expect(onChange).toBeCalledWith('revenue.desc');
		});
	});

	describe('GenreList Component', () => {
		const onChange = jest.fn();
		const active = [1, 2];
		let res: Response;
		global.fetch = jest.fn(() =>
			Promise.resolve({
				...res,
				json: () =>
					Promise.resolve({
						genres: [
							{ id: 1, name: 'Genre1' },
							{ id: 2, name: 'Genre2' },
							{ id: 3, name: 'Genre3' },
						],
					}),
			}),
		);
		it('Genres are rendered as expected', async () => {
			await act(async () => {
				render(<GenresList {...{ onChange, active }} />);
			});

			const { getByText, debug } = screen;
			const firstGenre = getByText('Genre1');
			const secondGenre = getByText('Genre2');
			expect(firstGenre).toBeVisible();
			expect(secondGenre).toBeVisible();
		});
		it('Can select a genre', async () => {
			await act(async () => {
				render(<GenresList {...{ onChange, active }} />);
			});

			const { getByText, debug } = screen;
			const firstGenre = getByText('Genre1');
			const secondGenre = getByText('Genre2');

			expect(firstGenre.classList).toContain('active');
			fireEvent.click(secondGenre);
			expect(onChange).toBeCalledTimes(1);
			expect(onChange).toBeCalledWith(2);
		});
	});
	describe('RatingFilter Component', () => {
		const onChange = jest.fn();
		const rating = [5, 9];

		//vars
		let min: HTMLElement, max: HTMLElement;

		beforeEach(async () => {
			await act(async () => {
				render(<RatingFilter {...{ onChange, rating }} />);
			});

			const { debug, getAllByRole } = screen;
			[min, max] = getAllByRole('slider');
		});

		it('Ratings are rendered as expected', async () => {
			expect(min.getAttribute('aria-valuenow')).toBe('5');
			expect(min.getAttribute('aria-valuemin')).toBe('0');
			expect(min.getAttribute('aria-valuemax')).toBe('9');

			expect(max.getAttribute('aria-valuenow')).toBe('9');
			expect(max.getAttribute('aria-valuemin')).toBe('5');
			expect(max.getAttribute('aria-valuemax')).toBe('10');
		});
	});
});
