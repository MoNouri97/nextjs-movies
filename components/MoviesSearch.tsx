import React, { useCallback } from 'react';
import { Form, InputProps, Item, Search } from 'semantic-ui-react';
import { debounce, throttle } from 'lodash';
import { useRouter } from 'next/router';
import { time } from 'console';
import { SemanticShorthandItem } from 'semantic-ui-react/dist/commonjs/generic';

const initialState = {
	loading: false,
	results: [],
	value: '',
};

type actionType =
	| 'CLEAN_QUERY'
	| 'START_SEARCH'
	| 'FINISH_SEARCH'
	| 'UPDATE_SELECTION'
	| 'UPDATE_QUERY_ONLY';
type stateType = {
	loading: boolean;
	results: any[];
	value: string;
};
function searchReducer(
	state: stateType,
	action: { type?: actionType; query?: string; results?: any; selection?: any },
): stateType {
	switch (action.type) {
		case 'CLEAN_QUERY':
			return initialState;
		case 'START_SEARCH':
			return { ...state, loading: true, value: action.query };
		case 'FINISH_SEARCH':
			return { ...state, loading: false, results: action.results };
		case 'UPDATE_SELECTION':
			return { ...state, value: action.selection };

		default:
			throw new Error();
	}
}
const resultRenderer = ({ title, image, release_date: date, tmdbId }) => {
	return (
		<Item key={tmdbId}>
			<Item.Image size='tiny' src={image} className='listImage' />

			<Item.Content>
				<Item.Header as='a'>{title} </Item.Header>
				<Item.Description> {date} </Item.Description>
			</Item.Content>
		</Item>
	);
};

// const debouncedFetch = debounce(async query => {
// 	console.log('fetching...' + query);
// 	return (await fetch(`api/search?query=${query}`)).json();
// }, 500);
// const fetchSearch = async query =>
// 	(await fetch(`api/search?query=${query}`)).json();

interface Props {
	handleSearchSubmit: (str: string) => void;
	handleSelect?: (movie: {
		title;
		tmdbId: string;
		release_date: string;
		image: string;
	}) => void;
	fluid?: boolean;
	input?: SemanticShorthandItem<InputProps>;
}
const MoviesSearch = ({
	handleSearchSubmit,
	handleSelect,
	fluid = false,
	input,
}: Props) => {
	const [{ loading, results, value }, dispatch] = React.useReducer(
		searchReducer,
		initialState,
	);

	const router = useRouter();
	const searchFetch = useCallback(
		async (query: string) => {
			const newResults = await (
				await fetch(`api/search?query=${query}`)
			).json();

			dispatch({
				type: 'FINISH_SEARCH',
				results: newResults,
			});
		},
		[dispatch],
	);
	const debouncedSearchFetch = useCallback(debounce(searchFetch, 500), [
		searchFetch,
	]);

	const handleSearchChange = async (_e, data) => {
		if (data.value.length === 0) {
			dispatch({ type: 'CLEAN_QUERY' });
			return;
		}
		if (data.value.length < 3) {
			// update the ui but don't search
			dispatch({ type: 'UPDATE_SELECTION', selection: data.value });
			return;
		}

		dispatch({ type: 'START_SEARCH', query: data.value });
		await debouncedSearchFetch(data.value);
	};
	const handleResultSelect = React.useCallback(
		(_e, { result: { title, tmdbId, release_date, image } }) => {
			if (typeof handleSelect !== 'undefined') {
				return handleSelect({ title, tmdbId, release_date, image });
			}
			router.push(`/?movie=${tmdbId}`, `/movie/${tmdbId}`);
			return dispatch({
				type: 'UPDATE_SELECTION',
				selection: title,
			});
		},
		[dispatch, router],
	);
	const handleSubmit = React.useCallback(() => {
		handleSearchSubmit(value);
	}, [handleSearchSubmit, value]);

	const style: React.CSSProperties = {
		width: fluid ? '100%' : '',
	};

	return (
		<div className='search' style={style}>
			<Form onSubmit={handleSubmit}>
				<Form.Group>
					<Form.Field style={style}>
						<label>Search :</label>
						<Search
							input={input}
							fluid
							minCharacters={3}
							loading={loading}
							onResultSelect={handleResultSelect}
							onSearchChange={handleSearchChange}
							results={results}
							value={value}
							resultRenderer={resultRenderer}
						/>
					</Form.Field>
				</Form.Group>
			</Form>
		</div>
	);
};

export default MoviesSearch;
