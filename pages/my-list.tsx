import React from 'react';
import {
	Grid,
	Header,
	Form,
	Segment,
	Button,
	Message,
	Image,
	Card,
	Icon,
	CardGroup,
} from 'semantic-ui-react';
import MoviesSearch from '../components/MoviesSearch';
import { Movie } from '../types/Movie';

const CardExampleCard: React.FC<{ data: Movie }> = ({ data }) => (
	<Card>
		<Card.Content>
			<Image
				floated='right'
				size='mini'
				src='https://image.tmdb.org/t/p/w200//jlJ8nDhMhCYJuzOw3f52CP1W8MW.jpg'
			/>
			<Card.Header>{data.title} </Card.Header>
			<Card.Meta>{data.date}</Card.Meta>
			<Card.Description>
				{data.date} <strong>best friends</strong>
			</Card.Description>
		</Card.Content>
		<Card.Content extra>
			<Button basic color='red'>
				Remove
			</Button>
		</Card.Content>
	</Card>
);
const movies = [];
const myList: React.FC = ({}) => {
	const handleSelect = ({ title, tmdbId, release_date, image }) => {
		console.log(title);
	};
	return (
		<Grid textAlign='center' style={{ paddingTop: '10rem' }}>
			<Grid.Column style={{ maxWidth: '80%' }}>
				<Header as='h1' color='teal' textAlign='center'>
					Watched Movie List
				</Header>
				<MoviesSearch
					fluid
					handleSelect={handleSelect}
					handleSearchSubmit={() => {
						console.log('ok');
					}}
				/>
				<CardGroup>
					{movies.map(m => (
						<CardExampleCard data={m} />
					))}
				</CardGroup>
				<Message>
					New to us? <a href='#'>Sign Up</a>
				</Message>
			</Grid.Column>
		</Grid>
	);
};
export default myList;
