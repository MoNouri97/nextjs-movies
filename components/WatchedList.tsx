import React, { useEffect, useState } from 'react';
import {
	Button,
	Grid,
	Icon,
	Image,
	Item,
	ItemGroup,
	Message,
} from 'semantic-ui-react';
import MoviesSearch from '../components/MoviesSearch';
import { Movie } from '../types/Movie';

const CardExampleCard: React.FC<{
	data: Movie;
	remove: (id: string) => void;
}> = ({ data, remove }) => (
	<Item style={{ textAlign: 'left' }}>
		<Image floated='right' size='tiny' src={data.image} />
		<Item.Content verticalAlign='middle'>
			<Item.Header>{data.title} </Item.Header>
			<Item.Description>{data.release_date}</Item.Description>
		</Item.Content>
		<Item.Content>
			<Button
				color='red'
				basic
				floated='right'
				animated='vertical'
				onClick={() => remove(data.tmdbId)}
			>
				<Button.Content hidden>Remove</Button.Content>
				<Button.Content visible>
					<Icon name='trash' />
				</Button.Content>
			</Button>
			{/* <Button floated='right' color='red'>
				Remove
			</Button> */}
		</Item.Content>
	</Item>
);

const WatchedList: React.FC<{
	list: any[];
	setList: React.Dispatch<React.SetStateAction<any[]>>;
}> = ({ list, setList }) => {
	const handleSelect = ({ title, tmdbId, release_date, image }) => {
		console.log(title);
		setList(m => [{ title, tmdbId, release_date, image }, ...m]);
	};

	const handleRemove = (id: string) => {
		setList(list.filter(m => m.tmdbId != id));
	};
	return (
		<Grid textAlign='center'>
			<Grid.Column style={{ maxWidth: '80%' }}>
				<MoviesSearch
					input={{ placeholder: 'search for a movie to add', icon: 'add' }}
					fluid
					handleSelect={handleSelect}
					handleSearchSubmit={() => {
						console.log('ok');
					}}
				/>
				<ItemGroup divided>
					{list.map(m => (
						<CardExampleCard data={m} remove={handleRemove} key={m.tmdbId} />
					))}
				</ItemGroup>
			</Grid.Column>
		</Grid>
	);
};
export default WatchedList;
