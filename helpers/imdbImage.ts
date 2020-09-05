export default function (
	url: string,
	width: '200' | '300' | '400' | '500' = '200',
) {
	return `https://image.tmdb.org/t/p/w${width}${url}`;
}
