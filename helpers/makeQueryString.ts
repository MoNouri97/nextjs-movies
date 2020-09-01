export default function (queryObject: { [key: string]: string | string[] }) {
	let queryString = '';
	Object.keys(queryObject).forEach(key => {
		queryString = `${queryString}&${key}=${queryObject[key]}`;
	});
	return queryString;
}
