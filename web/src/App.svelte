<script lang="ts">
  const getData = () =>
    fetch("https://postgraphile-template.herokuapp.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `{
            allPeople {
              nodes {
                id
                firstName
              }
            }
          }`,
      }),
    }).then((res) => res.json());
</script>

{#await getData()}
  <div>Loading</div>
{:then data}
  <div>Data: {JSON.stringify(data)}</div>
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}

<style>
</style>
