import React from 'react';

interface Props {
	handlePrevious: () => void;
	page: number;
	totalPages?: number;
	handleNext: () => void;
}

const Pagination = ({
	handleNext,
	handlePrevious,
	page,
	totalPages,
}: Props) => {
	return (
		<div>
			<button onClick={handlePrevious} disabled={page == 1}>
				Previous
			</button>
			<span>
				-{page} <small>/{totalPages}</small> -
			</span>
			<button onClick={handleNext} disabled={page == totalPages}>
				next
			</button>
		</div>
	);
};

export default Pagination;
