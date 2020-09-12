export default function formatDate(releaseDate: string): string {
	try {
		const date = new Date(releaseDate);
		const dateTimeFormat = new Intl.DateTimeFormat('en', {
			year: 'numeric',
			month: 'long',
			day: '2-digit',
		});
		const [
			{ value: month },
			,
			{ value: day },
			,
			{ value: year },
		] = dateTimeFormat.formatToParts(date);
		// console.log(`${day}-${month}-${year}`);
		return `${month} ${year}`;
	} catch (error) {
		return '';
	}
}
