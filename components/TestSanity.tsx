import React from 'react';
import sanity from '../lib/sanity';
import Movie from '../lib/Movie';

const handleClick = () => {
	const doc = { _type: 'movie', ...Movie };
	console.log(doc);

	sanity.create(doc).then(res => {
		console.log(`movie was created, document ID is ${res._id}`);
	});
};
const handleClick2 = () => {
	const query = '*';

	sanity.fetch(query).then(movies => {
		console.log('all movies');
		movies.forEach(movie => {
			console.log(`${movie.title}`);
		});
	});
};
const TestSanity = () => {
	return (
		<div>
			<button onClick={handleClick}>add to sanity</button>
			<button onClick={handleClick2}>READ</button>
		</div>
	);
};

export default TestSanity;
