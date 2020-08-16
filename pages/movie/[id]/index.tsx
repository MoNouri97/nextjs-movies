import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../../../styles/movie.id.module.css';
import MovieInfo from '../../../components/MovieInfo';

export async function getServerSideProps({ query }) {
	const { id } = query;
	const endpoint = ` https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}&language=en-US`;
	const movie = await (await fetch(endpoint)).json();

	return { props: { movie, apiKey: process.env.API_KEY } };
}

const index = ({ movie, apiKey }) => {
	return (
		<div className='container'>
			<Head>
				<title>{movie.title}</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div
				className={styles.wrapper}
				style={{
					backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
				}}
			>
				<>
					<MovieInfo apiKey={apiKey} />
				</>
			</div>
		</div>
	);
};

export default index;
