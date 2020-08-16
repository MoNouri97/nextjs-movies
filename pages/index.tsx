import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { usePaginatedQuery } from 'react-query';
import { useState, useRef } from 'react';
import Modal from 'react-modal';
import { useRouter } from 'next/router';
import Card from '../components/Card';
import { GenresList } from '../components/GenresList';
import Filters from '../components/Filters';
import Pagination from '../components/Pagination';
import MovieInfo from '../components/MovieInfo';

Modal.setAppElement('#__next');
const fetchMovies = async (__key, endpoint, page, genre, minR) => {
	let info = '';
	if (genre) info += '&with_genres=' + genre;
	if (minR) info += '&vote_average.gte=' + minR;
	const res = await fetch(`${endpoint}&page=${page}${info}`);
	return res.json();
};
export async function getStaticProps() {
	const endpoint = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&`;
	const endpointForGenres = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.API_KEY}&language=en-US`;

	return {
		props: {
			endpoint,
			endpointForGenres,
			apiKey: process.env.API_KEY,
		},
	};
}

interface Genre {
	name: string;
	id: string;
}
export default function Home({ endpoint, endpointForGenres, apiKey }) {
	const [page, setPage] = useState(1);
	const totalPages = useRef(500);
	const [genre, setGenre] = useState<Genre>({ id: '16', name: 'Animation' });
	const [rating, setRating] = useState('5');
	const { resolvedData, latestData, status } = usePaginatedQuery(
		['movies', endpoint, page, genre.id, rating],
		fetchMovies,
	);
	let results = [];

	if (status === 'success') {
		results = resolvedData.results;
		totalPages.current = resolvedData.total_pages;
	}
	const handleGenreChange = (genre: Genre) => {
		setGenre(genre);
		setPage(1);
	};
	const handleRatingChange = (rating: string) => {
		setRating(rating);
		setPage(1);
	};
	const handleNext = () => {
		if (page == resolvedData.total_pages) {
			return;
		}
		setPage(current => current + 1);
	};
	const handlePrevious = () => {
		if (page == 1) {
			return;
		}
		setPage(current => current - 1);
	};
	const router = useRouter();
	return (
		<div className={styles.container}>
			<Head>
				<title>Movies</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>Welcome to Movies</h1>
				<GenresList
					endpoint={endpointForGenres}
					onChange={handleGenreChange}
					active={genre.id}
				/>
				<Filters rating={rating} onChange={handleRatingChange} />
				<p className={styles.description}>{`${
					genre.name ? genre.name : 'Popular'
				} Movies`}</p>
				<Pagination
					{...{ handleNext, handlePrevious, page }}
					totalPages={totalPages.current}
				/>

				<div className='grid'>
					{resolvedData != latestData && (
						<div className='loading'>
							<span></span>
						</div>
					)}
					{resolvedData &&
						results.map((movie, i) => <Card key={i} movie={movie} />)}
				</div>
				<hr />
				<Pagination
					{...{ handleNext, handlePrevious, page }}
					totalPages={totalPages.current}
				/>
			</main>
			<Modal
				isOpen={!!router.query.movie}
				onRequestClose={() => router.push('/')}
				shouldCloseOnOverlayClick={true}
				shouldFocusAfterRender={true}
				style={{
					overlay: {
						backgroundColor: 'rgba(0, 0, 0, 0.75)',
					},
					content: {
						top: '20px',
						left: '50px',
						right: '50px',
						bottom: '0px',
						background: 'none',
						border: 'none',
						padding: '0',
					},
				}}
			>
				<MovieInfo apiKey={apiKey} />
			</Modal>

			<footer className={styles.footer}>Browse Movies</footer>
		</div>
	);
}
