import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from '../styles/Card.module.css';
import { Label, Placeholder } from 'semantic-ui-react';
import { Movie } from '../types/Movie';
interface Props {
	movie: Movie;
}
const Card = ({ movie }: Props) => {
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
							<img alt='poster' ref={imgRef} />

							{loading && (
								<Placeholder
									style={{
										height: '100%',
										width: '100%',
										position: 'absolute',
										top: 0,
									}}
								>
									<Placeholder.Image />
								</Placeholder>
							)}
						</>
					)}
					{!movie.poster_path && (
						<div className={styles['noimage']}>no poster available</div>
					)}
					<span className={styles.rating}>
						{movie.vote_average * 10}
						<small>/100</small>
					</span>
				</a>
				<div className={styles['post-text']}>
					<h3>
						<a>{movie.title}</a>
					</h3>
				</div>
			</div>
		</Link>
	);
};

export default Card;
