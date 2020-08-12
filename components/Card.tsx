import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from '../styles/Card.module.css';
interface Props {
	movie: any;
}

const Card = ({ movie }) => {
	if (!movie) return <div></div>;

	const [loading, setLoading] = useState(true);
	const imgRef = useRef<HTMLImageElement>();
	const handleLoad = () => setLoading(false);
	useEffect(() => {
		setLoading(true);
		imgRef?.current?.addEventListener('load', handleLoad);

		return () => {
			imgRef.current?.removeEventListener('load', handleLoad);
		};
	}, [movie]);

	return (
		<Link href={`/?movie=${movie.id}`} as={`/movie/${movie.id}`} scroll={false}>
			<div className={styles['post-entry']}>
				<a>
					{movie.poster_path && (
						<img
							src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
							style={{ filter: loading ? 'blur(50px)' : '' }}
							ref={imgRef}
						/>
					)}
					{!movie.poster_path && (
						<div className={styles['noimage']}>no poster available</div>
					)}
					<span className={styles.rating}>
						{parseFloat(movie.vote_average) * 10}
						<small>/100</small>
					</span>
				</a>
				<div className={styles['post-text']}>
					<span className={styles['post-meta']}>{movie.release_date}</span>
					<h3>
						<a>{movie.title}</a>
					</h3>
				</div>
			</div>
		</Link>
	);
};

export default Card;
