import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const endpoint = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.API_KEY}&language=en-US`;

	try {
		const data = await fetch(endpoint);
		const json = await data.json();

		res.statusCode = 200;
		res.json(json);
	} catch (error) {
		res.statusCode = error.code || 500;
		const message = error.message || 'Server Error';
		res.json({ error: true, message });
	}
};
