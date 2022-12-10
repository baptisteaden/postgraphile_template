import type { PageServerLoad, Actions } from './$types';

export const actions: Actions = {
	login: async ({ cookies, request }) => {
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');

		console.log(import.meta.env.VITE_API_URL);

		const res = await fetch(import.meta.env.VITE_API_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				query: `
					mutation Auth($email: String!, $password: String!){
						authenticate(input: { email: $email, password: $password }) {
							jwtToken
						}
					}
				`,
				variables: { email, password }
			})
		})
			.then((res) => res.json())
			.catch((e) => console.log('wtf???????', e));

		console.log('res', res);

		// cookies.set('sessionid', await db.createSession(user));

		// return { success: true };
	},
	register: async (event) => {
		// TODO register the user
	}
};
