import sanityClient from '@sanity/client';
import { OurPick } from '../types/OurPicks';

export const client = sanityClient({
	projectId: 'v171lzrj',
	dataset: 'movies',
	token: process.env.SANITY_TOKEN, // or leave blank to be anonymous user
	useCdn: false, // `false` if you want to ensure fresh data
});

export const fetchQuery = (query: string) => {
	return client.fetch(query);
};

/**
 * adds a movie without checking if it already exists
 */
export const addMovieFromTMDB = async (list: OurPick, id: string) => {
	const endpoint = `/api/movie/${id}`;
	const movie = await (await fetch(endpoint)).json();

	const doc = { _type: 'movie', featured: list, ...movie };
	return client.create(doc);
};

/**
 * adds a movie but ONLY if it doesn't already exists
 */
export const addMovieFromTMDBSafe = async (list: OurPick, id: string) => {
	const alreadyExist = (
		await fetchQuery(/* groq */ `*[_type == "movie" && id==${id} ]`)
	).length;
	if (alreadyExist) {
		return;
	}

	return addMovieFromTMDB(list, id);
};
