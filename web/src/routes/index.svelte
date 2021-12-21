<script>
	import { goto } from '$app/navigation';

	let error = '';

	const saveJwtSomewhere = (jwt) => {};

	const handleSubmit = async (e) => {
		error = '';

		const variables = Array.from(e.target.elements).reduce(
			(acc, el) => (el.name ? { ...acc, [el.name]: el.value } : acc),
			{}
		);

		const { data } = await fetch('https://postgraphile-template.herokuapp.com/graphql', {
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
				variables
			})
		}).then((res) => res.json());

		if (data.authenticate.jwtToken) {
			saveJwtSomewhere(data.authenticate.jwtToken);
			goto('/auth');
		} else {
			error = 'Wrong credentials';
		}
	};
</script>

<form on:submit|preventDefault={handleSubmit}>
	<label>email<input name="email" /></label>
	<label>password<input name="password" /></label>
	<button>Sign in</button>
</form>
<p style="color: red;">{error}</p>
