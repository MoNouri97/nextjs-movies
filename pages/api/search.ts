import { NextApiRequest, NextApiResponse } from 'next';
import formatDate from '../../helpers/formatDate';
import tmdbImage from '../../helpers/tmdbImage';
import makeQueryString from '../../helpers/makeQueryString';
import { Movie } from '../../types/Movie';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const currentDate = new Date().toISOString().slice(0, 10);

	const endpoint = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&vote_count.gte=50&include_adult=false&include_video=false&primary_release_date.gte=1980-01-01&primary_release_date.lte=${currentDate}&sort_by=revenu.desc`;

	try {
		const data = await fetch(`${endpoint}${makeQueryString(req.query)}`);
		const json = (await data.json()) as { results: Movie[] };

		const results = json.results
			.sort((a, b) => b.popularity - a.popularity)
			.slice(0, 3);

		res.statusCode = 200;

		return res.json(
			results.map(({ title, poster_path, id, release_date }: Movie) => ({
				title,
				/**the id is used for routing but when passed only as 'id'
				 * it is used as the key and not accessible (resultRenderer in MoviesSearch) */
				id,
				tmdbId: id,
				date: formatDate(release_date),
				image: tmdbImage(poster_path, '200'),
			})),
		);
	} catch (error) {
		console.log(error);

		res.statusCode = error.code | 500;
		return res.json({ error: true, message: error ? error : 'Server Error' });
	}
};
