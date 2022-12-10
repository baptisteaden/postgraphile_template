<script>
	import { goto } from '$app/navigation';

	let error = '';

	console.log('prout');

	const saveJwtSomewhere = (jwt) => {
		// todo
	};

	const handleSubmit = async (e) => {
		error = '';

		const variables = Array.from(e.target.elements).reduce(
			(acc, el) => (el.name ? { ...acc, [el.name]: el.value } : acc),
			{}
		);

		const { data } = await fetch(import.meta.env.VITE_API_URL, {
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
			error = 'wrong credentials';
		}
	};
</script>

<main>
	<!-- <form on:submit|preventDefault={handleSubmit}> -->
	<form method="post" action="?/login">
		<label>email <input name="email" /></label>
		<label>password <input name="password" type="password" /></label>
		{#if error} <p style="color: red;">{error}</p> {/if}
		<button>sign in</button>
	</form>
</main>

<style>
	:global(html) {
		height: 100%;
	}

	:global(body) {
		margin: 0;
		height: 100%;
	}

	main {
		width: 100%;
		height: 100%;
		background-color: #301b3f;
		display: flex;
		align-items: center;
		justify-content: center;
		color: whitesmoke;
		font-size: 2rem;
	}
	form {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		padding: 3rem;
		border: 1px solid whitesmoke;
		border-radius: 5px;
	}

	form > p {
		margin: 0;
	}

	form > label {
		width: 100%;
		display: flex;
		gap: 1.5rem;
	}

	form > label > input {
		flex-grow: 1;
	}

	form > button {
		background-color: white;
		padding: 0.5rem;
		border-radius: 5px;
		font-size: 2rem;
		color: #301b3f;
	}
</style>
