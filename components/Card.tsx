import React, { FC } from 'react';
interface Props {
	movie: any;
}

const Card = ({ movie }) => {
	if (!movie) return <div></div>;

	return (
		<div className='post-entry'>
			<a href='#'>
				<img
					className='img-fluid'
					src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
				/>
			</a>
			<div className='post-text'>
				<span className='post-meta'>{movie.release_date}</span>
				<h3>
					<a href='#'>{movie.title}</a>
				</h3>
			</div>
		</div>
	);
};

export default Card;
