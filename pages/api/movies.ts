// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';
import makeQueryString from '../../helpers/makeQueryString';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const currentDate = new Date().toISOString().slice(0, 10);
	const endpoint = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&vote_count.gte=50&include_adult=false&include_video=false&primary_release_date.gte=1980-01-01&primary_release_date.lte=${currentDate}`;

	try {
		const data = await fetch(`${endpoint}${makeQueryString(req.query)}`);
		const json = await data.json();
		res.statusCode = 200;
		res.json(json);
	} catch (error) {
		res.statusCode = error.code | 500;
		res.json({ error: true, message: error });
	}
};
