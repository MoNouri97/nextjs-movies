// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';
import makeQueryString from '../../helpers/makeQueryString';
import { Movie } from '../../types/Movie';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const currentDate = new Date().toISOString().slice(0, 10);
	const endpoint = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&vote_count.gte=50&include_adult=false&include_video=false&primary_release_date.gte=1980-01-01&primary_release_date.lte=${currentDate}`;

	try {
		const data = await fetch(`${endpoint}${makeQueryString(req.query)}`);
		const json = (await data.json()) as { results: Movie[] };

		/** sort is used to  move results with missing data to the bottom of the page */
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

			// default
			return 0;
		});

		res.statusCode = 200;
		res.json(json);
	} catch (error) {
		res.statusCode = error.code | 500;
		res.json({ error: true, message: error });
	}
};
