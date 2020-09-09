import React from 'react';
import styles from '../styles/movie.id.module.css';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { Button, Label } from 'semantic-ui-react';
import { Movie } from '../types/Movie';

const MovieInfo = () => {
	const router = useRouter();

	const { data } = useQuery(['movie', router.query], fetchMovie);
	const movie: Movie = data;
	const { data: omdbData } = useQuery(['omdb', movie?.imdb_id], fetchOmdb, {
		enabled: movie,
	});
	return (
		<div className={styles.main}>
			<Button
				style={{ position: 'absolute', top: '5px', right: '5px' }}
				circular
				color='red'
				icon='close'
				onClick={() => {
					router.push('/');
				}}
			/>
			{movie && (
				<>
					<div className={styles.poster}>
						{movie.poster_path && (
							<img
								alt='poster'
								src={`https://image.tmdb.org/t/p/w400/${movie.poster_path}`}
							/>
						)}
						{!movie.poster_path && (
							<div className={styles.noimage}>no poster available</div>
						)}
					</div>
					<div className={styles.info}>
						<div className={styles.title + ' ' + styles.wide}>
							{movie.title}
						</div>
						<div className={styles.desc + ' ' + styles.wide}>
							{movie.tagline}
							<span>{movie.overview}</span>
						</div>
						<div className={styles.genres + ' ' + styles.wide}>
							genres list
							<ul>
								{movie.genres &&
									movie.genres.map(g => <Label key={g.id}>{g.name}</Label>)}
							</ul>
						</div>
						<div>
							release date
							<span>{formatReleaseDate(movie.release_date)}</span>
						</div>
						<div>
							{/* adding s for more than one director */}
							Director{movie.director.length > 1 ? 's' : ''}
							<span>
								{movie.director.map((d, i) => (
									<span key={d.name}>
										{d.name}
										{i + 1 != movie.director.length ? ',' : ''}
									</span>
								))}
							</span>
						</div>
						<div>
							Votes Average
							<span>{movie.vote_average} /10</span>
						</div>
						{omdbData ? (
							<div>
								Imdb Rating
								<span>{omdbData.imdbRating} /10</span>
							</div>
						) : (
							<div></div>
						)}
						{movie.budget && movie.budget != 0 ? (
							<div>
								budget<span>{currencyFormat(movie.budget)}</span>
							</div>
						) : null}
						{movie.revenue && movie.revenue != 0 ? (
							<div>
								box office<span>{currencyFormat(movie.revenue)}</span>
							</div>
						) : null}
					</div>
				</>
			)}
		</div>
	);
};

export default MovieInfo;
function formatReleaseDate(releaseDate: string): string {
	const date = new Date(releaseDate);
	const dateTimeFormat = new Intl.DateTimeFormat('en', {
		year: 'numeric',
		month: 'long',
		day: '2-digit',
	});
	const [
		{ value: month },
		,
		{ value: day },
		,
		{ value: year },
	] = dateTimeFormat.formatToParts(date);

	// console.log(`${day}-${month}-${year}`);
	// console.log(`${day}👠${month}👢${year}`); // just for fun
	return `${month} ${year}`;
}
const currencyFormat = (num: number) => {
	return `$ ${num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;
};

async function fetchMovie(__key, query) {
	const id = query.id ? query.id : query.movie;
	if (!id) return;
	const endpoint = `/api/movie/${id}`;
	const movie = await fetch(endpoint);
	return movie.json();
}
async function fetchOmdb(__key, id) {
	if (!id) return;
	const endpoint = `/api/movie/omdb/${id}`;
	const movie = await fetch(endpoint);
	return movie.json();
}
