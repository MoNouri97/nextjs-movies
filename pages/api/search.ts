import { NextApiRequest, NextApiResponse } from 'next';
import formatDate from '../../helpers/formatDate';
import tmdbImage from '../../helpers/tmdbImage';
import makeQueryString from '../../helpers/makeQueryString';
import { Movie } from '../../types/Movie';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const endpoint = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&include_adult=false&include_video=false`;

	try {
		const data = await fetch(`${endpoint}${makeQueryString(req.query)}`);
		const json = (await data.json()) as { results: Movie[] };
		/** sort is used to also move results with missing data to the bottom of the page */
		json.results = json.results.sort((a, b) => {
			//poster
			if (!a.poster_path) return 1;
			if (!b.poster_path) return -1;

			//overview
			if (!a.overview) return 1;
			if (!b.overview) return -1;

			// genres
			if (!a.genre_ids?.length) return 1;
			if (!b.genre_ids?.length) return -1;

			// votes
			if (a.vote_count < 10) return 1;
			if (b.vote_count < 10) return -1;

			// default sort by popularity
			return b.popularity - a.popularity;
		});
		const results = req.query.full
			? json
			: json.results
					.slice(0, 3)
					.map(({ title, poster_path, id, release_date }: Movie) => ({
						title,
						/**the id is used for routing but when passed only as 'id'
						 * it is used as the key and not accessible (resultRenderer in MoviesSearch) */
						id,
						tmdbId: id,
						date: formatDate(release_date),
						image: tmdbImage(poster_path, '200'),
					}));

		res.statusCode = 200;

		return res.json(results);
	} catch (error) {
		res.statusCode = error.code || 500;
		const message = error.message || 'Server Error';
		res.json({ error: true, message });
	}
};
