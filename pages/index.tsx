import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useQuery, usePaginatedQuery } from 'react-query';
import { useState } from 'react';
import Card from '../components/Card';
import { GenresList } from '../components/GenresList';

const config = {
	API_KEY: '5c36791d98d96dc9af65af5475e4d14e',
};

const endpoint = `https://api.themoviedb.org/3/discover/movie?api_key=${config.API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&`;
const fetchMovies = async (__key, page) => {
	// &with_genres=16
	const res = await fetch(`${endpoint} &page=${page}`);
	return res.json();
};

// export async function getServerSideProps() {
// 	// const data = await fetchMovies();

// 	// return {
// 	// 	props: {
// 	// 		data,
// 	// 	},
// 	// };
// 	return { props: {} };
// }

export default function Home() {
	const [page, setPage] = useState(1);
	const { resolvedData, latestData, status } = usePaginatedQuery(
		['movies', page],
		fetchMovies,
	);
	let results = [];
	if (status === 'success') {
		results = resolvedData.results;
	}

	const handleNext = () => {
		setPage(current => current + 1);
	};
	const handlePrevious = () => {
		if (page == 1) {
			return;
		}
		setPage(current => current - 1);
	};
	return (
		<div className={styles.container}>
			<Head>
				<title>Movies</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>Welcome to Movies</h1>
				<GenresList />
				<p className={styles.description}>Popular Movies</p>
				<div>
					<button onClick={handleNext}>next</button>
					<span>{page}</span>
					<button onClick={handlePrevious} disabled={page == 1}>
						Previous
					</button>
				</div>

				<div className={styles.grid}>
					{resolvedData &&
						results.map((movie, i) => {
							const { id, title, poster_path } = movie;

							return <Card key={i} movie={movie} />;
						})}
				</div>
			</main>

			<footer className={styles.footer}>
				<a
					href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
					target='_blank'
					rel='noopener noreferrer'
				>
					Powered by{' '}
					<img src='/vercel.svg' alt='Vercel Logo' className={styles.logo} />
				</a>
			</footer>
		</div>
	);
}
