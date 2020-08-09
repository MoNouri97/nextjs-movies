import React from 'react';
import styles from '../styles/Card.module.css';
interface Props {
	movie: any;
}

const Card = ({ movie }) => {
	if (!movie) return <div></div>;

	return (
		<div className={styles['post-entry']}>
			<a href='#'>
				{movie.poster_path && (
					<img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} />
				)}
				{!movie.poster_path && (
					<div className={styles['noimage']}>no poster available</div>
				)}
			</a>
			<div className={styles['post-text']}>
				<span className={styles['post-meta']}>{movie.release_date}</span>
				<h3>
					<a href='#'>{movie.title}</a>
				</h3>
			</div>
		</div>
	);
};

export default Card;
