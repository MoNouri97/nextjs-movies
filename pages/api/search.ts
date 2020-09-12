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
		json.results = json.results.sort((a, b) => b.popularity - a.popularity);
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
		res.statusCode = error.code | 500;
		return res.json({ error: true, message: error ? error : 'Server Error' });
	}
};
