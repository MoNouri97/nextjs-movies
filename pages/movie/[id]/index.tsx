import React, { useState } from 'react';
import Head from 'next/head';
import styles from '../../../styles/movie.id.module.css';

import { config } from '../../../config';

export async function getServerSideProps({ query }) {
	const { id } = query;
	const endpoint = ` https://api.themoviedb.org/3/movie/${id}?api_key=${config.API_KEY}&language=en-US`;
	const movie = await (await fetch(endpoint)).json();

	return { props: { movie } };
}
const currencyFormat = (num: number) => {
	return `$ ${num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;
};
const index = ({ movie }) => {
	console.log(movie);
	const [loading, setLoading] = useState(true);

	return (
		<div className='container'>
			<Head>
				<title>{movie.title}</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className={styles.main}>
				<div className={styles.poster}>
					{movie.poster_path && (
						<img
							src={`https://image.tmdb.org/t/p/w400/${movie.poster_path}`}
							style={{ filter: loading ? 'blur(50px)' : '' }}
							onLoad={e => setLoading(false)}
						/>
					)}
					{!movie.poster_path && (
						<div className={styles['noimage']}>no poster available</div>
					)}
				</div>
				<div className={styles.info}>
					<div className={(styles.title, styles.wide)}>{movie.title}</div>
					<div className={(styles.desc, styles.wide)}>
						{movie.tagline}
						<span>{movie.overview}</span>
					</div>
					<div className={(styles.genres, styles.wide)}>
						genres list
						<span>content</span>
					</div>
					<div className={styles.release}>
						release date
						<span>{movie.release_date}</span>
					</div>
					<div className={styles.vote}>
						Rating
						<span>{movie.vote_average}</span>
					</div>

					<div className={styles.budget}>
						budget<span>{currencyFormat(movie.budget)}</span>
					</div>
					<div className={styles.revenue}>
						revenue<span>{currencyFormat(movie.revenue)}</span>
					</div>
				</div>
			</main>
		</div>
	);
};

export default index;
