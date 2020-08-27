import React, { useEffect } from 'react';
import styles from '../styles/movie.id.module.css';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';

const currencyFormat = (num: number) => {
	return `$ ${num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;
};

type Movie = {
	title: string;
	poster_path: string;
	tagline: string;
	overview: string;
	genres: any[];
	release_date: string;
	budget: number;
	revenue: number;
	vote_average: string;
};
interface Props {
	movie?: Movie;
}
async function fetchMovie(__key, query, apiKey) {
	const id = query.id ? query.id : query.movie;
	if (!id) return;
	const endpoint = ` https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`;
	const movie = await fetch(endpoint);

	return movie.json();
}
const MovieInfo = ({ apiKey }) => {
	const router = useRouter();

	const { data, status } = useQuery(
		['movie', router.query, apiKey],
		fetchMovie,
	);
	const movie = data;
	if (!movie) return <h1>loading...</h1>;
	return (
		<div className={styles.main}>
			<div className={styles.poster}>
				{movie.poster_path && (
					<img src={`https://image.tmdb.org/t/p/w400/${movie.poster_path}`} />
				)}
				{!movie.poster_path && (
					<div className={styles.noimage}>no poster available</div>
				)}
			</div>
			<div className={styles.info}>
				<div className={styles.title + ' ' + styles.wide}>{movie.title}</div>
				<div className={styles.desc + ' ' + styles.wide}>
					{movie.tagline}
					<span>{movie.overview}</span>
				</div>
				<div className={styles.genres + ' ' + styles.wide}>
					genres list
					<ul>
						{movie.genres &&
							movie.genres.map(g => <li key={g.id}>{g.name}</li>)}
					</ul>
				</div>
				<div className={styles.release}>
					release date
					<span>{movie.release_date}</span>
				</div>
				<div className={styles.vote}>
					Rating
					<span>{movie.vote_average} /10</span>
				</div>
				{movie.budget && movie.budget != '0' ? (
					<div className={styles.budget}>
						budget<span>{currencyFormat(movie.budget)}</span>
					</div>
				) : null}
				{movie.revenue && movie.revenue != '0' ? (
					<div className={styles.revenue}>
						box office<span>{currencyFormat(movie.revenue)}</span>
					</div>
				) : null}
			</div>
		</div>
	);
};

export default MovieInfo;
