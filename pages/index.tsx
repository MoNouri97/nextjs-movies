import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useState, useRef, useEffect, useCallback } from 'react';
import Modal from 'react-modal';
import { useRouter } from 'next/router';
import { GenresList } from '../components/GenresList';
import RatingFilter from '../components/RatingFilter';
import Pagination from '../components/Pagination';
import MovieInfo from '../components/MovieInfo';
import SortBy from '../components/SortBy';
import { Tab } from 'semantic-ui-react';
import MoviesGrid from '../components/MoviesGrid';
import SanityPicksGrid from '../components/SanityPicksGrid';

Modal.setAppElement('#__next');

export async function getStaticProps() {
	const currentDate = new Date().toISOString().slice(0, 10);
	const endpoint = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&vote_count.gte=50&language=en-US&include_adult=false&include_video=false&primary_release_date.gte=1980-01-01&primary_release_date.lte=${currentDate}`;
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
	const [totalPages, setTotalPages] = useState(500);
	const [genre, setGenre] = useState<Genre>({ id: '16', name: 'Animation' });
	const [rating, setRating] = useState('5');
	const [sort, setSort] = useState('popularity.desc');
	// const ren = useRef(0);
	// console.log(++ren.current);
	const handleGenreChange = (genre: Genre) => {
		setGenre(genre);
		setPage(1);
	};
	const handleRatingChange = (rating: string) => {
		setRating(rating);
		setPage(1);
	};

	const router = useRouter();
	const panes = [
		{
			menuItem: 'All Movies',
			render: () => (
				<MoviesGrid
					endpoint={endpoint}
					page={page}
					genreID={genre.id}
					rating={rating}
					sort={sort}
					setTotalPages={setTotalPages}
				/>
			),
		},
		{
			menuItem: 'Gold Picks',
			render: () => (
				<SanityPicksGrid
					picks='gold'
					page={page}
					genreID={genre.id}
					rating={rating}
					sort={sort}
					setTotalPages={setTotalPages}
				/>
			),
		},
	];

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
				<div className='filters'>
					<RatingFilter rating={rating} onChange={handleRatingChange} />
					<SortBy sort={sort} onChange={setSort} />
				</div>
				<Pagination {...{ setPage, page }} totalPages={totalPages} />
				<hr />
				<Tab
					menu={{ pointing: true }}
					style={{ width: '100%' }}
					panes={panes}
				/>
				<hr />
				<Pagination {...{ setPage, page }} totalPages={totalPages} />
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
