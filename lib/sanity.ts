import sanityClient from '@sanity/client';

export const client = sanityClient({
	projectId: 'v171lzrj',
	dataset: 'movies',
	token: process.env.SANITY_TOKEN, // or leave blank to be anonymous user
	useCdn: false, // `false` if you want to ensure fresh data
});

export const fetchQuery = (query: string) => {
	return client.fetch(query);
};
