async function getCars()
{
    const q = `
    query {
      drives {
        name
        age
        cars {
          model
          name
        }
      }
    }
  `;
  const response = await fetch('http://localhost:3030/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: q }),
  });
  const data = await response.json();
  console.log(data);
}
getCars();