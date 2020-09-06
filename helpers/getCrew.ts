export interface crewMember {
	credit_id?: string;
	department?: string;
	gender?: number;
	id?: number;
	job?: string;
	name?: string;
	profile_path?: string | null;
}
export default function (crew: crewMember[], job: string = 'Director') {
	return crew.filter(value => value.job == job);
}
