import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useEffect, useState } from 'react';
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
import MoviesSearch from '../components/MoviesSearch';
import MoviesSearchResults from '../components/MoviesSearchResults';
import WatchedList from '../components/WatchedList';
import { useFilters } from '../helpers/useFilters';

Modal.setAppElement('#__next');

export default function Home() {
	// const [page, setPage] = useState(1);
	// const [totalPages, setTotalPages] = useState(500);
	// const [genres, setGenres] = useState<number[]>([16]);
	// const [rating, setRating] = useState([5, 10]);
	// const [sort, setSort] = useState('popularity.desc');
	// const [search, setSearch] = useState('');
	const {
		page,
		setPage,
		totalPages,
		setTotalPages,
		genres,
		setGenres,
		rating,
		setRating,
		sort,
		setSort,
		search,
		setSearch,
	} = useFilters();
	const [activeTab, setActiveTab] = useState(0);
	const [watched, setWatched] = useState([]);
	useEffect(() => {
		if (watched.length) localStorage.setItem('movies', JSON.stringify(watched));
	}, [watched]);

	useEffect(() => {
		setWatched(JSON.parse(localStorage.getItem('movies')));
	}, []);
	const handleGenreChange = (clickedGenre: number) => {
		if (genres.indexOf(clickedGenre) > -1)
			return setGenres(genres.filter(value => value != clickedGenre));

		setGenres(old => [...old, clickedGenre]);

		setPage(1);
	};
	const handleRatingChange = (newRating: number[]) => {
		setRating(newRating);
		setPage(1);
	};
	const handleSortChange = (newSort: string) => {
		setSort(newSort);
		setPage(1);
	};
	const handleSearchSubmit = (value: string) => {
		setActiveTab(2); // Search pane
		setSearch(value);
	};

	const router = useRouter();
	const panes = [
		{
			menuItem: 'All',
			render: () => (
				<MoviesGrid
					page={page}
					genres={genres}
					rating={rating}
					sort={sort}
					setTotalPages={setTotalPages}
					watched={watched}
				/>
			),
		},
		{
			menuItem: 'Gold Picks',
			render: () => (
				<SanityPicksGrid
					picks='gold'
					page={page}
					genres={genres}
					rating={rating}
					sort={sort}
					setTotalPages={setTotalPages}
				/>
			),
		},
		{
			menuItem: 'Search',
			render: () => (
				<MoviesSearchResults
					page={page}
					setTotalPages={setTotalPages}
					searchQuery={search}
				/>
			),
		},
		{
			menuItem: 'Watched',
			render: () => {
				setTotalPages(0);
				return <WatchedList list={watched} setList={setWatched} />;
			},
		},
	];
	const setActiveTabByName = (tab: string) => {
		for (let idx = 0; idx < panes.length; idx++) {
			if (panes[idx].menuItem == tab) {
				setActiveTab(idx);

				break;
			}
		}
	};
	return (
		<div className={styles.container}>
			<Head>
				<title>Movies</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>Welcome to Movies</h1>
				<GenresList onChange={handleGenreChange} active={genres} />
				<div className='filters'>
					<RatingFilter rating={rating} onChange={handleRatingChange} />
					<SortBy sort={sort} onChange={handleSortChange} />
					<MoviesSearch handleSearchSubmit={handleSearchSubmit} />
				</div>
				<Pagination {...{ setPage, page }} totalPages={totalPages} />
				<hr />

				<Tab
					activeIndex={activeTab}
					onTabChange={(_, { activeIndex }) =>
						setActiveTab(parseInt(activeIndex.toString()))
					}
					menu={{ secondary: true, pointing: true }}
					style={{ width: '100%' }}
					panes={panes}
				/>

				<hr />
				<Pagination {...{ setPage, page }} totalPages={totalPages} />
			</main>
			<Modal
				isOpen={!!router.query.movie}
				onAfterOpen={() => {
					const scrollTop = `-${window.scrollY}px`;
					document.body.style.position = 'fixed';
					document.body.style.top = scrollTop;
				}}
				onAfterClose={() => {
					const scrollY = document.body.style.top;
					document.body.style.position = '';
					document.body.style.top = '';
					window.scrollTo(0, parseInt(scrollY || '0') * -1);
				}}
				onRequestClose={() => router.push('/')}
				shouldCloseOnOverlayClick={true}
				shouldFocusAfterRender={true}
				style={{
					overlay: {
						backgroundColor: 'rgba(0, 0, 0, 0.75)',
					},
					content: {
						position: 'relative',
						top: '0px',
						left: '0px',
						right: '0px',
						bottom: '0px',
						background: 'none',
						border: 'none',
						padding: '0',
					},
				}}
			>
				<MovieInfo />
			</Modal>

			<footer className={styles.footer}>Browse Movies</footer>
		</div>
	);
}
