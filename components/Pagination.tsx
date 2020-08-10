import React from 'react';

interface Props {
	handlePrevious: () => void;
	page: number;
	handleNext: () => void;
}

const Pagination = ({ handleNext, handlePrevious, page }: Props) => {
	return (
		<div>
			<button onClick={handlePrevious} disabled={page == 1}>
				Previous
			</button>
			<span> -{page}- </span>
			<button onClick={handleNext}>next</button>
		</div>
	);
};

export default Pagination;
