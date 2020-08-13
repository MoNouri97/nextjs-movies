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
		if (imgRef.current) {
			imgRef.current.addEventListener('load', handleLoad);
			imgRef.current.src = `https://image.tmdb.org/t/p/w200/${movie.poster_path}`;
		}

		return () => {
			imgRef.current?.removeEventListener('load', handleLoad);
		};
	}, [movie, setLoading]);

	return (
		<Link href={`/?movie=${movie.id}`} as={`/movie/${movie.id}`} scroll={false}>
			<div className={styles['post-entry']}>
				<a>
					{movie.poster_path && (
						<>
							<img ref={imgRef} />

							{loading && <div className='loading_img'></div>}
						</>
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
