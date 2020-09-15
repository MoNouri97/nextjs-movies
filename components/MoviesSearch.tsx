import React from 'react';
import { Form, Item, Search } from 'semantic-ui-react';
import { throttle } from 'lodash';
import { useRouter } from 'next/router';

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
const resultRenderer = props => {
	const { title, image, date } = props;
	return (
		<Item>
			<Item.Image size='tiny' src={image} className='listImage' />

			<Item.Content>
				<Item.Header as='a'>{title} </Item.Header>
				<Item.Description> {date} </Item.Description>
			</Item.Content>
		</Item>
	);
};

const fetchSearch = throttle(
	async query => (await fetch(`api/search?query=${query}`)).json(),
	100,
);

interface Props {
	setSearch: (str: string) => void;
	setActiveTab: (str: string) => void;
}
const MoviesSearch = ({ setSearch, setActiveTab }: Props) => {
	const [state, dispatch] = React.useReducer(searchReducer, initialState);
	const { loading, results, value } = state;
	const router = useRouter();

	const handleSearchChange = React.useCallback(
		async (_e, data) => {
			if (data.value.length === 0) {
				dispatch({ type: 'CLEAN_QUERY' });
				return;
			}
			if (data.value.length < 3) {
				dispatch({ type: 'UPDATE_SELECTION', selection: data.value });
				return;
			}
			dispatch({ type: 'START_SEARCH', query: data.value });

			const results: [] = await fetchSearch(data.value);

			dispatch({
				type: 'FINISH_SEARCH',
				results,
			});
		},
		[dispatch],
	);
	const handleResultSelect = React.useCallback(
		(_e, { result: { title, tmdbId } }) => {
			router.push(`/?movie=${tmdbId}`, `/movie/${tmdbId}`);
			return dispatch({
				type: 'UPDATE_SELECTION',
				selection: title,
			});
		},
		[dispatch, router],
	);
	const handleSubmit = React.useCallback(() => {
		setActiveTab('Search');
		setSearch(value);
	}, [setSearch, value, setActiveTab]);

	return (
		<div className='search'>
			<Form onSubmit={handleSubmit}>
				<Form.Group>
					<Form.Field>
						<label>Search :</label>
						<Search
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
