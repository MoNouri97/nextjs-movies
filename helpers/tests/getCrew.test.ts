import getCrew, { crewMember } from '../getCrew';

describe('getCrew helper function', () => {
	it('Filters crew as expected', () => {
		const crew: crewMember[] = [
			{
				name: 'Tom Cruise',
				id: 1,
				job: 'Actor',
			},
			{
				name: 'Christopher Nolan',
				id: 2,
				job: 'Director',
			},
		];
		const director = getCrew(crew); // or getCrew(crew,'Director');
		expect(director).toHaveLength(1);
		expect(director[0].name).toBe('Christopher Nolan');
		const actor = getCrew(crew, 'Actor');
		expect(actor).toHaveLength(1);
		expect(actor[0].name).toBe('Tom Cruise');
	});
	it('More than one', () => {
		const crew: crewMember[] = [
			{
				name: 'Quentin Tarantino',
				id: 1,
				job: 'Director',
			},
			{
				name: 'Christopher Nolan',
				id: 2,
				job: 'Director',
			},
		];
		const director = getCrew(crew); // or getCrew(crew,'Director');
		expect(director).toHaveLength(2);
		expect(director).toStrictEqual(crew);
	});
	it('Empty array', () => {
		const crew: crewMember[] = [];
		const director = getCrew(crew); // or getCrew(crew,'Director');
		expect(director).toHaveLength(0);
	});
});
