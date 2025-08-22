import { useState, useEffect } from "react";

const API_URL =
	"https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

const App = () => {
	const [coins, setCoins] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function fetchData() {
			try {
				const coinsPromise = await fetch(API_URL);
				const coins = await coinsPromise.json();

				if (coinsPromise.ok) {
					setCoins(coins);
					console.log(coins);
				} else {
					throw Error("Failed to fetch coins.");
				}
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		}
		fetchData();
	}, []);

	return (
		<div>
			<h1>Crypto Dash</h1>
		</div>
	);
};

export default App;
