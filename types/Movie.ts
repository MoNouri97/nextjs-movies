export interface Movie {
	_id?: string /**sanity id */;
	director?: [{ name: string }];
	id: number /** tmdb id */;
	title: string;
	poster_path: string;
	tagline: string;
	overview: string;
	genres: any[];
	release_date: string;
	budget: number;
	revenue: number;
	vote_average: number;
	imdb_id: string;
	popularity: number;
	[property: string]: any;
}
