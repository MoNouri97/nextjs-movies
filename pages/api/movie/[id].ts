import { NextApiRequest, NextApiResponse } from 'next';
import getCrew from '../../../helpers/getCrew';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const {
		query: { id },
	} = req;

	const endpoint = ` https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}&language=en-US`;
	const creditEndpoint = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.API_KEY}`;

	try {
		const [data, credit] = await Promise.all([
			fetch(endpoint),
			fetch(creditEndpoint),
		]);
		const [dataObj, creditObj] = await Promise.all([
			data.json(),
			credit.json(),
		]);

		res.statusCode = 200;
		res.json({ ...dataObj, director: getCrew(creditObj.crew) });
	} catch (error) {
		res.statusCode = error.code || 500;
		const message = error.message || 'Server Error';
		res.json({ error: true, message });
	}
};
