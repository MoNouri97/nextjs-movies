import sanityClient from '@sanity/client';

export const client = sanityClient({
	projectId: 'v171lzrj',
	dataset: 'movies',
	token:
		'skZxwVQLcKGaz3TgrgJHRNaAbJOU7mzDq7H0etOBfxwLF63B7ylwZKmilEexOKMsNiMJwc4lBFqR4zakJOlaEVchXYk8YRn1gGDlYRDsMGoZsdajTr3rZh4gWZwfJuYV0xx2mR2sJRZN8etcqzMPaKTI12H7LzEmLEkNkDQCFL2JMFUpNZtX', // or leave blank to be anonymous user
	useCdn: true, // `false` if you want to ensure fresh data
});

export const fetchQuery = (query: string) => {
	return client.fetch(query);
};
