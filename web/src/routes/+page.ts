import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const data = await new Promise((resolve) => {
		setTimeout(() => resolve('lol'), 300);
	});

	console.log('xd', data);

	return {
		data
	};
};
