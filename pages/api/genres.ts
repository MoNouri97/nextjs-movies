import { NextApiRequest, NextApiResponse } from 'next';
import { error } from 'console';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const endpoint = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.API_KEY}&language=en-US`;

	try {
		const data = await fetch(endpoint);
		const json = await data.json();

		res.statusCode = 200;
		res.json(json);
	} catch (error) {
		res.statusCode = error.code | 500;
		res.json({ error: true, message: error.message });
	}
};
