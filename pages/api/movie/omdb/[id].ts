import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const {
		query: { id: imdb_id },
	} = req;
	const OMDB = `http://www.omdbapi.com/?apikey=${process.env.OMDB_KEY}&i=${imdb_id}&plot=short`;
	try {
		const data = await fetch(OMDB);
		const json = await data.json();

		res.statusCode = 200;
		res.json(json);
	} catch (error) {
		res.statusCode = error.code | 500;
		res.json({ error: true, message: error.message });
	}
};
