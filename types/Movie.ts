export interface Movie {
	title: string;
	poster_path: string;
	tagline: string;
	overview: string;
	genres: any[];
	release_date: string;
	budget: number;
	revenue: number;
	vote_average: string;
	imdb_id: string;
	director: [{ name: string }];
}
