export default function formatReleaseDate(releaseDate: string): string {
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
}
