export default async function useAPI(url, body, method = "GET", params) {
	const accessToken = JSON.parse(sessionStorage.getItem("user"))?.accessToken;
	console.log(accessToken);
	try {
		const response = await fetch(
			`https://game-engine-api.herokuapp.com/api${url}`,
			{
				method,
				body: body
					? JSON.stringify({
							...body,
					  })
					: null,
				headers: {
					"Content-type": "application/json; charset=UTF-8",
					// "Authorization": `Bearer ${accessToken}`
					"x-access-token": accessToken,
				},
			}
		);
		const json = await response.json();
		return json;
	} catch (error) {
		console.error(error);
	}
}
