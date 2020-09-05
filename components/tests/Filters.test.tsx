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
		const active = '1';
		let res: Response;
		global.fetch = jest.fn(() =>
			Promise.resolve({
				...res,
				json: () =>
					Promise.resolve({
						genres: [
							{ id: '1', name: 'Genre1' },
							{ id: '2', name: 'Genre2' },
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
			expect(onChange).toBeCalledWith({ id: '2', name: 'Genre2' });
		});
	});
	describe('RatingFilter Component', () => {
		const onChange = jest.fn();
		const rating = '5';

		it('Ratings are rendered as expected', async () => {
			await act(async () => {
				render(<RatingFilter {...{ onChange, rating }} />);
			});

			const { getByText, debug } = screen;
			const rating50Btn = getByText('50');
			const rating80Btn = getByText('80');
			const rating30Btn = getByText('30');
			expect(rating50Btn).toBeVisible();
			expect(rating80Btn).toBeVisible();
			expect(rating30Btn).toBeVisible();
		});
		it('Can change rating', async () => {
			await act(async () => {
				render(<RatingFilter {...{ onChange, rating }} />);
			});

			const { getByText, debug } = screen;
			const rating50Btn = getByText('50');
			const rating80Btn = getByText('80');
			const rating30Btn = getByText('30');
			expect(rating50Btn.classList).toContain('active');
			expect(rating80Btn.classList).toContain('active');
			expect(rating30Btn.classList).not.toContain('active');
			fireEvent.click(rating80Btn);
			expect(onChange).toBeCalledTimes(1);
			expect(onChange).toBeCalledWith('8');
		});
	});
});
